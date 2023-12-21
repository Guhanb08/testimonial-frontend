import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const registerSchema = zod.object({
  user_name: zod.string().min(1, { message: "⚠️ Name is required" }),
  email: zod.string().email({ message: "😕 Invalid email address" }),
  password: zod.string().min(8, { message: "😕 Password must be at least 8 characters" }),
  terms: zod.boolean().refine((value) => value, { message: "😕 Please accept the terms and conditions" }),
});


export const loginSchema = zod.object({
  email: zod.string().email({ message: "😕 Invalid email address" }),
  password: zod.string().min(1, { message: "😕 Password is required" }),
});


