import * as PIXI from "./node_modules/pixi.js/dist/pixi.mjs";

const app = new PIXI.Application({
  width: 500,
  height: 600,
  backgroundColor: 0x0a000f,
});

document.body.appendChild(app.view);

//prettier-ignore
const gameBoardMap = [
    [' ', ' ', ' ', ' ', ' ', '0', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', '*', ' ', '*', ' ', '*', ' ', ' ', ' '],
    [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
    [' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
    [' ', '_', ' ', '_', ' ', '_', ' ', '_', ' ', '_', ' '],
  ];

const container = new PIXI.Container();
app.stage.addChild(container);

class GameBoard {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  SetUpGameBoard() {
    const boardMidpointXaxis = this._width / 2;

    gameBoardMap.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        switch (column) {
          case "0":
            const hole = new PIXI.Graphics()
              .beginFill(0xdddddd)
              .drawCircle(
                boardMidpointXaxis + 50 * rowIndex,
                this._height / 6,
                15
              )
              .endFill();

            container.addChild(hole);
            break;

          case "*":
            const pin = new PIXI.Graphics()
              .beginFill(0xffffff)
              .drawCircle(50 * columnIndex, 100 + 50 * rowIndex, 5)
              .endFill();

            container.addChild(pin);
            break;

          case "_":
            const bucket = new PIXI.Graphics()
              .beginFill(0xf0d020)
              .lineStyle(5, 0x4b0008)
              .drawRect(50 * columnIndex - 25, 100 + 50 * rowIndex, 50, 50, 2)
              .endFill();

            container.addChild(bucket);
            break;

          default:
            break;
        }
      });
    });
  }
}

const coinPuck = PIXI.Sprite.from("./assets/Coin Pack/Coin9.png");

class GameAsset {
  static velocityX = 0;
  static velocityY = 0;

  constructor(positionX, positionY) {
    this._positionX = positionX;
    this._positionY = positionY;
  }

  GeneratePuck() {
    coinPuck.anchor.set(0.5);
    coinPuck.width = 25;
    coinPuck.height = 25;

    coinPuck.x = this.positionX;
    coinPuck.y = this.positionY;

    container.addChild(coinPuck);
  }

  UpdatePosition() {
    GameAsset.velocityX++;
    GameAsset.velocityY++;

    coinPuck.x = 250;
    coinPuck.y = 100 + GameAsset.velocityY;

    this.positionX = coinPuck.x;
    this.positionY = coinPuck.y;

    console.log(`xAxis: ${this._positionX}, yAxis: ${this.positionY}`);
    // app.render();
    this.GeneratePuck();
  }

  Reset() {
    this.GeneratePuck();
  }
}

const board = new GameBoard(500, 600);
board.SetUpGameBoard();

const startButtonSprite = PIXI.Sprite.from(
  "./assets/vecteezy_start-button.png"
);
container.addChild(startButtonSprite);

startButtonSprite.width = 150;
startButtonSprite.height = 75;

startButtonSprite.x = 175;

startButtonSprite.interactive = true;

const asset = new GameAsset(250, 100);

let score = 0;
let coins = 10;

startButtonSprite.on("pointerdown", () => {
  score++;
  coins--;
  coinPuck.y = 100;

  document.getElementById("player-score").innerHTML = `Score : ${score}`;
  document.getElementById("player-coins").innerHTML = `Coins : ${coins}`;

  setInterval(GameLoop, 1000 / 60);
});

function GameLoop() {
  if (coinPuck.position.y < 375 && coins >= 0) {
    asset.UpdatePosition();
  } else {
    container.removeChild(coinPuck);
  }

  asset.Reset();
}

// setInterval(GameLoop, 5000 / 60);
