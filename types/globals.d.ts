export {};

export type Roles = "admin" | "moderator" | "user" | "paymentOnly" | "ticketSupportOnly" | "loggedOut";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}