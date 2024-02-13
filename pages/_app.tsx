/* eslint-disable @typescript-eslint/no-unused-vars */
import '../scss/app.scss';

import { Transition } from '@headlessui/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { enGB, fr } from 'date-fns/locale';
import { isDevelopmentEnv } from 'env-vars-validator';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { resolveValue, Toaster, ToastIcon } from 'react-hot-toast';
import { RosettyProvider } from 'rosetty-react';

import { AppLayout } from '../components/layout/AppLayout';
import enDict from '../i18n/en';
import frDict from '../i18n/fr';
import { useI18nSEO } from '../i18n/useI18n';
import { reactQueryClient } from '../services/apis/react-query/reactQueryClient';
import { useDark } from '../services/useDark';

const rosettyLocales = {
  fr: { dict: frDict, locale: fr },
  en: { dict: enDict, locale: enGB },
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <QueryClientProvider client={reactQueryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <meta name="google" content="nositelinkssearchbox" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>App</title>
      </Head>
      <RosettyProvider languages={rosettyLocales} defaultLanguage="en">
        <ExtendedApp {...{ Component, pageProps }} />
      </RosettyProvider>
    </QueryClientProvider>
  </>
);

const ExtendedApp = ({ Component, pageProps }) => {
  useI18nSEO();
  //@ts-ignore
  const Layout = Component.Layout ? Component.Layout : AppLayout;

  useDark();

  return (
    <>
      <Layout>
        <Component {...pageProps} />
        {isDevelopmentEnv() && <ReactQueryDevtools initialIsOpen={false} />}
      </Layout>
      <Toaster position="top-center" gutter={5}>
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className="flex transform items-center rounded bg-white p-4 shadow-lg dark:bg-zinc-800 dark:text-white"
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <ToastIcon toast={t} />
            <p className="px-2">{resolveValue(t.message, t)}</p>
          </Transition>
        )}
      </Toaster>
    </>
  );
};

export default MyApp;
