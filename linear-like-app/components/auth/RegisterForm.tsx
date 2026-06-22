"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const RegisterForm = () => {
  const { register: registerUser, isLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const successMessage = searchParams.get("registered") === "true" 
    ? "Регистрация успешна! Теперь вы можете войти." 
    : null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setServerError(null);
    try {
      await registerUser(data.name, data.email, data.password);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Ошибка регистрации");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Имя"
          type="text"
          placeholder="Иван Иванов"
          error={errors.name?.message}
          {...register("name")}
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="example@mail.com"
          error={errors.email?.message}
          {...register("email")}
        />
        
        <Input
          label="Пароль"
          type="password"
          placeholder="••••••"
          error={errors.password?.message}
          {...register("password")}
        />
        
        <Input
          label="Подтверждение пароля"
          type="password"
          placeholder="••••••"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Войти
        </Link>
      </p>
    </div>
  );
};