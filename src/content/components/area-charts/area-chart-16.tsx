'use client';

// Add this custom Color to your chartUtils.ts file

// darkGray: {
//   bg: 'bg-gray-800 dark:bg-gray-200',
//   stroke: 'stroke-gray-800 dark:stroke-gray-200',
//   fill: 'fill-gray-800 dark:fill-gray-200',
//   text: 'text-gray-800 dark:text-gray-200',
// },
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import React from 'react';
import {
  Area,
  CartesianGrid,
  Dot,
  Label,
  Line,
  AreaChart as RechartsAreaChart,
  Legend as RechartsLegend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AxisDomain } from 'recharts/types/util/types';

import {
  AvailableChartColors,
  AvailableChartColorsKeys,
  constructCategoryColors,
  getColorClassName,
  getYAxisDomain,
  hasOnlyOneValueForKey,
} from '@/lib/chartUtils';
import { useOnWindowResize } from '@/lib/useOnWindowResize';
import { cx } from '@/lib/utils';

// Custom Tremor copy-and-paste AreaChart [v0.3.0]

//#region Legend

interface LegendItemProps {
  name: string;
  color: AvailableChartColorsKeys;
  onClick?: (name: string, color: AvailableChartColorsKeys) => void;
  activeLegend?: string;
}

const LegendItem = ({
  name,
  color,
  onClick,
  activeLegend,
}: LegendItemProps) => {
  const hasOnValueChange = !!onClick;
  return (
    <li
      className={cx(
        // base
        'group inline-flex flex-nowrap items-center gap-1.5 whitespace-nowrap rounded px-2 py-1 transition',
        hasOnValueChange
          ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
          : 'cursor-default',
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(name, color);
      }}
    >
      <span
        className={cx(
          'h-[3px] w-3.5 shrink-0 rounded-full',
          getColorClassName(color, 'bg'),
          activeLegend && activeLegend !== name ? 'opacity-40' : 'opacity-100',
        )}
        aria-hidden={true}
      />
      <p
        className={cx(
          // base
          'truncate whitespace-nowrap text-xs',
          // text color
          'text-gray-700 dark:text-gray-300',
          hasOnValueChange &&
          'group-hover:text-gray-900 dark:group-hover:text-gray-50',
          activeLegend && activeLegend !== name ? 'opacity-40' : 'opacity-100',
        )}
      >
        {name}
      </p>
    </li>
  );
};

interface ScrollButtonProps {
  icon: React.ElementType;
  onClick?: () => void;
  disabled?: boolean;
}

const ScrollButton = ({ icon, onClick, disabled }: ScrollButtonProps) => {
  const Icon = icon;
  const [isPressed, setIsPressed] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isPressed) {
      intervalRef.current = setInterval(() => {
        onClick?.();
      }, 300);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isPressed, onClick]);

  React.useEffect(() => {
    if (disabled) {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      setIsPressed(false);
    }
  }, [disabled]);

  return (
    <button
      type="button"
      className={cx(
        // base
        'group inline-flex size-5 items-center truncate rounded transition',
        disabled
          ? 'cursor-not-allowed text-gray-400 dark:text-gray-600'
          : 'cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50',
      )}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setIsPressed(true);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setIsPressed(false);
      }}
    >
      <Icon className="size-full" aria-hidden="true" />
    </button>
  );
};

interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  onClickLegendItem?: (category: string, color: string) => void;
  activeLegend?: string;
  enableLegendSlider?: boolean;
}

type HasScrollProps = {
  left: boolean;
  right: boolean;
};

