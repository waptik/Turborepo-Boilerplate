// 1. import `SaasProvider` component
import "@fontsource/inter/variable.css";
import { ModalsProvider, NProgressNextRouter, SaasProvider } from "@saas-ui/react";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import type { TRPCClientErrorLike } from "@trpc/react";
import { Maybe } from "@trpc/server";
import { DefaultSeo } from "next-seo";
import Link, { LinkProps } from "next/link";
import * as React from "react";
import superjson from "superjson";
import siteConfig from "~/config/site.config";
import theme from "~/config/theme.config";
import AppProviders, { AppProps } from "~/lib/app-providers";
import { AppRouter } from "~/server/routers/_app";

// 2. Create a link wrapper, this way Saas UI components will use the Next router.
const NextLink: React.FC<LinkProps> = (props) => <Link passHref {...props} />;

function MyApp(props: AppProps) {
  const { Component, pageProps, err, router } = props;


  return (
    <>
      <AppProviders {...props}>
        <DefaultSeo {...siteConfig.seo} />
        <SaasProvider theme={theme} linkComponent={NextLink}>
          <ModalsProvider>
            <NProgressNextRouter router={router} />
            <Component {...pageProps} err={err} />
          </ModalsProvider>
        </SaasProvider>
      </AppProviders>
    </>
  );
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    return {
      /**
       * @link https://trpc.io/docs/links
       */
      links: [
        // adds pretty logs to your console in development and logs errors in production
        loggerLink({
          enabled: (opts) =>
            !!process.env.NEXT_PUBLIC_DEBUG || (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            /**
             * 1s should be enough to just keep identical query waterfalls low
             * @example if one page components uses a query that is also used further down the tree
             */
            staleTime: 1000,
            /**
             * Retry `useQuery()` calls depending on this function
             */
            retry(failureCount, _err) {
              const err = _err as never as Maybe<TRPCClientErrorLike<AppRouter>>;
              const code = err?.data?.code;
              if (code === "BAD_REQUEST" || code === "FORBIDDEN" || code === "UNAUTHORIZED") {
                // if input data is wrong or you're not authorized there's no point retrying a query
                return false;
              }
              const MAX_QUERY_RETRIES = 3;
              return failureCount < MAX_QUERY_RETRIES;
            },
          },
        },
      },
      /**
       * @link https://trpc.io/docs/data-transformers
       */
      transformer: superjson,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
