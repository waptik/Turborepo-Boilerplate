import * as trpc from "@trpc/server";

import { Context } from "./createContext";

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>();
}

export function createProtectedRouter() {
  return createRouter().middleware(({ ctx, next }) => {
    return next({
      ctx,
    });
  });
}
