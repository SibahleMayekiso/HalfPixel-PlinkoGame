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
    ['*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*'],
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
    let boardMidpointXaxis = this._width / 2;

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
              .lineStyle(5, 0xb7312c)
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

const board = new GameBoard(500, 600);

board.SetUpGameBoard();

class GameAsset {
  //   constructor(positionX, positonY, height, width) {
  //     this.positionX = positionX;
  //     this.positionY = positionY;
  //     this.height = height;
  //     this.width = width;
  //   }

  GeneratePuck() {
    const puck = new PIXI.Graphics()
      .beginFill(Math.random() * 0xffffff)
      .drawCircle(
        Math.random() * app.screen.width,
        Math.random() * app.screen.height,
        10
      )
      .endFill();

    container.addChild(puck);
  }
}

app.ticker.add((delta) => loop(delta));

function loop(delta) {
  const asset = new GameAsset();
  asset.GeneratePuck();
}
