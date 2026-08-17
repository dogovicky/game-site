export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
