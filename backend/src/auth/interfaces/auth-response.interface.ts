export interface AuthResponse<T = void> {
  statusCode: number;
  message: string;
  data?: T;
}
