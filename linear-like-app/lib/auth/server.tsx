import { cookies } from "next/headers";

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  
  if (!token) {
    return null;
  }

  try {
    // Здесь можно сделать запрос к API для проверки токена
    // или декодировать JWT напрямую
    const response = await fetch(${process.env.NEXT_PUBLIC_API_URL}/auth/me, {
      headers: {
        Cookie: access_token=${token.value},
      },
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  }
  catch (e) {
    return null;
  }
}

// Использование в серверных компонентах
export async function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return async function AuthenticatedComponent(props: P) {
    const session = await getServerSession();
    
    if (!session) {
      // Редирект или показ ошибки
      return null;
    }

    return <Component {...props} />;
  };
}