'use client';

import Link from 'next/link';
import type { SVGProps } from 'react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/tremor/Button';
import { Card } from '@/components/tremor/Card';
import { Input } from '@/components/tremor/Input';
import { Label } from '@/components/tremor/Label';
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from '@/components/tremor/RadioCardGroup';
import { RadioGroup, RadioGroupItem } from '@/components/tremor/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/tremor/Select';
import { Slider } from '@/components/tremor/Slider';

type Region = {
  value: string;
  label: string;
  multiplier: number;
};

type CloudProviderRegions = {
  salesforce: Region[];
  azure: Region[];
  cloudflare: Region[];
  netlify: Region[];
};

const regionOptions: CloudProviderRegions = {
  salesforce: [
    { value: 'us-east-2', label: 'Ohio (us-east-2)', multiplier: 1.0 },
    {
      value: 'us-east-1',
      label: 'N. Virginia (us-east-1)',
      multiplier: 1.1,
    },
    { value: 'us-west-2', label: 'Oregon (us-west-2)', multiplier: 1.0 },
    {
      value: 'eu-central-1',
      label: 'Frankfurt (eu-central-1)',
      multiplier: 1.2,
    },
    { value: 'eu-west-1', label: 'Ireland (eu-west-1)', multiplier: 1.2 },
    { value: 'eu-west-2', label: 'London (eu-west-2)', multiplier: 1.3 },
    {
      value: 'ap-northeast-1',
      label: 'Tokyo (ap-northeast-1)',
      multiplier: 1.4,
    },
    { value: 'ap-south-1', label: 'Mumbai (ap-south-1)', multiplier: 0.9 },
    {
      value: 'ap-southeast-1',
      label: 'Singapore (ap-southeast-1)',
      multiplier: 1.3,
    },
    {
      value: 'ap-southeast-2',
      label: 'Sydney (ap-southeast-2)',
      multiplier: 1.3,
    },
    { value: 'eu-west-3', label: 'Paris (eu-west-3)', multiplier: 1.2 },
    {
      value: 'ap-northeast-2',
      label: 'Seoul (ap-northeast-2)',
      multiplier: 1.4,
    },
    { value: 'sa-east-1', label: 'São Paulo (sa-east-1)', multiplier: 1.5 },
    {
      value: 'ca-central-1',
      label: 'Montreal (ca-central-1)',
      multiplier: 1.1,
    },
  ],
  azure: [
    { value: 'east-us', label: 'East US (eastus)', multiplier: 1.0 },
    { value: 'east-us-2', label: 'East US 2 (eastus2)', multiplier: 1.1 },
    {
      value: 'south-central-us',
      label: 'South Central US (south-central-us)',
      multiplier: 1.2,
    },
    { value: 'westus2', label: 'West US 2 (westus2)', multiplier: 1.0 },
    {
      value: 'germany-west-central',
      label: 'Germany West Central (germany-west-central)',
      multiplier: 1.3,
    },
    {
      value: 'switzerland-north',
      label: 'Switzerland North (switzerland-north)',
      multiplier: 1.4,
    },
  ],
  cloudflare: [
    { value: 'us-south-1', label: 'Texas (us-south-1)', multiplier: 1.1 },
    { value: 'us-central-1', label: 'Chicago (us-central-1)', multiplier: 1.0 },
    { value: 'us-west-3', label: 'San Diego (us-west-3)', multiplier: 1.2 },
    { value: 'eu-north-1', label: 'Stockholm (eu-north-1)', multiplier: 1.3 },
    { value: 'eu-east-1', label: 'Warsaw (eu-east-1)', multiplier: 1.4 },
    { value: 'ap-west-1', label: 'Karachi (ap-west-1)', multiplier: 0.8 },
    { value: 'ap-east-1', label: 'Hong Kong (ap-east-1)', multiplier: 1.5 },
    { value: 'af-south-1', label: 'Cape Town (af-south-1)', multiplier: 0.9 },
    { value: 'sa-east-1', label: 'São Paulo (sa-east-1)', multiplier: 1.2 },
  ],
  netlify: [
    { value: 'us-east-3', label: 'Miami (us-east-3)', multiplier: 1.2 },
    { value: 'us-west-4', label: 'Las Vegas (us-west-4)', multiplier: 1.1 },
    { value: 'ca-central-1', label: 'Toronto (ca-central-1)', multiplier: 1.0 },
    { value: 'eu-west-3', label: 'Madrid (eu-west-3)', multiplier: 1.3 },
    {
      value: 'ap-south-east-2',
      label: 'Sydney (ap-south-east-2)',
      multiplier: 1.5,
    },
  ],
};

