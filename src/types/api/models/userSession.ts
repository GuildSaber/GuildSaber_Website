import { z } from "zod";

export const UserSessionSchema = z.object({
  UserID: z.number(),
  SessionID: z.number(),
  ExpirationUnixTime: z.number(),
  IsValid: z.boolean(),
});

export type UserSession = z.infer<typeof UserSessionSchema>;
