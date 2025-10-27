import * as GameLogic from './GameLogic.js';

class App {
  async run() {
    const carAry = await GameLogic.getCarNames();
  }
}

export default App;