const Legend = React.forwardRef<HTMLOListElement, LegendProps>((props, ref) => {
  const {
    categories,
    colors = AvailableChartColors,
    className,
    onClickLegendItem,
    activeLegend,
    enableLegendSlider = false,
    ...other
  } = props;
  const scrollableRef = React.useRef<HTMLInputElement>(null);
  const scrollButtonsRef = React.useRef<HTMLDivElement>(null);
  const [hasScroll, setHasScroll] = React.useState<HasScrollProps | null>(null);
  const [isKeyDowned, setIsKeyDowned] = React.useState<string | null>(null);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const checkScroll = React.useCallback(() => {
    const scrollable = scrollableRef?.current;
    if (!scrollable) return;

    const hasLeftScroll = scrollable.scrollLeft > 0;
    const hasRightScroll =
      scrollable.scrollWidth - scrollable.clientWidth > scrollable.scrollLeft;

    setHasScroll({ left: hasLeftScroll, right: hasRightScroll });
  }, [setHasScroll]);

  const scrollToTest = React.useCallback(
    (direction: 'left' | 'right') => {
      const element = scrollableRef?.current;
      const scrollButtons = scrollButtonsRef?.current;
      const scrollButtonsWith = scrollButtons?.clientWidth ?? 0;
      const width = element?.clientWidth ?? 0;

      if (element && enableLegendSlider) {
        element.scrollTo({
          left:
            direction === 'left'
              ? element.scrollLeft - width + scrollButtonsWith
              : element.scrollLeft + width - scrollButtonsWith,
          behavior: 'smooth',
        });
        setTimeout(() => {
          checkScroll();
        }, 400);
      }
    },
    [enableLegendSlider, checkScroll],
  );

  React.useEffect(() => {
    const keyDownHandler = (key: string) => {
      if (key === 'ArrowLeft') {
        scrollToTest('left');
      } else if (key === 'ArrowRight') {
        scrollToTest('right');
      }
    };
    if (isKeyDowned) {
      keyDownHandler(isKeyDowned);
      intervalRef.current = setInterval(() => {
        keyDownHandler(isKeyDowned);
      }, 300);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [isKeyDowned, scrollToTest]);

  const keyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      setIsKeyDowned(e.key);
    }
  };
  const keyUp = (e: KeyboardEvent) => {
    e.stopPropagation();
    setIsKeyDowned(null);
  };

  React.useEffect(() => {
    const scrollable = scrollableRef?.current;
    if (enableLegendSlider) {
      checkScroll();
      scrollable?.addEventListener('keydown', keyDown);
      scrollable?.addEventListener('keyup', keyUp);
    }

    return () => {
      scrollable?.removeEventListener('keydown', keyDown);
      scrollable?.removeEventListener('keyup', keyUp);
    };
  }, [checkScroll, enableLegendSlider]);

  return (
    <ol
      ref={ref}
      className={cx('relative overflow-hidden', className)}
      {...other}
    >
      <div
        ref={scrollableRef}
        tabIndex={0}
        className={cx(
          'flex h-full',
          enableLegendSlider
            ? hasScroll?.right || hasScroll?.left
              ? 'snap-mandatory items-center overflow-auto pl-4 pr-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
              : ''
            : 'flex-wrap',
        )}
      >
        {categories.map((category, index) => (
          <LegendItem
            key={`item-${index}`}
            name={category}
            color={colors[index] as AvailableChartColorsKeys}
            onClick={onClickLegendItem}
            activeLegend={activeLegend}
          />
        ))}
      </div>
      {enableLegendSlider && (hasScroll?.right || hasScroll?.left) ? (
        <>
          <div
            className={cx(
              // base
              'absolute bottom-0 right-0 top-0 flex h-full items-center justify-center pr-1',
              // background color
              'bg-white dark:bg-gray-950',
            )}
          >
            <ScrollButton
              icon={RiArrowLeftSLine}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest('left');
              }}
              disabled={!hasScroll?.left}
            />
            <ScrollButton
              icon={RiArrowRightSLine}
              onClick={() => {
                setIsKeyDowned(null);
                scrollToTest('right');
              }}
              disabled={!hasScroll?.right}
            />
          </div>
        </>
      ) : null}
    </ol>
  );
});

Legend.displayName = 'Legend';

const ChartLegend = (
  { payload }: any,
  categoryColors: Map<string, AvailableChartColorsKeys>,
  setLegendHeight: React.Dispatch<React.SetStateAction<number>>,
  activeLegend: string | undefined,
  onClick?: (category: string, color: string) => void,
  enableLegendSlider?: boolean,
  legendPosition?: 'left' | 'center' | 'right',
  yAxisWidth?: number,
) => {
  const legendRef = React.useRef<HTMLDivElement>(null);

  useOnWindowResize(() => {
    const calculateHeight = (height: number | undefined) =>
      height ? Number(height) + 15 : 60;
    setLegendHeight(calculateHeight(legendRef.current?.clientHeight));
  });

  const legendPayload = payload.filter((item: any) => item.type !== 'none');

  const paddingLeft =
    legendPosition === 'left' && yAxisWidth ? yAxisWidth - 8 : 0;

  return (
    <div
      ref={legendRef}
      style={{ paddingLeft: paddingLeft }}
      className={cx(
        'flex items-center',
        { 'justify-center': legendPosition === 'center' },
        { 'justify-start': legendPosition === 'left' },
        { 'justify-end': legendPosition === 'right' },
      )}
    >
      <Legend
        categories={legendPayload.map((entry: any) => entry.value)}
        colors={legendPayload.map((entry: any) =>
          categoryColors.get(entry.value),
        )}
        onClickLegendItem={onClick}
        activeLegend={activeLegend}
        enableLegendSlider={enableLegendSlider}
      />
    </div>
  );
};

