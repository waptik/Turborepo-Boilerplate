import { GetServerSidePropsContext } from "next";
import prisma from "~lib/prisma";

import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

export type CreateContextOptions = trpcNext.CreateNextContextOptions | GetServerSidePropsContext;

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export const createContextInner = async (_opts?: CreateContextOptions) => {
  return {
    prisma,
  };
};

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({ req }: CreateContextOptions) => {
  // for API-response caching see https://trpc.io/docs/caching
  const inner = await createContextInner();

  return {
    req,
    ...inner,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
