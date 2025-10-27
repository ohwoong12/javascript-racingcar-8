import { Console } from '@woowacourse/mission-utils';
import { CONSOLE_MESSAGE } from './Constants.js';

/**
 * 자동차 이름을 입력받고 배열로 반환하는 함수
 * @returns {Promise<string[]>}
 */
export async function getCarNames() {
  const carInput = await Console.readLineAsync(CONSOLE_MESSAGE.START_MESSAGE);

  const carNamesAry = carInput.split(',');

  return carNamesAry;
}
