'use client';

import { RiCheckboxCircleFill } from '@remixicon/react';

import { Button } from '@/components/tremor/Button';
import { Divider } from '@/components/tremor/Divider';

const features = [
  //array-start
  {
    id: 1,
    name: 'Invite unlimited members',
  },
  {
    id: 2,
    name: 'Create unlimited workspaces',
  },
  {
    id: 3,
    name: '90 days of history',
  },
  {
    id: 4,
    name: '24/7 priority support',
  },
  {
    id: 5,
    name: 'Access to all enterprise plugins',
  },
  //array-end
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-50">
            Unlock all features
          </h3>
          <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
            Get the full potential of your data with our enhanced features that
            enable advanced data analytics and informed decision-making.
          </p>
          <div className="mt-8 space-y-6">
            <div className="relative border-l-2 border-gray-200 pl-4 dark:border-gray-800">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                <a href="#" className="focus:outline-none">
                  {/* Extend link to entire card */}
                  <span className="absolute inset-0" aria-hidden={true} />
                  Talk to Sales &#8594;
                </a>
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                Schedule a call with one of our sales representative
              </p>
            </div>
            <div className="relative border-l-2 border-gray-200 pl-4 dark:border-gray-800">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                <a href="#" className="focus:outline-none">
                  {/* Extend link to entire card */}
                  <span className="absolute inset-0" aria-hidden={true} />
                  Book a demo &#8594;
                </a>
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
                Try out our premium features in a demo
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between space-x-6">
            <h3 className="font-semibold text-gray-900 dark:text-gray-50">
              Professional Plan Subscription
            </h3>
            <p className="flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900 dark:text-gray-50">
                $89
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-500">
                /mo
              </span>
            </p>
          </div>
          <ul
            role="list"
            className="mt-4 text-sm text-gray-700 dark:text-gray-300"
          >
            {features.map((item) => (
              <li key={item.id} className="flex items-center space-x-2 py-2.5">
                <RiCheckboxCircleFill
                  className="size-5 shrink-0 text-blue-500 dark:text-blue-500"
                  aria-hidden={true}
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
          <Divider />
          <Button asChild className="h-10 w-full">
            <a href="#">Upgrade</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
