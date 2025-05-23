'use client';

import { RiExternalLinkLine } from '@remixicon/react';

import { Button } from '@/components/tremor/Button';
import { Card } from '@/components/tremor/Card';
import { Divider } from '@/components/tremor/Divider';
import { Label } from '@/components/tremor/Label';
import { Switch } from '@/components/tremor/Switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/tremor/Tabs';

export default function Example() {
  return (
    <div className="obfuscate">
      <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
        General
      </h1>
      <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
        Manage your personal details, workspace governance and notifications.
      </p>
      <Tabs defaultValue="tab3" className="mt-8">
        <TabsList variant="line">
          <TabsTrigger value="tab1">Account details</TabsTrigger>
          <TabsTrigger value="tab2">Users</TabsTrigger>
          <TabsTrigger value="tab3">Add-Ons</TabsTrigger>
        </TabsList>
        {/* Content below only for demo purpose placed outside of <Tab> component. Add <TabPanels>, <TabPanel> to make it functional and to add content for other tabs */}
        <div className="max-w-3xl">
          <h2 className="mt-8 font-semibold text-gray-900 dark:text-gray-50">
            Upgrade options
          </h2>
          <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
            Do more with your data and unlock new insights with our advanced
            features and add-ons.
          </p>
          <Divider className="my-10" />
          <form action="#" method="POST">
            <div className="space-y-6">
              <Card>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $25/month
                </p>
                <h4 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Query Caching
                </h4>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="upgrade-1" name="upgrade-1" />
                    <Label
                      htmlFor="upgrade-1"
                      className="text-sm text-gray-500 dark:text-gray-500"
                    >
                      Activate <span className="sr-only">Query Caching</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
              <Card>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $100/month
                </p>
                <h4 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Advanced Bot Protection
                </h4>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="upgrade-2" name="upgrade-2" />
                    <Label
                      htmlFor="upgrade-2"
                      className="text-sm text-gray-500 dark:text-gray-500"
                    >
                      Activate{' '}
                      <span className="sr-only">Advanced Bot Protection</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
              <Card>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  $90/month
                </p>
                <h4 className="mt-4 font-semibold text-gray-900 dark:text-gray-50">
                  Observability Analytics
                </h4>
                <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
                <Divider />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="upgrade-3" name="upgrade-3" />
                    <Label
                      htmlFor="upgrade-3"
                      className="text-sm text-gray-500 dark:text-gray-500"
                    >
                      Activate{' '}
                      <span className="sr-only">Observability Analytics</span>
                    </Label>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline hover:underline-offset-4 dark:text-blue-500"
                  >
                    Learn more
                    <RiExternalLinkLine className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </Card>
            </div>
            <Divider className="my-10" />
            <div className="flex justify-end">
              <Button type="submit">Upgrade plan</Button>
            </div>
          </form>
        </div>
      </Tabs>
    </div>
  );
}
