import React from 'react';

interface BadgeProps extends React.ComponentPropsWithoutRef<'span'> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, ...props }: BadgeProps, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className="z-10 block w-fit rounded-lg border border-blue-200/20 bg-blue-50/50 px-3 py-1.5 font-semibold uppercase leading-4 tracking-tighter dark:border-blue-800/30 dark:bg-blue-900/20 sm:text-sm"
        {...props}
      >
        <span className="bg-gradient-to-b from-blue-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-200 dark:to-blue-400">
          {children}
        </span>
      </span>
    );
  },
);

const stats = [
  {
    name: 'Bandwith increase',
    value: '+162%',
  },
  {
    name: 'Better storage efficiency',
    value: '2-3x',
  },
  {
    name: 'Rows ingested / second',
    value: 'Up to 9M',
  },
];

export default function Example() {
  return (
    <div className="obfuscate">
      <div className="mx-auto w-full max-w-6xl px-3 py-20">
        <Badge>Security at Scale</Badge>
        <h2
          id="features-title"
          className="mt-2 inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text py-2 text-4xl font-bold tracking-tighter text-transparent dark:from-gray-50 dark:to-gray-300 sm:text-6xl"
        >
          Architected for speed and reliability
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-600 dark:text-gray-400">
          Database&rsquo; innovative architecture avoids the central bottlenecks
          of traditional systems, enhancing system reliability. This design
          ensures high productivity and security, minimizing the risk of service
          disruptions and outages.
        </p>
        <dl className="mt-12 grid grid-cols-1 gap-y-8 dark:border-gray-800 md:grid-cols-3 md:border-y md:border-gray-200 md:py-14">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="border-l-2 border-blue-100 pl-6 dark:border-blue-900 md:border-l md:text-center lg:border-gray-200 lg:first:border-none lg:dark:border-gray-800">
                <dd className="inline-block bg-gradient-to-t from-blue-900 to-blue-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-700 dark:to-blue-400 lg:text-6xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-gray-600 dark:text-gray-400">
                  {stat.name}
                </dt>
              </div>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}
