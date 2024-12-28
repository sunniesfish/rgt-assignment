export interface SignUpDto {
  userId: string;
  password: string;
  employeeId: string;
}

export interface SignInDto {
  userId: string;
  password: string;
}

export interface AuthResponse<T = void> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface AuthError {
  statusCode: number;
  error: string;
  message: string | string[];
  timestamp: string;
}
