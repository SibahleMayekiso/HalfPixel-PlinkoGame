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
  [' ', ' ', '*', ' ', '*', ' ', '*', ' ', '*', ' ', ' '],
  [' ', '_', ' ', '_', ' ', '_', ' ', '_', ' ', '_', ' '],
];

const board = new GameBoard(500, 600);
board.SetUpGameBoard();

const startButtonSprite = CreateStartButton();

const asset = new GamePuck(250, 100, Math.random(), 150);
// const asset = new GamePuck(250, 100, 0, 15);
const scoreState = new GameScoreSystem(10, 0)


startButtonSprite.on("pointerdown", () => {
  asset.ResetPostion();

  // asset.GeneratePuck();

  if (scoreState._totalPlayerPoints <= 0) {
    container.removeChild(asset);
    console.log("Game Over! Insufficient Coins");
    document.getElementById("player-coins")!.style.color = "red";
    
    startButtonSprite.interactive = false;
  } 
  else {
    // const bucketNumber = PreDetermineBucketToLandIn();
    // const path = CalculateNavigationPath(bucketNumber);
    
    let currentScore = scoreState.GetCurrentScore()
    // scoreState.UpdateScore(currentScore, bucketNumber);
    scoreState.UpdatePoints();

    // MovePuckOnPath(path);
    
    document.getElementById("player-score")!.innerHTML = `Score : ${scoreState._totalPlayerScore}`;
    document.getElementById("player-coins")!.innerHTML = `Coins : ${scoreState._totalPlayerPoints}`;
    
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
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  // console.log(secondsPassed);
  
  if (asset.positionY > 350) {
      container.removeChild(asset);
  }
  else{
    asset.UpdatePosition(secondsPassed);
  
    board.DetectCircleOnCirclceCollisions(asset);
    board.DetectCircleOnSquareCollisions(asset);
    // console.log(asset);
    
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
