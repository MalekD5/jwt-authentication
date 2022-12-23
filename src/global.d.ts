declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT: number;
    }
  }
}

// turn this file into a module
export {};
