import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { AuthResponse } from "@/types/auth";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    const data = {
      email: email,
      password: password
    }

    try {
      const response = await apiClient.post<AuthResponse>("auth/login", data);
      
      if (response.success) {
        router.push("/dashboard");
        router.refresh(); // Обновляет серверные компоненты
        return response;
      } else {
        throw new Error(response.message || "Ошибка входа");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    const data = {
      name: name,
      email: email,
      password: password,
      createdAt: Date.now(),
    }

    try {
      const response = await apiClient.post<AuthResponse>("auth/register", data);
      console.log(response);
      if (response.success) {
        router.push("/login?registered=true");
        return response;
      } else {
        throw new Error(response.message || "Ошибка регистрации");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Ошибка выхода:", err);
    }
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
  };
};