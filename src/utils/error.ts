export function throwErrorWithOutStackTrace(message: string) {
  const error = new Error(message);
  Error.captureStackTrace(error, throwErrorWithOutStackTrace);
  throw error;
}
