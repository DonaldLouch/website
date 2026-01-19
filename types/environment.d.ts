namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DATABASE_URL: string;
    SECRET: string;
    JWT_SIGNING_PUBLIC_KEY: string;
    VITE_SITE_URL: string;
    VITE_SUPABASE_URL: string;
    VITE_SUPABASE_ANON_KEY: string;
    VITE_VULTR_HOST_NAME: string;
    VITE_VULTR_BUCKET_NAME: string;
    VITE_VULTR_SECRET_KEY: string;
    VITE_VULTR_ACCESS_KEY: string;
    EMAIL_SERVER_HOST: string;
    EMAIL_SERVER_PORT: string;
    EMAIL_SERVER_USER: string;
    EMAIL_SERVER_PASSWORD: string;
    EMAIL_FROM: string;
    VITE_WEBSITE_NAME: string;
    keywords: string;
    description: string;
  }
}
