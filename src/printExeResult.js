import { Console } from '@woowacourse/mission-utils';

export default function printExeResult(ele) {
  for (let i = 0; i < ele.length; i += 1) {
    Console.print(`${ele[i].name} : ${ele[i].score}`);
  }
}
