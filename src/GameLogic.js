import { Console } from '@woowacourse/mission-utils';
import { CONSOLE_MESSAGE } from './Constants.js';
import printExeResult from './printExeResult.js';
import CircuitScore from './CircuitScore.js';
import * as Validation from './Validation.js';

/**
 * 자동차 이름을 입력받고 배열로 반환하는 함수
 * @returns {Promise<string[]>}
 */
export async function getCarNames() {
  const carInput = await Console.readLineAsync(CONSOLE_MESSAGE.START_MESSAGE);

  const carNamesAry = carInput.split(',');

  // 유효성 검사
  Validation.validateNameLength(carNamesAry);
  Validation.validateCarNameType(carNamesAry);

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

/**
 * 레이스가 끝난 자동차 객체에서 최종 우승자를 가려내는 함수
 * @param {object[]} cars - 레이스가 완료된 자동차 객체 배열
 * @returns {string[]} - 최종 우승자 이름 배열
 */
export function getWinners(cars) {
  // score의 길이를 순회하여 새로운 배열로 저장
  const scoreLengthAry = cars.map((a) => a.score.length);

  // 길이가 제일 높은 점수 찾기
  const maxLength = Math.max(...scoreLengthAry);

  // 제일 긴 점수를 바탕으로 해당 점수를 가진 자동차 추출 후 새로운 배열 반환
  const filteredScore = cars.filter((a) => a.score.length === maxLength);

  // filteredScore를 순회하여 최종 우승자만 추출
  const finalWinner = filteredScore.map((winner) => winner.name);

  return finalWinner;
}

/**
 * 최종 우승자를 출력하는 함수
 * @param {object[]} cars - 레이스가 완료된 자동차 객체 배열
 */
export function printWinners(cars) {
  const finalWinner = getWinners(cars);

  Console.print(`최종 우승자 : ${finalWinner.join(', ')}`);
  }