const Salesforce = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox=".5 .5 999 699.242" {...props}>
    <path
      fill="#00A1E0"
      d="M416.224 76.763c32.219-33.57 77.074-54.391 126.682-54.391 65.946 0 123.48 36.772 154.12 91.361 26.626-11.896 56.098-18.514 87.106-18.514 118.94 0 215.368 97.268 215.368 217.247 0 119.993-96.428 217.261-215.368 217.261a213.735 213.735 0 0 1-42.422-4.227c-26.981 48.128-78.397 80.646-137.412 80.646-24.705 0-48.072-5.706-68.877-15.853-27.352 64.337-91.077 109.448-165.348 109.448-77.344 0-143.261-48.939-168.563-117.574-11.057 2.348-22.513 3.572-34.268 3.572C75.155 585.74.5 510.317.5 417.262c0-62.359 33.542-116.807 83.378-145.937-10.26-23.608-15.967-49.665-15.967-77.06C67.911 87.25 154.79.5 261.948.5c62.914 0 118.827 29.913 154.276 76.263"
    />
    <path
      fill="#FFF"
      d="M145.196 363.11c-.626 1.637.228 1.979.427 2.263 1.878 1.366 3.786 2.349 5.707 3.444 10.189 5.407 19.81 6.986 29.871 6.986 20.492 0 33.214-10.9 33.214-28.447v-.341c0-16.224-14.358-22.115-27.835-26.37l-1.75-.569c-10.161-3.302-18.927-6.147-18.927-12.836v-.355c0-5.721 5.123-9.934 13.064-9.934 8.823 0 19.297 2.932 26.042 6.66 0 0 1.978 1.281 2.704-.64.398-1.025 3.814-10.218 4.17-11.214.384-1.082-.299-1.879-.996-2.306-7.699-4.682-18.344-7.884-29.358-7.884l-2.049.014c-18.756 0-31.848 11.328-31.848 27.565v.342c0 17.119 14.444 22.669 27.978 26.54l2.177.669c9.862 3.031 18.358 5.635 18.358 12.58v.342c0 6.347-5.521 11.071-14.43 11.071-3.458 0-14.487-.071-26.398-7.6-1.438-.84-2.277-1.451-3.387-2.12-.583-.37-2.049-1.011-2.689.925l-4.045 11.215zm299.998 0c-.626 1.637.228 1.979.427 2.263 1.878 1.366 3.786 2.349 5.706 3.444 10.189 5.407 19.811 6.986 29.871 6.986 20.492 0 33.215-10.9 33.215-28.447v-.341c0-16.224-14.359-22.115-27.836-26.37l-1.75-.569c-10.161-3.302-18.928-6.147-18.928-12.836v-.355c0-5.721 5.123-9.934 13.064-9.934 8.823 0 19.297 2.932 26.043 6.66 0 0 1.978 1.281 2.703-.64.398-1.025 3.814-10.218 4.17-11.214.385-1.082-.299-1.879-.996-2.306-7.699-4.682-18.344-7.884-29.358-7.884l-2.05.014c-18.756 0-31.848 11.328-31.848 27.565v.342c0 17.119 14.444 22.669 27.978 26.54l2.177.669c9.862 3.031 18.373 5.635 18.373 12.58v.342c0 6.347-5.536 11.071-14.445 11.071-3.457 0-14.486-.071-26.397-7.6-1.438-.84-2.291-1.423-3.372-2.12-.371-.242-2.107-.911-2.705.925l-4.042 11.215zm204.801-34.37c0 9.919-1.85 17.731-5.493 23.253-3.601 5.465-9.051 8.126-16.649 8.126-7.613 0-13.035-2.647-16.579-8.126-3.587-5.507-5.407-13.334-5.407-23.253 0-9.904 1.82-17.703 5.407-23.168 3.544-5.407 8.966-8.04 16.579-8.04 7.599 0 13.049 2.633 16.664 8.04 3.629 5.464 5.478 13.263 5.478 23.168m17.106-18.386c-1.68-5.679-4.298-10.688-7.784-14.857-3.487-4.184-7.898-7.542-13.136-9.99-5.223-2.433-11.398-3.671-18.328-3.671-6.945 0-13.121 1.238-18.344 3.671-5.237 2.448-9.648 5.807-13.149 9.99-3.472 4.184-6.091 9.193-7.784 14.857-1.665 5.649-2.505 11.825-2.505 18.386s.84 12.751 2.505 18.386c1.693 5.664 4.298 10.674 7.799 14.857 3.486 4.184 7.912 7.528 13.135 9.904 5.236 2.377 11.398 3.586 18.344 3.586 6.93 0 13.092-1.209 18.328-3.586 5.223-2.376 9.648-5.721 13.136-9.904 3.486-4.17 6.104-9.179 7.784-14.857 1.68-5.649 2.519-11.84 2.519-18.386s-.841-12.737-2.52-18.386m140.467 47.116c-.569-1.665-2.177-1.039-2.177-1.039-2.49.954-5.138 1.836-7.955 2.277-2.861.44-6.006.669-9.379.669-8.281 0-14.856-2.462-19.566-7.329-4.725-4.867-7.372-12.736-7.344-23.381.029-9.691 2.362-16.978 6.561-22.527 4.17-5.521 10.517-8.354 18.984-8.354 7.059 0 12.438.811 18.072 2.59 0 0 1.352.583 1.992-1.181 1.494-4.156 2.604-7.13 4.198-11.698.456-1.295-.654-1.85-1.053-2.007-2.22-.868-7.457-2.276-11.413-2.874-3.7-.569-8.026-.868-12.836-.868-7.188 0-13.591 1.224-19.069 3.672-5.465 2.433-10.104 5.791-13.775 9.976-3.672 4.184-6.461 9.192-8.325 14.856-1.85 5.649-2.789 11.854-2.789 18.415 0 14.188 3.828 25.657 11.385 34.054 7.57 8.425 18.941 12.708 33.77 12.708 8.766 0 17.76-1.778 24.221-4.326 0 0 1.238-.598.697-2.034l-4.199-11.599zm29.929-38.232c.811-5.507 2.334-10.09 4.682-13.661 3.544-5.422 8.951-8.396 16.551-8.396s12.623 2.988 16.223 8.396c2.391 3.571 3.43 8.354 3.843 13.661h-41.299zm57.592-12.111c-1.451-5.479-5.052-11.015-7.414-13.548-3.729-4.013-7.371-6.816-10.986-8.382-4.725-2.021-10.389-3.358-16.593-3.358-7.229 0-13.79 1.21-19.112 3.714-5.336 2.505-9.818 5.921-13.334 10.176-3.516 4.24-6.162 9.292-7.842 15.027-1.693 5.707-2.547 11.926-2.547 18.485 0 6.675.883 12.894 2.633 18.486 1.765 5.636 4.582 10.602 8.396 14.714 3.799 4.142 8.695 7.387 14.558 9.648 5.821 2.249 12.894 3.416 21.019 3.401 16.722-.057 25.53-3.785 29.159-5.792.641-.355 1.253-.981.483-2.774l-3.785-10.603c-.568-1.579-2.177-.996-2.177-.996-4.142 1.537-10.032 4.298-23.766 4.27-8.979-.014-15.64-2.661-19.81-6.803-4.283-4.24-6.375-10.474-6.745-19.268l57.905.057s1.522-.028 1.68-1.509c.057-.624 1.993-11.895-1.722-24.945m-521.327 12.111c.825-5.507 2.334-10.09 4.682-13.661 3.543-5.422 8.951-8.396 16.55-8.396s12.623 2.988 16.237 8.396c2.376 3.571 3.415 8.354 3.828 13.661h-41.297zm57.577-12.111c-1.451-5.479-5.037-11.015-7.399-13.548-3.729-4.013-7.372-6.816-10.986-8.382-4.725-2.021-10.388-3.358-16.593-3.358-7.215 0-13.79 1.21-19.112 3.714-5.336 2.505-9.819 5.921-13.334 10.176-3.515 4.24-6.162 9.292-7.841 15.027-1.679 5.707-2.547 11.926-2.547 18.485 0 6.675.882 12.894 2.633 18.486 1.765 5.636 4.583 10.602 8.396 14.714 3.8 4.142 8.695 7.387 14.558 9.648 5.821 2.249 12.893 3.416 21.019 3.401 16.721-.057 25.53-3.785 29.159-5.792.641-.355 1.252-.981.484-2.774l-3.771-10.603c-.584-1.579-2.191-.996-2.191-.996-4.141 1.537-10.019 4.298-23.78 4.27-8.965-.014-15.625-2.661-19.795-6.803-4.284-4.24-6.375-10.474-6.746-19.268l57.905.057s1.522-.028 1.679-1.509c.055-.624 1.99-11.895-1.738-24.945m-182.738 50.026c-2.263-1.808-2.576-2.263-3.344-3.43-1.139-1.779-1.722-4.312-1.722-7.528 0-5.095 1.679-8.752 5.166-11.214-.042.015 4.981-4.34 16.792-4.184 8.296.114 15.71 1.338 15.71 1.338v26.327h.014s-7.357 1.579-15.639 2.077c-11.783.712-17.02-3.4-16.977-3.386m23.039-40.686c-2.348-.171-5.394-.271-9.037-.271-4.966 0-9.762.626-14.259 1.836-4.525 1.209-8.595 3.103-12.096 5.606a27.927 27.927 0 0 0-8.396 9.549c-2.049 3.814-3.088 8.311-3.088 13.349 0 5.123.882 9.577 2.647 13.221 1.765 3.657 4.312 6.702 7.556 9.051 3.216 2.348 7.187 4.069 11.797 5.108 4.54 1.039 9.691 1.565 15.327 1.565 5.934 0 11.854-.483 17.589-1.466 5.678-.968 12.651-2.377 14.586-2.817a146.25 146.25 0 0 0 4.056-1.039c1.438-.355 1.324-1.893 1.324-1.893l-.029-52.952c0-11.613-3.102-20.223-9.207-25.559-6.077-5.322-15.028-8.013-26.597-8.013-4.341 0-11.328.599-15.512 1.438 0 0-12.651 2.448-17.86 6.518 0 0-1.138.712-.512 2.306l4.099 11.015c.512 1.423 1.893.939 1.893.939s.441-.171.954-.47c11.143-6.062 25.231-5.877 25.231-5.877 6.262 0 11.072 1.252 14.316 3.742 3.159 2.419 4.767 6.076 4.767 13.789v2.448c-4.981-.711-9.549-1.123-9.549-1.123m467.029-29.836c.44-1.31-.484-1.936-.869-2.078-.981-.384-5.905-1.423-9.705-1.665-7.271-.441-11.312.783-14.928 2.405-3.586 1.622-7.57 4.24-9.791 7.215v-7.044c0-.982-.697-1.765-1.665-1.765h-14.843c-.967 0-1.664.782-1.664 1.765v86.366c0 .968.797 1.765 1.764 1.765h15.213a1.76 1.76 0 0 0 1.75-1.765v-43.147c0-5.792.641-11.569 1.922-15.198 1.252-3.587 2.96-6.461 5.066-8.525 2.12-2.049 4.525-3.486 7.158-4.297 2.689-.826 5.663-1.096 7.77-1.096 3.031 0 6.361.782 6.361.782 1.109.128 1.736-.555 2.105-1.565.997-2.647 3.815-10.574 4.356-12.153"
    />
    <path
      fill="#FFF"
      d="M595.874 246.603c-1.85-.569-3.529-.954-5.721-1.366-2.221-.398-4.867-.598-7.869-.598-10.475 0-18.729 2.96-24.52 8.794-5.764 5.807-9.678 14.644-11.642 26.271l-.712 3.913h-13.148s-1.594-.057-1.936 1.68l-2.148 12.053c-.157 1.139.342 1.864 1.878 1.864h12.794l-12.979 72.463c-1.011 5.835-2.178 10.631-3.473 14.273-1.267 3.587-2.504 6.276-4.041 8.24-1.48 1.879-2.875 3.273-5.295 4.084-1.992.669-4.297.982-6.816.982-1.395 0-3.258-.229-4.639-.513-1.366-.271-2.092-.569-3.131-1.011 0 0-1.494-.568-2.092.926-.47 1.238-3.885 10.615-4.298 11.769-.398 1.152.171 2.049.896 2.319 1.708.598 2.974.996 5.294 1.551 3.217.755 5.934.797 8.481.797 5.322 0 10.189-.754 14.217-2.205 4.042-1.466 7.57-4.014 10.701-7.457 3.373-3.729 5.493-7.628 7.515-12.964 2.006-5.266 3.729-11.812 5.094-19.439l13.05-73.815h19.069s1.607.057 1.936-1.693l2.162-12.039c.143-1.152-.341-1.864-1.893-1.864h-18.514c.1-.412.939-6.931 3.06-13.063.911-2.604 2.618-4.725 4.056-6.177 1.424-1.423 3.06-2.433 4.854-3.017 1.835-.598 3.928-.882 6.219-.882 1.736 0 3.457.199 4.752.469 1.793.385 2.49.584 2.961.727 1.893.569 2.148.014 2.519-.896l4.426-12.153c.455-1.312-.669-1.867-1.067-2.023m-258.68 125.231c0 .968-.697 1.751-1.665 1.751h-15.355c-.968 0-1.651-.783-1.651-1.751v-123.58c0-.967.683-1.75 1.651-1.75h15.355c.968 0 1.665.783 1.665 1.75v123.58z"
    />
  </svg>
);

