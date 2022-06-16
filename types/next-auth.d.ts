import "next-auth";

declare module "next-auth" {
  interface User {
    userLevel: number
  }
  interface Session {
    user: User;
  }
}