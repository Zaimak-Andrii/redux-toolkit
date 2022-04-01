export interface IError<T> {
  code?: number;
  message?: string;
  data?: T;
}