const MicrosoftAzure = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 96 96" {...props}>
    <defs>
      <linearGradient
        id="a"
        x1={-1032.17}
        x2={-1059.21}
        y1={145.31}
        y2={65.43}
        gradientTransform="matrix(1 0 0 -1 1075 158)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#114a8b" />
        <stop offset={1} stopColor="#0669bc" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={-1023.73}
        x2={-1029.98}
        y1={108.08}
        y2={105.97}
        gradientTransform="matrix(1 0 0 -1 1075 158)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopOpacity={0.3} />
        <stop offset={0.07} stopOpacity={0.2} />
        <stop offset={0.32} stopOpacity={0.1} />
        <stop offset={0.62} stopOpacity={0.05} />
        <stop offset={1} stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="c"
        x1={-1027.16}
        x2={-997.48}
        y1={147.64}
        y2={68.56}
        gradientTransform="matrix(1 0 0 -1 1075 158)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#3ccbf4" />
        <stop offset={1} stopColor="#2892df" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M33.34 6.54h26.04l-27.03 80.1a4.15 4.15 0 0 1-3.94 2.81H8.15a4.14 4.14 0 0 1-3.93-5.47L29.4 9.38a4.15 4.15 0 0 1 3.94-2.83z"
    />
    <path
      fill="#0078d4"
      d="M71.17 60.26H29.88a1.91 1.91 0 0 0-1.3 3.31l26.53 24.76a4.17 4.17 0 0 0 2.85 1.13h23.38z"
    />
    <path
      fill="url(#b)"
      d="M33.34 6.54a4.12 4.12 0 0 0-3.95 2.88L4.25 83.92a4.14 4.14 0 0 0 3.91 5.54h20.79a4.44 4.44 0 0 0 3.4-2.9l5.02-14.78 17.91 16.7a4.24 4.24 0 0 0 2.67.97h23.29L71.02 60.26H41.24L59.47 6.55z"
    />
    <path
      fill="url(#c)"
      d="M66.6 9.36a4.14 4.14 0 0 0-3.93-2.82H33.65a4.15 4.15 0 0 1 3.93 2.82l25.18 74.62a4.15 4.15 0 0 1-3.93 5.48h29.02a4.15 4.15 0 0 0 3.93-5.48z"
    />
  </svg>
);

