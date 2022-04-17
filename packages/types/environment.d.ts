declare namespace NodeJS {
  interface ProcessEnv {
    readonly LOG_LEVEL: string | undefined;
    readonly DATABASE_URL: string | undefined;
    readonly VERCEL_ENV: "production" | "preview" | "development" | undefined;
    /** The URL of the deployment. Example: my-site-7q03y4pi5.vercel.app. */
    readonly VERCEL_URL: string | undefined;

  }
}
