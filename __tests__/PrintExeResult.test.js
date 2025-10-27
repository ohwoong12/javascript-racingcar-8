import { MissionUtils } from '@woowacourse/mission-utils';
import printExeResult from '../src/printExeResult.js';

// printExeResult는 Console.print만 필요하므로 getLogSpy만 가져옴
const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('printExeResult.js 테스트', () => {
  test('자동차 객체 배열을 받아 올바른 포맷으로 출력해야 한다', () => {
    const logSpy = getLogSpy();
    const cars = [
      { name: 'pobi', score: '---' },
      { name: 'woni', score: '-' },
    ];

    printExeResult(cars);

    // Console.print가 정확히 두 번 호출되었는지 확인
    expect(logSpy).toHaveBeenCalledTimes(2);

    // 첫 번째 호출이 'pobi : ---'인지 확인
    expect(logSpy).toHaveBeenNthCalledWith(1, 'pobi : ---');
    // 두 번째 호출이 'woni : -'인지 확인
    expect(logSpy).toHaveBeenNthCalledWith(2, 'woni : -');
  });

  test('빈 배열이 들어와도 에러 없이 아무것도 출력하지 않아야 한다', () => {
    const logSpy = getLogSpy();
    const cars = [];

    printExeResult(cars);

    // 아무것도 호출되지 않아야 함
    expect(logSpy).not.toHaveBeenCalled();
  });

  test('점수가 없는 경우 "이름 : " 포맷으로 출력해야 한다', () => {
    const logSpy = getLogSpy();
    const cars = [{ name: 'crong', score: '' }];

    printExeResult(cars);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('crong : ');
  });
});
