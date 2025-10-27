import { Random } from '@woowacourse/mission-utils';

function CircuitScore(obj) {
  const slash = '-';
  obj.forEach((ele) => {
    const num = Random.pickNumberInRange(0, 9);
    if (num >= 4) ele.score += slash;
  });
}

export default CircuitScore;
