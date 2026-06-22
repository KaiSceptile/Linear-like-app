import  { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(9, "email обязателен").email("Некорректный email"),
  password: z.string().min(8,"Пароль должен содержать минимум 8 символов"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа").max(100,"Имя слишком длинное"),
  email: z.string().min(9, "email обязателен").email("Некорректный email"),
  password: z.string().min(8,"Пароль должен содержать минимум 8 символов").regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
  confirmPassword: z.string().min(1,"Подтверждение пароля обязательно")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"]
})

export type LoginSchema = z.infer<typeof loginSchema>
export type RegisterSchema = z.infer<typeof registerSchema>