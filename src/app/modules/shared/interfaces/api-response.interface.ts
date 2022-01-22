export interface ApiResponse<T = any> {
  status: string;
  data: T;
  errorMessage?: string;
}