const Cloudflare = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 116" {...props}>
    <path
      fill="#FFF"
      d="m202.357 49.394-5.311-2.124C172.085 103.434 72.786 69.289 66.81 85.997c-.996 11.286 54.227 2.146 93.706 4.059 12.039.583 18.076 9.671 12.964 24.484l10.069.031c11.615-36.209 48.683-17.73 50.232-29.68-2.545-7.857-42.601 0-31.425-35.497Z"
    />
    <path
      fill="#F4811F"
      d="M176.332 108.348c1.593-5.31 1.062-10.622-1.593-13.809-2.656-3.187-6.374-5.31-11.154-5.842L71.17 87.634c-.531 0-1.062-.53-1.593-.53-.531-.532-.531-1.063 0-1.594.531-1.062 1.062-1.594 2.124-1.594l92.946-1.062c11.154-.53 22.839-9.56 27.087-20.182l5.312-13.809c0-.532.531-1.063 0-1.594C191.203 20.182 166.772 0 138.091 0 111.535 0 88.697 16.995 80.73 40.896c-5.311-3.718-11.684-5.843-19.12-5.31-12.747 1.061-22.838 11.683-24.432 24.43-.531 3.187 0 6.374.532 9.56C16.996 70.107 0 87.103 0 108.348c0 2.124 0 3.718.531 5.842 0 1.063 1.062 1.594 1.594 1.594h170.489c1.062 0 2.125-.53 2.125-1.594l1.593-5.842Z"
    />
    <path
      fill="#FAAD3F"
      d="M205.544 48.863h-2.656c-.531 0-1.062.53-1.593 1.062l-3.718 12.747c-1.593 5.31-1.062 10.623 1.594 13.809 2.655 3.187 6.373 5.31 11.153 5.843l19.652 1.062c.53 0 1.062.53 1.593.53.53.532.53 1.063 0 1.594-.531 1.063-1.062 1.594-2.125 1.594l-20.182 1.062c-11.154.53-22.838 9.56-27.087 20.182l-1.063 4.78c-.531.532 0 1.594 1.063 1.594h70.108c1.062 0 1.593-.531 1.593-1.593 1.062-4.25 2.124-9.03 2.124-13.81 0-27.618-22.838-50.456-50.456-50.456"
    />
  </svg>
);

