'use client';

import { RiArrowDownSLine } from '@remixicon/react';
import React from 'react';

import { cx } from '@/lib/utils';

import { BarChart, TooltipProps } from '@/components/tremor/BarChart';
import { Button } from '@/components/tremor/Button';
import { Divider } from '@/components/tremor/Divider';
import { DonutChart } from '@/components/tremor/DonutChart';

interface LocationData {
  location: string;
  sales: number;
  share: string;
}

interface DataItem {
  date: string;
  sales: number;
  locations: LocationData[];
}

const data: DataItem[] = [
  //array-start
  {
    date: 'Jan 23',
    sales: 1668,
    locations: [
      {
        location: 'Europe',
        sales: 400,
        share: '23.9%',
      },
      {
        location: 'Asia',
        sales: 500,
        share: '29.9%',
      },
      {
        location: 'North America',
        sales: 768,
        share: '46.1%',
      },
    ],
  },
  {
    date: 'Feb 23',
    sales: 2370,
    locations: [
      {
        location: 'Europe',
        sales: 800,
        share: '33.8%',
      },
      {
        location: 'Asia',
        sales: 300,
        share: '12.7%',
      },
      {
        location: 'North America',
        sales: 1270,
        share: '53.6%',
      },
    ],
  },
  {
    date: 'Mar 23',
    sales: 3192,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: '31.3%',
      },
      {
        location: 'Asia',
        sales: 900,
        share: '28.2%',
      },
      {
        location: 'North America',
        sales: 1292,
        share: '40.5%',
      },
    ],
  },
  {
    date: 'Apr 23',
    sales: 2210,
    locations: [
      {
        location: 'Europe',
        sales: 600,
        share: '27.2%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '31.7%',
      },
      {
        location: 'North America',
        sales: 910,
        share: '41.2%',
      },
    ],
  },
  {
    date: 'May 23',
    sales: 3130,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: '28.8%',
      },
      {
        location: 'Asia',
        sales: 1000,
        share: '31.9%',
      },
      {
        location: 'North America',
        sales: 1230,
        share: '39.3%',
      },
    ],
  },
  {
    date: 'Jun 23',
    sales: 1350,
    locations: [
      {
        location: 'Europe',
        sales: 300,
        share: '22.2%',
      },
      {
        location: 'Asia',
        sales: 400,
        share: '29.6%',
      },
      {
        location: 'North America',
        sales: 650,
        share: '48.2%',
      },
    ],
  },
  {
    date: 'Jul 23',
    sales: 2400,
    locations: [
      {
        location: 'Europe',
        sales: 900,
        share: '37.5%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '29.2%',
      },
      {
        location: 'North America',
        sales: 800,
        share: '33.3%',
      },
    ],
  },
  {
    date: 'Aug 23',
    sales: 2600,
    locations: [
      {
        location: 'Europe',
        sales: 1000,
        share: '38.5%',
      },
      {
        location: 'Asia',
        sales: 800,
        share: '30.8%',
      },
      {
        location: 'North America',
        sales: 800,
        share: '30.8%',
      },
    ],
  },
  {
    date: 'Sep 23',
    sales: 2800,
    locations: [
      {
        location: 'Europe',
        sales: 1100,
        share: '39.3%',
      },
      {
        location: 'Asia',
        sales: 700,
        share: '25%',
      },
      {
        location: 'North America',
        sales: 1000,
        share: '35.7%',
      },
    ],
  },
  //array-end
];

const currencyFormatter = (number: number) => {
  return '$' + Intl.NumberFormat('us').format(number).toString();
};

const CustomTooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload.map((item) => ({
    status: item.category,
    value: item.value,
    locations: item.payload.locations,
  }))[0];

  return (
    <div className="w-56 rounded-md border border-gray-200 bg-white text-sm shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-500">{label}</p>
        <p className="font-medium text-gray-900 dark:text-gray-50">
          {currencyFormatter(data.value)}
        </p>
      </div>

      <DonutChart
        data={data.locations}
        value="sales"
        category="location"
        variant="pie"
        showTooltip={false}
        colors={['indigo', 'violet', 'fuchsia']}
        className="mx-auto mt-4 !h-20 !w-20"
      />
      <ul
        role="list"
        className="divide-y divide-gray-200 px-4 py-2 text-sm text-gray-500 dark:divide-gray-800 dark:text-gray-500"
      >
        {data.locations.map((locationData: LocationData) => (
          <li
            key={locationData.location}
            className="flex items-center justify-between space-x-4 py-2"
          >
            <div className="flex items-center space-x-2 truncate">
              <span
                className={cx(
                  locationData.location === 'Europe'
                    ? 'bg-indigo-500 dark:bg-indigo-500'
                    : locationData.location === 'Asia'
                      ? 'bg-violet-500 dark:bg-violet-500'
                      : locationData.location === 'North America'
                        ? 'bg-fuchsia-500 dark:bg-fuchsia-500'
                        : '',
                  'size-2.5 shrink-0 rounded-sm',
                )}
                aria-hidden={true}
              />
              <span className="truncate">{locationData.location}</span>
            </div>
            <span className="text-gray-900 dark:text-gray-50">
              {locationData.share}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Example() {
  const [showDemo, setShowDemo] = React.useState(false);
  return (
    <div className="obfuscate">
      <div className="flex w-full justify-center">
        <CustomTooltip
          label="Jan 23"
          active={true}
          payload={[
            {
              category: 'sales',
              value: 3130,
              index: 'May 23',
              color: 'blue',
              payload: {
                date: 'May 23',
                sales: 3130,
                locations: [
                  { location: 'Europe', sales: 900, share: '28.8%' },
                  { location: 'Asia', sales: 1000, share: '31.9%' },
                  { location: 'North America', sales: 1230, share: '39.3%' },
                ],
              },
            },
          ]}
        />
      </div>
      <Divider className="mt-12">
        <Button
          variant="light"
          onClick={() => setShowDemo(!showDemo)}
          className="group !rounded-full !bg-gray-100 !text-gray-500 hover:!bg-gray-100 dark:!bg-gray-900 dark:!text-gray-500 hover:dark:!bg-gray-900"
          tabIndex={0}
        >
          <RiArrowDownSLine
            aria-hidden={true}
            className={`-ml-1 size-5 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50 ${showDemo ? 'rotate-180' : ''} `}
          />
          <span className="ml-1 transition-all group-hover:text-gray-900 group-hover:dark:text-gray-50">
            {showDemo ? 'Hide Demo' : 'Show Demo'}
          </span>
        </Button>
      </Divider>
      {showDemo ? (
        <>
          <BarChart
            className="mt-12 hidden !h-72 sm:block"
            data={data}
            index="date"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            yAxisWidth={70}
            showLegend={false}
            customTooltip={CustomTooltip}
          />
          <BarChart
            className="mt-12 !h-72 sm:hidden"
            data={data}
            index="date"
            categories={['sales']}
            valueFormatter={currencyFormatter}
            showYAxis={false}
            showLegend={false}
            startEndOnly={true}
            customTooltip={CustomTooltip}
          />
        </>
      ) : null}
    </div>
  );
}
