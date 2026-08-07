import { z } from "zod";
import { loginSchema, registerUserSchema } from "../schemas/auth.schema";

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;

export type LoginDTO = z.infer<typeof loginSchema>;