const Netlify = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 226" {...props}>
    <path
      fill="#05BDBA"
      d="M69.181 188.087h-2.417l-12.065-12.065v-2.417l18.444-18.444h12.778l1.704 1.704v12.778zM54.699 51.628v-2.417l12.065-12.065h2.417L87.625 55.59v12.778l-1.704 1.704H73.143z"
    />
    <path
      fill="#014847"
      d="M160.906 149.198h-17.552l-1.466-1.466v-41.089c0-7.31-2.873-12.976-11.689-13.174-4.537-.119-9.727 0-15.274.218l-.833.852v53.173l-1.466 1.466H95.074l-1.466-1.466v-70.19l1.466-1.467h39.503c15.354 0 27.795 12.441 27.795 27.795v43.882l-1.466 1.466Z"
    />
    <path
      fill="#05BDBA"
      d="M71.677 122.889H1.466L0 121.423V103.83l1.466-1.466h70.211l1.466 1.466v17.593zM254.534 122.889h-70.211l-1.466-1.466V103.83l1.466-1.466h70.211L256 103.83v17.593zM117.876 54.124V1.466L119.342 0h17.593l1.466 1.466v52.658l-1.466 1.466h-17.593zM117.876 223.787v-52.658l1.466-1.466h17.593l1.466 1.466v52.658l-1.466 1.465h-17.593z"
    />
  </svg>
);

