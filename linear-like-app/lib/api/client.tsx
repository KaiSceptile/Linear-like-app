const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

export const apiClient = {
  async post<T>(endpoint: string, data?: any): Promise<T> {
    console.log(data);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Важно для httpOnly cookies
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Что-то пошло не так");
    }

    return response.json();
  },

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Что-то пошло не так");
    }

    return response.json();
  },

  async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};