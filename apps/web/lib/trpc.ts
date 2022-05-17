// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
import superjson from "superjson";
import { createContext, CreateContextOptions } from "~server/createContext";
import type { AppRouter } from "~server/routers/_app";
import { appRouter } from "~server/routers/_app";

import { createReactQueryHooks } from "@trpc/react";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();

export const transformer = superjson;
/**
 * This is a helper method to infer the output of a query resolver
 * @example type HelloOutput = inferQueryOutput<'hello'>
 */
export type inferQueryOutput<TRouteKey extends keyof AppRouter["_def"]["queries"]> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

export type inferQueryInput<TRouteKey extends keyof AppRouter["_def"]["queries"]> = inferProcedureInput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

export type inferMutationInput<TRouteKey extends keyof AppRouter["_def"]["mutations"]> = inferProcedureInput<
  AppRouter["_def"]["mutations"][TRouteKey]
>;

export type inferMutationOutput<TRouteKey extends keyof AppRouter["_def"]["mutations"]> =
  inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

// to be used in api routes
export async function createCaller(opts: CreateContextOptions) {
  const ctx = await createContext(opts);
  const caller = appRouter.createCaller(ctx);
  return caller;
}
