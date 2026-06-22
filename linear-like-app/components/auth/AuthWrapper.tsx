"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Проверка на клиенте (можно добавить проверку токена)
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });
        
        if (!response.ok) {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}