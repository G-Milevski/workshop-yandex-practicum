import { APIError } from '../api/types';


export function hasError(response: any): boolean {
  return Boolean(response && response.reason);
}
