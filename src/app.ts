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

const gamePuck = new GamePuck(250, 100, Math.random() - 0.5, 1);

startButtonSprite.on("pointerdown", () => {
  gamePuck.ResetPostion();

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
    "./gamePucks/vecteezy_start-button.png"
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

  if (gamePuck.positionY > 1000) {
      container.removeChild(gamePuck);
  }
  else{
    gamePuck.UpdatePosition(secondsPassed);
  
    board.DetectCircleOnSquareCollisions(gamePuck);
    board.DetectCircleOnCirclceCollisions(gamePuck);
    
    puckContainer.removeChildren();

    gamePuck.GeneratePuck();
  }
  requestAnimationFrame((timeStamp) => GameLoop(timeStamp));
}

// function MovePuckOnPath(path: string[]) {
//   gamePuck.GeneratePuck();

//   path.forEach((element, index) => {
//     setTimeout(() => {
//       let axisValues = element.split(";");

//       gamePuck.positionX = Number.parseInt(axisValues[0]);
//       gamePuck.positionY = Number.parseInt(axisValues[1]);

//       gamePuck.MovePosition();
//     }, 1000 * index);
//   });
// }
