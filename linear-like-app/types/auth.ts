export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface authResponse {
  success: boolean;
  meassage?: string;
  user?:{
    name: string;
    email: string;
    id: string;
  }
}