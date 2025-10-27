import { MissionUtils } from '@woowacourse/mission-utils';
import * as GameLogic from '../src/GameLogic.js';
import { ERROR_MESSAGE } from '../src/Constants.js';

// ApplicationTest.js의 헬퍼 함수들
// MissionUtils의 Console, Random을 모의(mock) 객체로 설정
const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  inputs.reduce((acc, input) => {
    return acc.mockResolvedValueOnce(input);
  }, MissionUtils.Console.readLineAsync);
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('GameLogic.js 순수 함수 테스트', () => {
  test('createCarsObj: 이름 배열을 객체 배열로 정확히 변환해야 한다', () => {
    const names = ['pobi', 'woni'];
    const expected = [
      { name: 'pobi', score: '' },
      { name: 'woni', score: '' },
    ];
    expect(GameLogic.createCarsObj(names)).toEqual(expected);
  });

  test('getWinners: 단독 우승자를 정확히 찾아내야 한다', () => {
    const cars = [
      { name: 'pobi', score: '---' },
      { name: 'woni', score: '-' },
      { name: 'crong', score: '--' },
    ];
    expect(GameLogic.getWinners(cars)).toEqual(['pobi']);
  });

  test('getWinners: 공동 우승자를 정확히 찾아내야 한다', () => {
    const cars = [
      { name: 'pobi', score: '---' },
      { name: 'woni', score: '---' },
      { name: 'crong', score: '-' },
    ];
    expect(GameLogic.getWinners(cars)).toEqual(['pobi', 'woni']);
  });

  test('getWinners: 모든 참여자가 점수가 없어도 빈 배열이 아닌 모든 참여자를 반환해야 한다', () => {
    const cars = [
      { name: 'pobi', score: '' },
      { name: 'woni', score: '' },
    ];
    expect(GameLogic.getWinners(cars)).toEqual(['pobi', 'woni']);
  });
});

describe('GameLogic.js 비동기 및 사이드 이펙트 테스트', () => {
  beforeEach(() => {
    // 각 테스트가 독립적으로 실행되도록 mock을 초기화
    jest.restoreAllMocks();
  });

  test('getCarNames: 유효한 이름을 입력받아 배열로 반환해야 한다', async () => {
    mockQuestions(['pobi,woni']);
    await expect(GameLogic.getCarNames()).resolves.toEqual(['pobi', 'woni']);
  });

  test('getCarNames: 유효하지 않은 이름(길이 초과) 입력 시 에러를 던져야 한다', async () => {
    mockQuestions(['pobi,javaji']);
    await expect(GameLogic.getCarNames()).rejects.toThrow(
      ERROR_MESSAGE.INVALID_NAME_LENGTH,
    );
  });

  test('getTryNumber: 유효한 숫자를 입력받아 숫자로 반환해야 한다', async () => {
    mockQuestions(['5']);
    await expect(GameLogic.getTryNumber()).resolves.toBe(5);
  });

  test('getTryNumber: 유효하지 않은 값(문자) 입력 시 에러를 던져야 한다', async () => {
    mockQuestions(['abc']);
    await expect(GameLogic.getTryNumber()).rejects.toThrow(
      ERROR_MESSAGE.INVALID_TRY_NUMBER_RANGE,
    );
  });

  test('getTryNumber: 유효하지 않은 값(음수) 입력 시 에러를 던져야 한다', async () => {
    mockQuestions(['-1']);
    await expect(GameLogic.getTryNumber()).rejects.toThrow(
      ERROR_MESSAGE.INVALID_TRY_NUMBER_RANGE,
    );
  });

  test('printWinners: 최종 우승자를 정확한 포맷으로 출력해야 한다', () => {
    const logSpy = getLogSpy();
    const cars = [
      { name: 'pobi', score: '---' },
      { name: 'woni', score: '---' },
    ];
    GameLogic.printWinners(cars);

    expect(logSpy).toHaveBeenCalledWith('최종 우승자 : pobi, woni');
  });

  test('runRace: 레이스 실행 중 매 라운드 결과를 출력해야 한다', () => {
    const logSpy = getLogSpy();
    mockRandoms([4, 3]);

    const cars = GameLogic.createCarsObj(['pobi', 'woni']);
    GameLogic.runRace(cars, 1); // 1회 실행

    // printExeResult가 호출되어 콘솔에 "pobi : -" 와 "woni : "가 찍히는지 확인
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : -'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('woni : '));
  });
});
