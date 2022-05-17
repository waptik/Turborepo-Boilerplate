import { PrismaClient } from "@prisma/client";

/**
 * Some notes
 *
 * To reset db:
 * @see https://github.com/prisma/prisma/issues/742#issuecomment-793968603
 */

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaClient ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaClient = prisma;
}

export default prisma;
