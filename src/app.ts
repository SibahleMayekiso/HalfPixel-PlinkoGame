import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameBoard } from "./GameBoard.js";
import { CalculateNavigationPath, PreDetermineBucketToLandIn } from "./GameLogic.js";
import { GamePuck } from "./GamePuck.js";
import { GameScoreSystem } from "./ScoreSystem.js";

const app = new PIXI.Application({
  width: 500,
  height: 600,
  backgroundColor: 0x0a000f,
});

document.body.appendChild(app.view);

export const container = new PIXI.Container();
export const puckContainer = new PIXI.Container();
app.stage.addChild(container, puckContainer);

//prettier-ignore
export const gameBoardMap = [
  [' ', ' ', ' ', ' ', ' ', '0', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', '*', ' ', '*', ' ', '*', ' ', ' ', ' '],
  [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
  [' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' '],
  ['*', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', '*'],
  [' ', '_', ' ', '_', ' ', '_', ' ', '_', ' ', '_', ' '],
];

const board = new GameBoard(500, 600);
board.SetUpGameBoard();

const startButtonSprite = CreateStartButton();

const asset = new GamePuck(250, 100, Math.random() - 0.5, 1);
// const asset = new GamePuck(250, 100, 0, 15);

startButtonSprite.on("pointerdown", () => {
  asset.ResetPostion();

  if (board.scoreState._totalPlayerPoints <= 0) {
    console.log("Game Over! Insufficient Coins");
    document.getElementById("player-coins")!.style.color = "red";
    
    startButtonSprite.interactive = false;
  } 
  else {
    // const bucketNumber = PreDetermineBucketToLandIn();
    // const path = CalculateNavigationPath(bucketNumber);
    
    // let currentScore = board.scoreState.GetCurrentScore()
    // scoreState.UpdateScore(currentScore, bucketNumber);
    board.scoreState.UpdatePoints();

    // MovePuckOnPath(path);
    
    document.getElementById("player-score")!.innerHTML = `Score : ${board.scoreState._totalPlayerScore}`;
    document.getElementById("player-coins")!.innerHTML = `Coins : ${board.scoreState._totalPlayerPoints}`;
    
    requestAnimationFrame((timeStamp) => GameLoop(timeStamp));
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

let oldTimeStamp = 0;
let secondsPassed = 0;

function GameLoop(timeStamp: number) {
  secondsPassed = (timeStamp - oldTimeStamp) / 500;
  oldTimeStamp = timeStamp;

  if (asset.positionY > 1000) {
      container.removeChild(asset);
  }
  else{
    asset.UpdatePosition(secondsPassed);
  
    board.DetectCircleOnSquareCollisions(asset);
    board.DetectCircleOnCirclceCollisions(asset);
    
    puckContainer.removeChildren();

    asset.GeneratePuck();
  }
  requestAnimationFrame((timeStamp) => GameLoop(timeStamp));
}

// function MovePuckOnPath(path: string[]) {
//   asset.GeneratePuck();

//   path.forEach((element, index) => {
//     setTimeout(() => {
//       let axisValues = element.split(";");

//       asset.positionX = Number.parseInt(axisValues[0]);
//       asset.positionY = Number.parseInt(axisValues[1]);

//       asset.MovePosition();
//     }, 1000 * index);
//   });
// }
