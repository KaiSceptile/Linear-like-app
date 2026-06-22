"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";

export const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Ошибка входа");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
      
      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {serverError}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
        >
          Войти
        </Button>
      </form>
      
      <p className="mt-4 text-center text-sm text-gray-600">
        Нет аккаунта?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
};