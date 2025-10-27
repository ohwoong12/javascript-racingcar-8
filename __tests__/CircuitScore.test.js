import { MissionUtils } from '@woowacourse/mission-utils';
import CircuitScore from '../src/CircuitScore.js';

// CircuitScore는 Random만 필요
const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

describe('CircuitScore.js 테스트', () => {
  test('랜덤 숫자가 4 이상일 때 score에 "-"가 추가되어야 한다', () => {
    // 4 이상의 값은 모두 전진
    mockRandoms([4, 9]);

    const cars = [
      { name: 'pobi', score: '' },
      { name: 'woni', score: '-' },
    ];
    CircuitScore(cars);

    expect(cars[0].score).toBe('-');
    expect(cars[1].score).toBe('--');
  });

  test('랜덤 숫자가 3 이하일 때 score가 변하지 않아야 한다', () => {
    // 4 이하의 값은 모두 유지
    mockRandoms([0, 3]);

    const cars = [
      { name: 'pobi', score: '' },
      { name: 'woni', score: '-' },
    ];
    CircuitScore(cars);

    expect(cars[0].score).toBe('');
    expect(cars[1].score).toBe('-');
  });

  test('전진과 정지가 섞여있을 때 올바르게 동작해야 한다', () => {
    // pobi (전진), woni (정지)
    mockRandoms([5, 1]);

    const cars = [
      { name: 'pobi', score: '-' },
      { name: 'woni', score: '--' },
    ];
    CircuitScore(cars);

    expect(cars[0].score).toBe('--');
    expect(cars[1].score).toBe('--');
  });
});
