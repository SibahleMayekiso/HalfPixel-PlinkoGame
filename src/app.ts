import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { CalculatNavigationPath } from "./GameLogic.js";

const app = new PIXI.Application({
  width: 500,
  height: 600,
  backgroundColor: 0x0a000f,
});

document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

//prettier-ignore
const gameBoardMap = [
  [' ', ' ', ' ', ' ', ' ', '0', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', '*', ' ', '*', ' ', '*', ' ', ' ', ' '],
  [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
  [' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
  [' ', '_', ' ', '_', ' ', '_', ' ', '_', ' ', '_', ' '],
];

class GameBoard {
  _width: number;
  _height: number;

  constructor(width: number, height: number) {
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

  _positionX: number;
  _positionY: number;

  constructor(positionX: number, positionY: number) {
    this._positionX = positionX;
    this._positionY = positionY;
  }

  GeneratePuck() {
    coinPuck.anchor.set(0.5);
    coinPuck.width = 25;
    coinPuck.height = 25;

    coinPuck.x = this._positionX;
    coinPuck.y = this._positionY;

    container.addChild(coinPuck);
  }

  UpdatePosition() {
    // this.GeneratePuck();

    GameAsset.velocityX++;
    GameAsset.velocityY++;

    coinPuck.x = 250;
    coinPuck.y += GameAsset.velocityY;

    //Test output
    console.log(`xAxis: ${this._positionX}, yAxis: ${this._positionY}`);
    console.log(`Velocity Y: ${GameAsset.velocityY}`);
  }

  MovePosition() {
    coinPuck.x = this._positionX;
    coinPuck.y = this._positionY;
  }

  ResetPostion() {
    this._positionX = 250;
    this._positionY = 100;

    GameAsset.velocityX = 5;
    GameAsset.velocityY = 5;
  }
}

const board = new GameBoard(500, 600);
board.SetUpGameBoard();

const startButtonSprite = CreateStartButton();

const asset = new GameAsset(250, 100);

let score = 0;
let coins = 10;

startButtonSprite.on("pointerdown", () => {
  asset.ResetPostion();

  const path = CalculatNavigationPath(2);
  MovePuckOnPath(path);

  console.log(asset);

  score++;
  coins--;

  if (coins <= 0) {
    console.log("Game Over! Insufficient Coins");
    document.getElementById("player-coins")!.style.color = "red";
  } else {
    document.getElementById("player-score")!.innerHTML = `Score : ${score}`;
    document.getElementById("player-coins")!.innerHTML = `Coins : ${coins}`;

    setInterval(GameLoop, 1000 / 5);
  }
});

function CreateStartButton() {
  const startButtonSprite = PIXI.Sprite.from(
    "./assets/vecteezy_start-button.png"
  );

  startButtonSprite.width = 150;
  startButtonSprite.height = 75;

  startButtonSprite.x = 175;

  startButtonSprite.interactive = true;
  container.addChild(startButtonSprite);

  return startButtonSprite;
}

function GameLoop() {
  if (coins <= 0) {
    container.removeChild(coinPuck);
    startButtonSprite.interactive = false;
  }
}

function MovePuckOnPath(path: string[]) {
  asset.GeneratePuck();

  path.forEach((element, index) => {
    setTimeout(() => {
      let axisValues = element.split(";");
      console.log(axisValues);

      asset._positionX = Number.parseInt(axisValues[0]);
      asset._positionY = Number.parseInt(axisValues[1]);
      console.log(
        `Current position x & y: ${asset._positionX}, ${asset._positionY}`
      );
      asset.MovePosition();
    }, 500 * index);
  });
}
