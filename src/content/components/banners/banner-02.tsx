import {
  RiBookOpenLine,
  RiCloseLine,
  RiExternalLinkLine,
} from '@remixicon/react';
import React from 'react';

import { Button } from '@/components/tremor/Button';
import { Card } from '@/components/tremor/Card';

export default function Example() {
  const [isOpen, setIsOpen] = React.useState(true);

  // just for demo purposes
  React.useEffect(() => {
    if (!isOpen) {
      const timeoutId: NodeJS.Timeout = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return isOpen ? (
    <div className="obfuscate">
      <Card className="bg-gray-50 dark:bg-gray-900">
        <div className="absolute right-0 top-0 pr-3 pt-3">
          <Button
            className="!p-1 !text-gray-500 hover:!text-gray-700 dark:!text-gray-500 hover:dark:!text-gray-300"
            variant="ghost"
            onClick={() => setIsOpen(false)}
            aria-label="Close"
          >
            <RiCloseLine className="size-5 shrink-0" aria-hidden={true} />
          </Button>
        </div>
        <div className="sm:flex sm:items-start sm:space-x-6">
          <div className="inline-flex shrink-0 rounded-full bg-blue-200/50 p-2 dark:bg-blue-900/80">
            <span className="flex size-8 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-500">
              <RiBookOpenLine
                className="size-5 text-white dark:text-white"
                aria-hidden={true}
              />
            </span>
          </div>
          <div className="mt-4 sm:mt-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Welcome to your workspace
            </h3>
            <p className="mt-2 text-sm/6 text-gray-500 dark:text-gray-500">
              Start with our step-by-step guide to configure the workspace to
              your needs. For further resources, our video tutorials and
              audience-specific documentations are designed to provide you with
              a in-depth understanding of our platform.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Button>Get started</Button>
              <Button
                asChild
                variant="ghost"
                className="text-blue-500 hover:bg-transparent dark:text-blue-500 hover:dark:bg-transparent"
              >
                <a href="#" className="inline-flex items-center gap-2">
                  View tutorials
                  <RiExternalLinkLine className="size-4" aria-hidden={true} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : null;
}
