import { ERROR_MESSAGE } from './Constants.js';

export function validateNameLength(ary) {
  if (ary.some((x) => x.length > 5) === true) {
    throw new Error(ERROR_MESSAGE.INVALID_NAME_LENGTH);
  }
}

export function validateCarNameType(ele) {
  if (ele.some((item) => !Number.isNaN(Number(item))) === true) {
    throw new Error(ERROR_MESSAGE.INVALID_CAR_NAME_TYPE);
  }
}

export function validateCarNameExist(ele) {
  if (ele.includes('')) {
    throw new Error(ERROR_MESSAGE.INVALID_CAR_NAME_EMPTY);
  }
}
