import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  RowData,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

import { cx } from '@/lib/utils';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/tremor/Table';

// This example requires @tanstack/react-table

const workspaces = [
  //array-start
  {
    workspace: 'sales_by_day_api',
    owner: 'John Doe',
    status: 'live',
    costs: '$3,509.00',
    region: 'US-West 1',
    capacity: '99%',
    lastEdited: '23/09/2023 13:00',
  },
  {
    workspace: 'marketing_campaign',
    owner: 'Jane Smith',
    status: 'live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'sales_campaign',
    owner: 'Jane Smith',
    status: 'live',
    costs: '$5,720.00',
    region: 'US-East 2',
    capacity: '80%',
    lastEdited: '22/09/2023 10:45',
  },
  {
    workspace: 'development_env',
    owner: 'Mike Johnson',
    status: 'live',
    costs: '$4,200.00',
    region: 'EU-West 1',
    capacity: '60%',
    lastEdited: '21/09/2023 14:30',
  },
  {
    workspace: 'new_workspace_1',
    owner: 'Alice Brown',
    status: 'live',
    costs: '$2,100.00',
    region: 'US-West 2',
    capacity: '75%',
    lastEdited: '24/09/2023 09:15',
  },
  {
    workspace: 'test_environment',
    owner: 'David Clark',
    status: 'inactive',
    costs: '$800.00',
    region: 'EU-Central 1',
    capacity: '40%',
    lastEdited: '25/09/2023 16:20',
  },
  {
    workspace: 'analytics_dashboard',
    owner: 'Sarah Wilson',
    status: 'live',
    costs: '$6,500.00',
    region: 'US-West 1',
    capacity: '90%',
    lastEdited: '26/09/2023 11:30',
  },
  {
    workspace: 'research_project',
    owner: 'Michael Adams',
    status: 'live',
    costs: '$3,900.00',
    region: 'US-East 1',
    capacity: '70%',
    lastEdited: '27/09/2023 08:45',
  },
  {
    workspace: 'training_environment',
    owner: 'Laura White',
    status: 'live',
    costs: '$2,500.00',
    region: 'EU-North 1',
    capacity: '55%',
    lastEdited: '28/09/2023 12:15',
  },
  //array-end
];

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align: string;
  }
}

const workspacesColumns = [
  //array-start
  {
    header: 'Workspace',
    accessorKey: 'workspace',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Owner',
    accessorKey: 'owner',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Region',
    accessorKey: 'region',
    meta: {
      align: 'text-left',
    },
  },
  {
    header: 'Capacity',
    accessorKey: 'capacity',
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Costs',
    accessorKey: 'costs',
    meta: {
      align: 'text-right',
    },
  },
  {
    header: 'Last edited',
    accessorKey: 'lastEdited',
    meta: {
      align: 'text-right',
    },
  },
  //array-end
];

const TextButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) => {
  return (
    <button
      type="button"
      className="group rounded-md bg-white p-2 text-sm shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:bg-gray-950 dark:ring-gray-800 hover:dark:bg-gray-900 disabled:hover:dark:bg-gray-950"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

const NumberButton = ({
  active,
  onClick,
  children,
  position,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  position?: 'left' | 'right';
}) => {
  return (
    <button
      type="button"
      className={cx(
        'min-w-[36px] rounded-md p-2 text-sm text-gray-900 disabled:opacity-50 dark:text-gray-50',
        active
          ? 'bg-blue-500 font-semibold text-white dark:bg-blue-500 dark:text-white'
          : 'hover:bg-gray-50 hover:dark:bg-gray-900',
        position === 'left'
          ? 'rounded-l-md'
          : position === 'right'
            ? 'rounded-r-md'
            : '',
      )}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </button>
  );
};

const MobileButton = ({
  onClick,
  disabled,
  children,
  position,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  position?: 'left' | 'right';
}) => {
  return (
    <button
      type="button"
      className={cx(
        'group p-2 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:ring-gray-800 hover:dark:bg-gray-900 disabled:hover:dark:bg-gray-950',
        position === 'left'
          ? 'rounded-l-md'
          : position === 'right'
            ? '-ml-px rounded-r-md'
            : '',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { MobileButton, NumberButton, TextButton };

export default function Example() {
  const pageSize = 8;

  const data = React.useMemo(
    // multiply dummy data to better demonstrate pagination over several pages
    () => [
      ...workspaces,
      ...workspaces,
      ...workspaces,
      ...workspaces,
      ...workspaces,
      ...workspaces,
      ...workspaces,
    ],
    [],
  );
  const table = useReactTable({
    data: data,
    columns: workspacesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
  });

  const paginationCount = table.getPageCount();
  const actualPage = table.getState().pagination.pageIndex + 1;

  return (
    <>
      <TableRoot>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell
                    key={header.id}
                    scope="col"
                    className={cx(header.column.columnDef.meta?.align)}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cx(cell.column.columnDef.meta?.align)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
      <div className="mt-10 flex items-center justify-between sm:justify-center">
        {/* long pagination button form only for desktop view */}
        <div className="hidden gap-0.5 sm:inline-flex">
          <TextButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </TextButton>
          <NumberButton
            onClick={() => table.setPageIndex(0)}
            active={actualPage === 1}
          >
            1
          </NumberButton>
          {actualPage > 4 ? (
            actualPage < paginationCount - 2 ? (
              <>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage - 3)}
                  active={false}
                >
                  ...
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage - 2)}
                  active={actualPage === actualPage - 1}
                >
                  {actualPage - 1}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage - 1)}
                  active={true}
                >
                  {actualPage}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage)}
                  active={actualPage === actualPage + 1}
                >
                  {actualPage + 1}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(actualPage + 1)}
                  active={false}
                >
                  ...
                </NumberButton>
              </>
            ) : (
              <>
                <NumberButton
                  onClick={() => table.setPageIndex(1)}
                  active={false}
                >
                  2
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 5)}
                  active={false}
                >
                  ...
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 4)}
                  active={actualPage === paginationCount - 3}
                >
                  {paginationCount - 3}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 3)}
                  active={actualPage === paginationCount - 2}
                >
                  {paginationCount - 2}
                </NumberButton>
                <NumberButton
                  onClick={() => table.setPageIndex(paginationCount - 2)}
                  active={actualPage === paginationCount - 1}
                >
                  {paginationCount - 1}
                </NumberButton>
              </>
            )
          ) : (
            <>
              <NumberButton
                onClick={() => table.setPageIndex(1)}
                active={actualPage === 2}
              >
                2
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(2)}
                active={actualPage === 3}
              >
                3
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(3)}
                active={actualPage === 4}
              >
                4
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(4)}
                active={false}
              >
                ...
              </NumberButton>
              <NumberButton
                onClick={() => table.setPageIndex(paginationCount - 2)}
                active={false}
              >
                {paginationCount - 1}
              </NumberButton>
            </>
          )}
          <NumberButton
            onClick={() => table.setPageIndex(paginationCount - 1)}
            active={actualPage === paginationCount}
          >
            {paginationCount}
          </NumberButton>
          <TextButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </TextButton>
        </div>
        <p className="text-sm tabular-nums text-gray-500 dark:text-gray-500 sm:hidden">
          Page of{' '}
          <span className="font-medium text-gray-900 dark:text-gray-50">{`${table.getState().pagination.pageIndex + 1
            }`}</span>{' '}
          of
          <span className="font-medium text-gray-900 dark:text-gray-50">
            {' '}
            {`${table.getPageCount()}`}
          </span>
        </p>
        {/* --- Mobile view for pagination buttons --- */}
        <div className="inline-flex items-center rounded-md shadow-sm sm:hidden">
          <MobileButton
            position="left"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </MobileButton>
          <MobileButton
            position="right"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="size-5 text-gray-700 group-hover:text-gray-900 dark:text-gray-300 group-hover:dark:text-gray-50"
              aria-hidden={true}
            />
          </MobileButton>
        </div>
      </div>
    </>
  );
}