const cloudProviderIcons = {
  salesforce: Salesforce,
  azure: MicrosoftAzure,
  cloudflare: Cloudflare,
  netlify: Netlify,
};

export default function Example() {
  const [cloudProvider, setCloudProvider] = useState<
    'salesforce' | 'azure' | 'cloudflare' | 'netlify'
  >('salesforce');
  const [region, setRegion] = useState(regionOptions.salesforce[0].value);
  const [activeHours, setActiveHours] = useState([6]);
  const [storageVolume, setStorageVolume] = useState(6);
  const [compression, setCompression] = useState('false');

  useEffect(() => {
    if (regionOptions[cloudProvider].length > 0) {
      setRegion(regionOptions[cloudProvider][0].value);
    }
  }, [cloudProvider]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const calculatePrice = () => {
    const basePrices = {
      salesforce: 0.023,
      azure: 0.025,
      cloudflare: 0.045,
      netlify: 0.074,
    };

    const activeHourMultiplier = 0.05;
    const compressionMultiplier = compression === 'true' ? 0.7 : 1.0;

    const basePrice = basePrices[cloudProvider];
    const selectedRegion = regionOptions[cloudProvider].find(
      (r) => r.value === region,
    );
    const regionMultiplier = selectedRegion?.multiplier || 1.0;
    const storagePrice =
      basePrice * storageVolume * regionMultiplier * compressionMultiplier;
    const activeHoursPrice = activeHours[0] * activeHourMultiplier;

    const totalPricePerDay = storagePrice + activeHoursPrice;
    const totalPricePerMonth = totalPricePerDay * 30;

    const priceRangeLow = (totalPricePerMonth * 0.8 * 10).toFixed(0);
    const priceRangeHigh = (totalPricePerMonth * 1.2 * 10).toFixed(0);

    return `${priceRangeLow} - ${priceRangeHigh} USD`;
  };

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 sm:text-xl">
        Create a new compute cluster
      </h1>
      <p className="mt-6 leading-6 text-gray-700 dark:text-gray-300 sm:text-sm">
        You have full control over the resources provisioned.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex flex-col gap-6">
          <fieldset className="space-y-2">
            <legend className="font-medium text-gray-900 dark:text-gray-50 sm:text-sm">
              Cloud Provider
            </legend>
            <RadioCardGroup
              id="cloud-provider"
              value={cloudProvider}
              onValueChange={(value) =>
                setCloudProvider(
                  value as 'salesforce' | 'azure' | 'cloudflare' | 'netlify',
                )
              }
              className="mt-2 grid grid-cols-1 gap-4 sm:text-sm md:grid-cols-2"
              aria-label="Select cloud provider"
            >
              {Object.keys(regionOptions).map((provider) => {
                const Icon =
                  cloudProviderIcons[
                  provider as keyof typeof cloudProviderIcons
                  ];
                return (
                  <RadioCardItem
                    key={provider}
                    value={provider}
                    className="flex items-start justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Icon className="size-5 shrink-0" aria-hidden="true" />
                        <span className="font-semibold capitalize leading-6 text-gray-900 dark:text-gray-50">
                          {provider}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-500 sm:text-xs">
                        {
                          regionOptions[provider as keyof typeof regionOptions]
                            .length
                        }{' '}
                        regions available
                      </p>
                    </div>
                    <RadioCardIndicator className="mt-1" />
                  </RadioCardItem>
                );
              })}
            </RadioCardGroup>
          </fieldset>
          <div className="space-y-2">
            <Label
              className="text-base font-medium text-gray-900 dark:text-gray-50 sm:text-sm"
              htmlFor="storage"
            >
              Region
            </Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger id="region" className="w-full">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regionOptions[cloudProvider].map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center gap-x-2">
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-8 sm:flex-row">
            <div className="space-y-2">
              <Label
                className="whitespace-nowrap text-base font-medium text-gray-900 dark:text-gray-50 sm:text-sm/7"
                htmlFor="storage"
              >
                Storage (GB)
              </Label>
              <Input
                id="storage"
                type="number"
                min={1}
                max={128}
                value={storageVolume}
                onChange={(e) => setStorageVolume(Number(e.target.value))}
                aria-describedby="storage-description"
              />
              <p id="storage-description" className="sr-only">
                Enter storage volume between 6 and 128 GB
              </p>
            </div>
            <fieldset className="space-y-2">
              <legend className="block font-medium text-gray-900 dark:text-gray-50 sm:text-sm/7">
                Would you like to auto compress your data?
              </legend>
              <RadioGroup
                value={compression}
                onValueChange={(value) => {
                  setCompression(value);
                }}
                className="flex gap-6 pt-2.5"
              >
                <div className="flex items-center gap-x-3">
                  <RadioGroupItem value="true" id="compression-yes" />
                  <Label htmlFor="compression-yes">Yes</Label>
                </div>
                <div className="flex items-center gap-x-3">
                  <RadioGroupItem value="false" id="compression-no" />
                  <Label htmlFor="compression-no">No</Label>
                </div>
              </RadioGroup>
            </fieldset>
          </div>
          <div>
            <Label
              className="text-base font-medium text-gray-900 dark:text-gray-50 sm:text-sm"
              htmlFor="hours"
            >
              Active hours per day (h)
            </Label>
            <div className="flex flex-nowrap gap-4">
              <Slider
                value={activeHours}
                onValueChange={setActiveHours}
                id="hours"
                defaultValue={[8]}
                max={24}
                step={1}
                aria-valuetext={`${activeHours[0]} hours`}
              />
              <div className="relative">
                <Input
                  type="number"
                  className="w-12"
                  value={activeHours.toString()}
                  onChange={(e) => {
                    const value = Math.max(
                      0,
                      Math.min(24, Number(e.target.value)),
                    );
                    setActiveHours([value]);
                  }}
                  enableStepper={false}
                  aria-label="active-hours"
                  aria-describedby="units"
                  min="0"
                  max="24"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                  <span
                    id="units"
                    className="text-gray-500 dark:text-gray-500 sm:text-sm"
                  >
                    h
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Card className="mt-4 space-y-1 border-gray-300 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 sm:text-sm">
              Estimated monthly costs
            </p>
            <p
              className="text-3xl font-medium tabular-nums text-gray-900 dark:text-gray-50 sm:text-2xl"
              aria-live="polite"
            >
              {calculatePrice()}
            </p>
          </Card>
          <div className="mt-6 flex justify-between">
            <Button type="button" variant="ghost" asChild>
              <Link href="/final-fleet-overview">Back</Link>
            </Button>
            <Button
              className="disabled:bg-gray-200 disabled:text-gray-500"
              type="submit"
              disabled={
                !cloudProvider ||
                !region ||
                !activeHours ||
                !storageVolume ||
                !compression
              }
              aria-disabled={
                !cloudProvider ||
                !region ||
                !activeHours ||
                !storageVolume ||
                !compression
              }
            >
              Continue
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
