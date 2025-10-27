import * as GameLogic from './GameLogic.js';

class App {
  async run() {
    const carAry = await GameLogic.getCarNames();
    const tryNumber = await GameLogic.getTryNumber();
  }
}

export default App;
