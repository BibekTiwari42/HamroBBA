export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  errors: {
    detail: string;
    [key: string]: any;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;