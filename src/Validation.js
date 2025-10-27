import { ERROR_MESSAGE } from './Constants.js';

export function validateNameLength(ary) {
  if (ary.some((x) => x.length > 5) === true) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME_LENGTH);
  }
}
