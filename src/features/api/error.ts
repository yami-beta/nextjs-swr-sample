export type ApiErrorResponse = {
  message: string;
};

class AppError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AppApiError extends AppError {
  public httpStatus: number;
  public apiError: ApiErrorResponse;

  constructor(httpStatus: number, apiError: ApiErrorResponse) {
    super(apiError.message);
    this.httpStatus = httpStatus;
    this.apiError = apiError;
  }
}

export const handleApiError = async (
  error: Error | Response | unknown
): Promise<AppApiError | Error> => {
  if (error instanceof Error) {
    return error;
  }

  if (error instanceof Response) {
    const json: ApiErrorResponse = await error.json();
    return new AppApiError(error.status, json);
  }

  return Promise.reject(error);
};
