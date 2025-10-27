import { Console } from '@woowacourse/mission-utils';
import { CONSOLE_MESSAGE } from './Constants.js';
import printExeResult from './printExeResult.js';
import CircuitScore from './CircuitScore.js';

/**
 * 자동차 이름을 입력받고 배열로 반환하는 함수
 * @returns {Promise<string[]>}
 */
export async function getCarNames() {
  const carInput = await Console.readLineAsync(CONSOLE_MESSAGE.START_MESSAGE);

  const carNamesAry = carInput.split(',');

  return carNamesAry;
}
/**
 * 시도할 입력 횟수를 입력 받고 숫자로 반환하는 함수
 * @returns {Promise<number>} - 시도할 횟수
 */
export async function getTryNumber() {
  const tryNumberInput = await Console.readLineAsync(
    CONSOLE_MESSAGE.SELECT_TRY_NUMBER,
  );

  const tryNumber = Number(tryNumberInput); // 검증 후 숫자로 변환

  return tryNumber;
}

/**
 * 주어진 배열을 객체 배열로 생성하는 함수
 * @param {string[]} carNames - 자동차 이름 배열
 * @returns {object[]}
 */
export function createCarsObj(carAry) {
  return carAry.map((name) => ({ name, score: '' }));
}

/**
 * 자동차 객체를 매개변수로 받아 레이스 실행 후 결과를 출력하는 함수
 * @param {object[]} cars - 자동차 객체 배열
 * @param {number} tryNumber - 시도 횟수
 */
export function runRace(cars, tryNumber) {
  // 입력받은 횟수만큼 반복하여 각 라운드 결과 출력
  for (let i = 0; i < tryNumber; i += 1) {
    CircuitScore(cars);
    Console.print('');
    printExeResult(cars);
  }
}
  }
