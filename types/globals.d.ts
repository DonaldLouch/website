export {};

export type Roles = "admin" | "moderator" | "user" | "paymentOnly" | "ticketSupportOnly";
declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    };
  }
}