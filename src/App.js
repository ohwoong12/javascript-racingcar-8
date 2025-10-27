import { Console } from '@woowacourse/mission-utils';
import * as GameLogic from './GameLogic.js';

class App {
  async run() {
    const carAry = await GameLogic.getCarNames();
    const tryNumber = await GameLogic.getTryNumber();

    // 자동차 이름 배열로 자동차 객체 생성
    const carsObj = GameLogic.createCarsObj(carAry);

    Console.print('\n실행 결과');
    // 레이스 실행
    GameLogic.runRace(carsObj, tryNumber);

    // 최종 우승자 출력
    GameLogic.printWinners(carsObj);
  }
}

export default App;
