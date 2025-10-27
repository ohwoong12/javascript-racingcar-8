import * as Validation from '../src/Validation.js';
import { ERROR_MESSAGE } from '../src/Constants.js';

describe('자동차 이름 입력 값 테스트', () => {
  test('이름이 5자를 초과하면 에러 발생', () => {
    const inputs = ['pooobi', 'asdf'];

    expect(() => Validation.validateNameLength(inputs)).toThrow(
      ERROR_MESSAGE.INVALID_NAME_LENGTH,
    );
  });

  test('이름이 5자 이하면 에러 발생하지 않아야 함', () => {
    const normalName = ['pobi', 'woni'];

    expect(() => Validation.validateNameLength(normalName)).not.toThrow();
  });

  test('입력받은 값이 문자열이 아니면 에러 발생', () => {
    const notStringName = [`123`, `123`];

    expect(() => Validation.validateCarNameType(notStringName)).toThrow(
      ERROR_MESSAGE.INVALID_CAR_NAME_TYPE,
    );
  });

  test('입력받은 값이 빈 문자열이면 에러 발생', () => {
    const emptyAry = [''];
    expect(() => Validation.validateCarNameExist(emptyAry)).toThrow(
      ERROR_MESSAGE.INVALID_CAR_NAME_EMPTY,
    );
  });
});

test('횟수 입력이 숫자가 아니면 에러 발생', () => {
  const tryNumber = 'af';

  expect(() => Validation.validateTryNumberType(tryNumber)).toThrow(
    ERROR_MESSAGE.INVALID_TRY_NUMBER_RANGE,
  );
});