//#region Tooltip

type TooltipProps = Pick<ChartTooltipProps, 'active' | 'payload' | 'label'>;

type PayloadItem = {
  category: string;
  value: number;
  index: string;
  color: AvailableChartColorsKeys;
  type?: string;
  payload: any;
};

interface ChartTooltipProps {
  active: boolean | undefined;
  payload: PayloadItem[];
  label: string;
  valueFormatter: (value: number) => string;
}

const ChartTooltip = ({
  active,
  payload,
  label,
  valueFormatter,
}: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cx(
          // base
          'rounded-md border text-sm shadow-md',
          // border color
          'border-gray-200 dark:border-gray-800',
          // background color
          'bg-white dark:bg-gray-950',
        )}
      >
        <div className={cx('border-b border-inherit px-4 py-2')}>
          <p
            className={cx(
              // base
              'font-medium',
              // text color
              'text-gray-900 dark:text-gray-50',
            )}
          >
            {label}
          </p>
        </div>
        <div className={cx('space-y-1 px-4 py-2')}>
          {payload.map(({ value, category, color }, index) => (
            <div
              key={`id-${index}`}
              className="flex items-center justify-between space-x-8"
            >
              <div className="flex items-center space-x-2">
                <span
                  aria-hidden="true"
                  className={cx(
                    'h-[3px] w-3.5 shrink-0 rounded-full',
                    getColorClassName(color, 'bg'),
                  )}
                />
                <p
                  className={cx(
                    // base
                    'whitespace-nowrap text-right',
                    // text color
                    'text-gray-700 dark:text-gray-300',
                  )}
                >
                  {category}
                </p>
              </div>
              <p
                className={cx(
                  // base
                  'whitespace-nowrap text-right font-medium tabular-nums',
                  // text color
                  'text-gray-900 dark:text-gray-50',
                )}
              >
                {valueFormatter(value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

//#region AreaChart

interface ActiveDot {
  index?: number;
  dataKey?: string;
}

type BaseEventProps = {
  eventType: 'dot' | 'category';
  categoryClicked: string;
  [key: string]: number | string;
};

type AreaChartEventProps = BaseEventProps | null | undefined;

interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  index: string;
  categories: string[];
  colors?: AvailableChartColorsKeys[];
  valueFormatter?: (value: number) => string;
  startEndOnly?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  yAxisWidth?: number;
  intervalType?: 'preserveStartEnd' | 'equidistantPreserveStart';
  showTooltip?: boolean;
  showLegend?: boolean;
  autoMinValue?: boolean;
  minValue?: number;
  maxValue?: number;
  allowDecimals?: boolean;
  onValueChange?: (value: AreaChartEventProps) => void;
  enableLegendSlider?: boolean;
  tickGap?: number;
  connectNulls?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  type?: 'default' | 'stacked' | 'percent';
  legendPosition?: 'left' | 'center' | 'right';
  tooltipCallback?: (tooltipCallbackContent: TooltipProps) => void;
  customTooltip?: React.ComponentType<TooltipProps>;
}

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  (props, ref) => {
    const {
      data = [],
      categories = [],
      index,
      colors = AvailableChartColors,
      valueFormatter = (value: number) => value.toString(),
      startEndOnly = false,
      showXAxis = true,
      showYAxis = true,
      showGridLines = true,
      yAxisWidth = 56,
      intervalType = 'equidistantPreserveStart',
      showTooltip = true,
      showLegend = true,
      autoMinValue = false,
      minValue,
      maxValue,
      allowDecimals = true,
      connectNulls = false,
      className,
      onValueChange,
      enableLegendSlider = false,
      tickGap = 5,
      xAxisLabel,
      yAxisLabel,
      type = 'default',
      legendPosition = 'right',
      tooltipCallback,
      customTooltip,
      ...other
    } = props;
    const CustomTooltip = customTooltip;
    const paddingValue =
      (!showXAxis && !showYAxis) || (startEndOnly && !showYAxis) ? 0 : 20;
    const [legendHeight, setLegendHeight] = React.useState(60);
    const [activeDot, setActiveDot] = React.useState<ActiveDot | undefined>(
      undefined,
    );
    const [activeLegend, setActiveLegend] = React.useState<string | undefined>(
      undefined,
    );
    const categoryColors = constructCategoryColors(categories, colors);

    const yAxisDomain = getYAxisDomain(autoMinValue, minValue, maxValue);
    const hasOnValueChange = !!onValueChange;
    const stacked = type === 'stacked' || type === 'percent';

    const prevActiveRef = React.useRef<boolean | undefined>(undefined);
    const prevLabelRef = React.useRef<string | undefined>(undefined);

    const getFillContent = ({
      activeDot,
      activeLegend,
      category,
    }: {
      activeDot: ActiveDot | undefined;
      activeLegend: string | undefined;
      category: string;
    }) => {
      const stopOpacity =
        activeDot || (activeLegend && activeLegend !== category)
          ? 'opacity-[30%]'
          : '';

      return (
        <pattern
          id="raster"
          patternUnits="userSpaceOnUse"
          width="64"
          height="64"
        >
          <path
            d="M-106 110L22 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-98 110L30 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-90 110L38 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-82 110L46 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-74 110L54 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-66 110L62 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-58 110L70 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-50 110L78 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-42 110L86 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-34 110L94 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-26 110L102 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-18 110L110 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-10 110L118 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M-2 110L126 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M6 110L134 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M14 110L142 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
          <path
            d="M22 110L150 -18"
            className={cx('stroke-gray-300 dark:stroke-gray-700', stopOpacity)}
          />
        </pattern>
      );
    };

    function valueToPercent(value: number) {
      return `${(value * 100).toFixed(0)}%`;
    }

    function onDotClick(itemData: any, event: React.MouseEvent) {
      event.stopPropagation();

      if (!hasOnValueChange) return;
      if (
        (itemData.index === activeDot?.index &&
          itemData.dataKey === activeDot?.dataKey) ||
        (hasOnlyOneValueForKey(data, itemData.dataKey) &&
          activeLegend &&
          activeLegend === itemData.dataKey)
      ) {
        setActiveLegend(undefined);
        setActiveDot(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(itemData.dataKey);
        setActiveDot({
          index: itemData.index,
          dataKey: itemData.dataKey,
        });
        onValueChange?.({
          eventType: 'dot',
          categoryClicked: itemData.dataKey,
          ...itemData.payload,
        });
      }
    }

    function onCategoryClick(dataKey: string) {
      if (!hasOnValueChange) return;
      if (
        (dataKey === activeLegend && !activeDot) ||
        (hasOnlyOneValueForKey(data, dataKey) &&
          activeDot &&
          activeDot.dataKey === dataKey)
      ) {
        setActiveLegend(undefined);
        onValueChange?.(null);
      } else {
        setActiveLegend(dataKey);
        onValueChange?.({
          eventType: 'category',
          categoryClicked: dataKey,
        });
      }
      setActiveDot(undefined);
    }

    return (
      <div ref={ref} className={cx('h-80 w-full', className)} {...other}>
        <ResponsiveContainer>
          <RechartsAreaChart
            data={data}
            onClick={
              hasOnValueChange && (activeLegend || activeDot)
                ? () => {
                  setActiveDot(undefined);
                  setActiveLegend(undefined);
                  onValueChange?.(null);
                }
                : undefined
            }
            margin={{
              bottom: xAxisLabel ? 30 : undefined,
              left: yAxisLabel ? 20 : undefined,
              right: yAxisLabel ? 5 : undefined,
              top: 15,
            }}
            stackOffset={type === 'percent' ? 'expand' : undefined}
          >
            {showGridLines ? (
              <CartesianGrid
                className={cx('stroke-gray-200 stroke-1 dark:stroke-gray-800')}
                horizontal={true}
                vertical={false}
              />
            ) : null}
            <XAxis
              padding={{ left: paddingValue, right: paddingValue }}
              hide={!showXAxis}
              dataKey={index}
              interval={startEndOnly ? 'preserveStartEnd' : intervalType}
              tick={{ transform: 'translate(0, 6)' }}
              ticks={
                startEndOnly
                  ? [data[0][index], data[data.length - 1][index]]
                  : undefined
              }
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 dark:fill-gray-500',
              )}
              tickLine={false}
              axisLine={false}
              minTickGap={tickGap}
            >
              {xAxisLabel && (
                <Label
                  position="insideBottom"
                  offset={-20}
                  className="fill-gray-800 text-sm font-medium dark:fill-gray-200"
                >
                  {xAxisLabel}
                </Label>
              )}
            </XAxis>
            <YAxis
              width={yAxisWidth}
              hide={!showYAxis}
              axisLine={false}
              tickLine={true}
              type="number"
              tickSize={8}
              domain={yAxisDomain as AxisDomain}
              tick={{ transform: 'translate(-6, 0)' }}
              fill=""
              stroke=""
              className={cx(
                // base
                'text-xs',
                // text fill
                'fill-gray-500 stroke-gray-800 dark:fill-gray-500 dark:stroke-gray-300',
              )}
              tickFormatter={
                type === 'percent' ? valueToPercent : valueFormatter
              }
              allowDecimals={allowDecimals}
            >
              {yAxisLabel && (
                <Label
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                  angle={-90}
                  offset={-15}
                  className="fill-gray-800 text-sm font-medium dark:fill-gray-200"
                >
                  {yAxisLabel}
                </Label>
              )}
            </YAxis>
            <Tooltip
              wrapperStyle={{ outline: 'none' }}
              isAnimationActive={true}
              animationDuration={100}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
              offset={20}
              position={{ y: 0 }}
              content={({ active, payload, label }) => {
                const cleanPayload: TooltipProps['payload'] = payload
                  ? payload.map((item: any) => ({
                    category: item.dataKey,
                    value: item.value,
                    index: item.payload[index],
                    color: categoryColors.get(
                      item.dataKey,
                    ) as AvailableChartColorsKeys,
                    type: item.type,
                    payload: item.payload,
                  }))
                  : [];

                if (
                  tooltipCallback &&
                  (active !== prevActiveRef.current ||
                    label !== prevLabelRef.current)
                ) {
                  tooltipCallback({ active, payload: cleanPayload, label });
                  prevActiveRef.current = active;
                  prevLabelRef.current = label;
                }

                return showTooltip && active ? (
                  CustomTooltip ? (
                    <CustomTooltip
                      active={active}
                      payload={cleanPayload}
                      label={label}
                    />
                  ) : (
                    <ChartTooltip
                      active={active}
                      payload={cleanPayload}
                      label={label}
                      valueFormatter={valueFormatter}
                    />
                  )
                ) : null;
              }}
            />

            {showLegend ? (
              <RechartsLegend
                verticalAlign="top"
                height={legendHeight}
                content={({ payload }) =>
                  ChartLegend(
                    { payload },
                    categoryColors,
                    setLegendHeight,
                    activeLegend,
                    hasOnValueChange
                      ? (clickedLegendItem: string) =>
                        onCategoryClick(clickedLegendItem)
                      : undefined,
                    enableLegendSlider,
                    legendPosition,
                    yAxisWidth,
                  )
                }
              />
            ) : null}
            {categories.map((category) => {
              return (
                <React.Fragment key={category}>
                  <defs key={category}>
                    {getFillContent({
                      activeDot: activeDot,
                      activeLegend: activeLegend,
                      category: category,
                    })}
                  </defs>
                  <Area
                    className={cx(
                      getColorClassName(
                        categoryColors.get(
                          category,
                        ) as AvailableChartColorsKeys,
                        'stroke',
                      ),
                    )}
                    strokeOpacity={
                      activeDot || (activeLegend && activeLegend !== category)
                        ? 0.3
                        : 1
                    }
                    activeDot={(props: any) => {
                      const {
                        cx: cxCoord,
                        cy: cyCoord,
                        stroke,
                        strokeLinecap,
                        strokeLinejoin,
                        strokeWidth,
                        dataKey,
                      } = props;
                      return (
                        <Dot
                          className={cx(
                            'stroke-white dark:stroke-gray-950',
                            onValueChange ? 'cursor-pointer' : '',
                            getColorClassName(
                              categoryColors.get(
                                dataKey,
                              ) as AvailableChartColorsKeys,
                              'fill',
                            ),
                          )}
                          cx={cxCoord}
                          cy={cyCoord}
                          r={5}
                          fill=""
                          stroke={stroke}
                          strokeLinecap={strokeLinecap}
                          strokeLinejoin={strokeLinejoin}
                          strokeWidth={strokeWidth}
                          onClick={(_, event) => onDotClick(props, event)}
                        />
                      );
                    }}
                    dot={(props: any) => {
                      const {
                        stroke,
                        strokeLinecap,
                        strokeLinejoin,
                        strokeWidth,
                        cx: cxCoord,
                        cy: cyCoord,
                        dataKey,
                        index,
                      } = props;

                      if (
                        (hasOnlyOneValueForKey(data, category) &&
                          !(
                            activeDot ||
                            (activeLegend && activeLegend !== category)
                          )) ||
                        (activeDot?.index === index &&
                          activeDot?.dataKey === category)
                      ) {
                        return (
                          <Dot
                            key={index}
                            cx={cxCoord}
                            cy={cyCoord}
                            r={5}
                            stroke={stroke}
                            fill=""
                            strokeLinecap={strokeLinecap}
                            strokeLinejoin={strokeLinejoin}
                            strokeWidth={strokeWidth}
                            className={cx(
                              'stroke-white dark:stroke-gray-950',
                              onValueChange ? 'cursor-pointer' : '',
                              getColorClassName(
                                categoryColors.get(
                                  dataKey,
                                ) as AvailableChartColorsKeys,
                                'fill',
                              ),
                            )}
                          />
                        );
                      }
                      return <React.Fragment key={index}></React.Fragment>;
                    }}
                    key={category}
                    name={category}
                    type="linear"
                    dataKey={category}
                    stroke=""
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    isAnimationActive={false}
                    connectNulls={connectNulls}
                    stackId={stacked ? 'stack' : undefined}
                    fill="url(#raster)"
                  />
                </React.Fragment>
              );
            })}
            {/* hidden lines to increase clickable target area */}
            {onValueChange
              ? categories.map((category) => (
                <Line
                  className={cx('cursor-pointer')}
                  strokeOpacity={0}
                  key={category}
                  name={category}
                  type="linear"
                  dataKey={category}
                  stroke="transparent"
                  fill="transparent"
                  legendType="none"
                  tooltipType="none"
                  strokeWidth={12}
                  connectNulls={connectNulls}
                  onClick={(props: any, event) => {
                    event.stopPropagation();
                    const { name } = props;
                    onCategoryClick(name);
                  }}
                />
              ))
              : null}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    );
  },
);

AreaChart.displayName = 'AreaChart';

const data = [
  // array-start
  {
    date: '2010',
    AUM: 341,
  },
  {
    date: '2011',
    AUM: 312,
  },
  {
    date: '2012',
    AUM: 350,
  },
  {
    date: '2013',
    AUM: 381,
  },
  {
    date: '2014',
    AUM: 287,
  },
  {
    date: '2015',
    AUM: 394,
  },
  {
    date: '2016',
    AUM: 437,
  },
  {
    date: '2017',
    AUM: 463,
  },
  {
    date: '2018',
    AUM: 482,
  },
  {
    date: '2019',
    AUM: 501,
  },
  {
    date: '2020',
    AUM: 372,
  },
  {
    date: '2021',
    AUM: 422,
  },
  {
    date: '2022',
    AUM: 443,
  },
  {
    date: '2023',
    AUM: 461,
  },
  // array-end
];

const calculateTotalAUM = (data: any[]) =>
  data.reduce((total, item) => total + item.AUM, 0);

const currencyFormatter = (number: number) =>
  '$' + Intl.NumberFormat('us').format(number).toString() + 'M';

export default function Example() {
  const totalAUM = React.useMemo(() => calculateTotalAUM(data), [data]);
  return (
    <div className="obfuscate">
      <div className="sm:mx-auto sm:max-w-7xl">
        <h1 className="font-medium text-gray-900 dark:text-gray-50">
          Assets under management
        </h1>
        <p className="mt-1 text-sm/6 text-gray-500 dark:text-gray-500">
          With{' '}
          <span className="font-semibold">{currencyFormatter(totalAUM)}</span>{' '}
          million in assets under management as of 31 December 2023, Friends
          Group provides an innovative range client solutions to institutional
          investors.
        </p>
        <AreaChart
          data={data}
          index="date"
          categories={['AUM']}
          showLegend={false}
          yAxisWidth={56}
          colors={['darkGray']}
          valueFormatter={currencyFormatter}
          className="mt-10 hidden !h-72 sm:block"
        />
        <AreaChart
          data={data}
          index="date"
          categories={['AUM']}
          showLegend={false}
          showYAxis={false}
          startEndOnly={true}
          colors={['darkGray']}
          valueFormatter={currencyFormatter}
          className="mt-6 !h-72 sm:hidden"
        />
      </div>
    </div>
  );
}
