import * as GameLogic from './GameLogic.js';

class App {
  async run() {
    const carAry = await GameLogic.getCarNames();
    const tryNumber = await GameLogic.getTryNumber();

    // 자동차 이름 배열로 자동차 객체 생성
    const carsObj = GameLogic.createCarsObj(carAry);
  }
}

export default App;
