namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;
    SECRET: string;
    JWT_SIGNING_PUBLIC_KEY: string;
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_VULTR_HOST_NAME: string;
    NEXT_PUBLIC_VULTR_BUCKET_NAME: string;
    NEXT_PUBLIC_VULTR_SECRET_KEY: string;
    NEXT_PUBLIC_VULTR_ACCESS_KEY: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    NEXT_PUBLIC_WEBSITE_NAME: string;
    keywords: string;
    description: string;
  }
}
