'use client';

// Modify your layout / template file as follows to center login form across the screen

// <html className"h-full"/>
// <body className"h-full"/>

// Add this to your css:
// @keyframes slideUpFade {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
import { RiGithubFill, RiGoogleFill } from '@remixicon/react';
import React from 'react';

import { Button } from '@/components/tremor/Button';
import { Divider } from '@/components/tremor/Divider';
import { Input } from '@/components/tremor/Input';
import { Label } from '@/components/tremor/Label';

const AnimatedElement = ({
  children,
  index,
  styles,
}: {
  children: React.ReactNode;
  index: number;
  styles?: React.CSSProperties;
}) => (
  <div
    style={{
      animation: 'slideUpFade 300ms ease-in-out backwards',
      animationDelay: `${index * 75}ms`,
      ...styles,
    }}
  >
    {children}
  </div>
);

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="flex min-h-screen w-full">
        <main className="flex-1">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="w-full px-4 sm:max-w-sm sm:px-0">
              <AnimatedElement index={0}>
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
                    Get started now
                  </h2>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    Enter your credentials to access your account
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement index={1}>
                <div className="mt-8 flex w-full gap-4">
                  <Button variant="secondary" className="w-full">
                    <span className="inline-flex items-center gap-2">
                      <RiGithubFill
                        className="size-5 shrink-0"
                        aria-hidden={true}
                      />
                      Login with GitHub
                    </span>
                  </Button>
                  <Button className="w-full" variant="secondary">
                    <span className="inline-flex items-center gap-2">
                      <RiGoogleFill className="size-4" aria-hidden={true} />
                      Login with Google
                    </span>
                  </Button>
                </div>
              </AnimatedElement>

              <AnimatedElement index={2}>
                <Divider>or</Divider>
              </AnimatedElement>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <AnimatedElement index={3}>
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-900 dark:text-gray-50"
                      >
                        Email
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="john@company.com"
                        className="mt-2"
                        required
                        aria-required="true"
                      />
                    </div>
                  </AnimatedElement>

                  <AnimatedElement index={4}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium text-gray-900 dark:text-gray-50"
                        >
                          Password
                        </Label>
                        <a
                          href="#"
                          className="text-sm font-medium text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="Password"
                        className="mt-2"
                        required
                        aria-required="true"
                      />
                    </div>
                  </AnimatedElement>
                </div>

                <AnimatedElement index={5}>
                  <div className="mt-2">
                    <Button className="mt-6 w-full" type="submit">
                      Continue
                    </Button>
                  </div>
                </AnimatedElement>
              </form>

              <AnimatedElement index={6}>
                <div className="mt-4">
                  <p className="text-xs text-gray-700">
                    By signing in, you agree to our{' '}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-600 dark:text-blue-500 hover:dark:text-blue-600"
                    >
                      Privacy Policy.
                    </a>
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </main>
        <aside
          className="hidden flex-1 overflow-hidden p-6 lg:flex"
          aria-label="Product showcase"
        >
          <div className="xl:p-24 flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 p-16 dark:from-blue-600 dark:to-blue-500">
            <div>
              <AnimatedElement
                index={7}
                styles={{ animationDelay: '400ms', animationDuration: '700ms' }}
              >
                <h2 className="max-w-lg text-2xl font-semibold leading-9 text-white dark:text-white">
                  The simplest way to manage your data platform
                </h2>
                <p className="mt-4 text-white dark:text-white">
                  Enter your credentials to access your account
                </p>
              </AnimatedElement>
              <AnimatedElement
                index={7}
                styles={{ animationDelay: '500ms', animationDuration: '900ms' }}
              >
                <div className="mt-14 rounded-xl bg-white/10 p-1.5 ring-1 ring-white/20">
                  <img
                    alt="Dashboard screenshot showing data visualization and analytics interface"
                    src="https://blocks.tremor.so/_next/image?url=%2Fhome%2Fdashboard.webp&w=3840&q=75"
                    width={2432}
                    height={1442}
                    className="rounded-md shadow-2xl shadow-black/50 ring-1 ring-gray-900/5"
                  />
                </div>
              </AnimatedElement>
              <div className="mt-14 grid h-20 grid-cols-3 items-center gap-10">
                <AnimatedElement
                  index={8}
                  styles={{
                    animationDelay: '600ms',
                    animationDuration: '500ms',
                  }}
                >
                  <img
                    alt="Partner company logo 1"
                    src="https://blocks.tremor.so/logos/white/placeholder1.svg"
                    width={158}
                    height={48}
                    className="max-h-20 w-full object-contain"
                  />
                </AnimatedElement>
                <AnimatedElement
                  index={7}
                  styles={{
                    animationDelay: '700ms',
                    animationDuration: '500ms',
                  }}
                >
                  <img
                    alt="Partner company logo 2"
                    src="https://blocks.tremor.so/logos/white/placeholder2.svg"
                    width={158}
                    height={48}
                    className="max-h-20 w-full object-contain"
                  />
                </AnimatedElement>
                <AnimatedElement
                  index={7}
                  styles={{
                    animationDelay: '800ms',
                    animationDuration: '500ms',
                  }}
                >
                  <img
                    alt="Partner company logo 3"
                    src="https://blocks.tremor.so/logos/white/placeholder3.svg"
                    width={158}
                    height={48}
                    className="max-h-20 w-full object-contain"
                  />
                </AnimatedElement>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
