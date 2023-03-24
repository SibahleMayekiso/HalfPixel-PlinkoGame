import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { CalculateNavigationPath, PreDetermineBucketToLandIn } from "./GameLogic.js";
import { GameScoreSystem } from "./ScoreSystem.js";

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

class GameBucketSlot{
  positionX: number;
  positionY: number;
  bucketPoints: number;

  constructor(positionX: number, positionY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.bucketPoints = 0;
  }
  
  GetBucketPoints(){
    console.log(`Bucket points: ${this.bucketPoints}`);
  }

  GenerateBucket(bucketIndex: number) {
    let absoulteNumber = Math.abs(bucketIndex - 5);

    switch (absoulteNumber) {
      case 4:
        this.bucketPoints = 10;

        const bucketTen = PIXI.Sprite.from("/assets/BucketAssets/10PointsBucketSlot.png");

        bucketTen.anchor.set(0.5);
        bucketTen.width = 75;
        bucketTen.height = 50;
        bucketTen.x = this.positionX;
        bucketTen.y = this.positionY;

        container.addChild(bucketTen);

        break;
      case 2:
        this.bucketPoints = 5;

        const bucketFive = PIXI.Sprite.from("/assets/BucketAssets/5PointsBucketSlot.png");

        bucketFive.anchor.set(0.5);
        bucketFive.width = 75;
        bucketFive.height = 50;
        bucketFive.x = this.positionX;
        bucketFive.y = this.positionY;

        container.addChild(bucketFive);  

        break;
      case 0:
        this.bucketPoints = 2;

        const bucketTwo = PIXI.Sprite.from("/assets/BucketAssets/2PointsBucketSlot.png");

        bucketTwo.anchor.set(0.5);
        bucketTwo.width = 75;
        bucketTwo.height = 50;
        bucketTwo.x = this.positionX;
        bucketTwo.y = this.positionY;

        container.addChild(bucketTwo);  

        break;
    
      default:
        break;
    }
  }
}

class GameBoard {
  _width: number;
  _height: number;
  plinkoPins: GamePlinkoPin[];

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.plinkoPins = [];
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
            const plinkoPin = new GamePlinkoPin(50 * columnIndex, 100 + 50 * rowIndex, 0, 0);
            console.log(plinkoPin);
            
            this.plinkoPins.push(plinkoPin);
            plinkoPin.GeneratePin();
            break;

          case "_":
            const bucket = new GameBucketSlot(50 * columnIndex, 100 + 50 * rowIndex);
            bucket.GenerateBucket(columnIndex);

            // bucket.GetBucketPoints();

            break;

          default:
            break;
        }
      });
    });
  }

  DetectCollisions(puck: GamePuck) {
  puck.isColliding = false;

  this.plinkoPins.forEach((element) => element.isColliding = false);
  
  
  for (let index = 0; index < this.plinkoPins.length; index++) {
    let plinkoPin = this.plinkoPins[index];

    if (CheckCircleIntersect(puck.positionX, puck.positionY, puck.radius, plinkoPin.positionX, plinkoPin.positionY, plinkoPin.radius)) {
      puck.isColliding = true;
      plinkoPin.isColliding = true;

      let collisionVector = {xAxis: puck.positionX - plinkoPin.positionX, yAxis: puck.positionY - plinkoPin.positionY};
      let distance = Math.sqrt(Math.pow(puck.positionX - plinkoPin.positionX, 2) + Math.pow(puck.positionY - plinkoPin.positionY, 2));
      
      let normalizedCollisionVector = {xAxis: collisionVector.xAxis / distance, yAxis: collisionVector.yAxis / distance};

      let relativeVectorVelocity = {xAxis: puck.velocityX - plinkoPin.velocityX, yAxis: puck.velocityY - plinkoPin.velocityY};
      let speed = relativeVectorVelocity.xAxis * normalizedCollisionVector.xAxis + relativeVectorVelocity.yAxis * normalizedCollisionVector.yAxis;

      console.log(`Calculation results:\n 
      Collision Vector: x: ${collisionVector.xAxis} y: ${collisionVector.yAxis}\n
      Distance: ${distance}\n
      Normalized Collision Vector: x: ${normalizedCollisionVector.xAxis} y: ${normalizedCollisionVector.yAxis}\n
      Relative Vector Velocity: x: ${relativeVectorVelocity.xAxis} y: ${relativeVectorVelocity.yAxis}\n
      Speed: ${speed}`);

      if (speed < 0) {
        break;
      }
      
      // let impulse = 2 * ;
      puck.velocityX -= (speed * normalizedCollisionVector.xAxis);
      puck.velocityY -= (speed * normalizedCollisionVector.yAxis);
      // plinkoPin.velocityX += (speed * normalizedCollisionVector.xAxis);
      // plinkoPin.velocityY += (speed * normalizedCollisionVector.yAxis);
    }    
    
  }
}

}

class GameAsset {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
  isColliding: boolean;
  
  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.isColliding = false; 
  }
}

class GamePlinkoPin extends GameAsset {
  radius: number;

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    super(positionX, positionY, velocityX, velocityY);
    this.radius = 5; 
    
  }

  GeneratePin() {
    const pin = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawCircle(this.positionX,this.positionY, this.radius)
      .endFill();

    container.addChild(pin);
    
  }
}

class GamePuck extends GameAsset{
  coinPuck = PIXI.Sprite.from("./assets/Coin Pack/Coin9.png");
  radius: number;
  
  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    super(positionX, positionY, velocityX, velocityY)
    this.radius = 10;
  }
  
  GeneratePuck() {
    // this.coinPuck.anchor.set(0.5);
    // this.coinPuck.width = 25;
    // this.coinPuck.height = 25;
    // this.coinPuck.x = this.positionX;
    // this.coinPuck.y = this.positionY;

    // container.addChild(this.coinPuck);

    const puck = new PIXI.Graphics()
      .beginFill(0xE33900 * Math.random() * 5)
      .drawCircle(this.positionX,this.positionY, this.radius)
      .endFill();

    container.addChild(puck);
  }

  UpdatePosition(secondsPassed: number) {
    const gravity = 9.81;

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    this.velocityY += gravity * secondsPassed;
  }

  // MovePosition() {
  //   this.coinPuck.x = this.positionX;
  //   this.coinPuck.y = this.positionY;
  // }

  ResetPostion() {
    this.positionX = 250;
    this.positionY = 100;
  }
}

const board = new GameBoard(500, 600);
board.SetUpGameBoard();

const startButtonSprite = CreateStartButton();

const asset = new GamePuck(250, 100, Math.random(), 1);
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
    
    // setInterval(() => { 
    //   GameLoop() 
    // }, 1000 / 30);

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

  console.log(secondsPassed);
  
  if (asset.positionY > 350) {
      container.removeChild(asset);
  }
  else{
    asset.UpdatePosition(secondsPassed);
  
    board.DetectCollisions(asset);
    console.log(asset);
    
    container.removeChild(asset);

    asset.GeneratePuck();
  }
  requestAnimationFrame((timeStamp) => GameLoop(timeStamp));
}

function CheckCircleIntersect(puckPositionX: number, puckPositionY: number, puckRadius: number, plinkoPegPositionX: number, plinkoPegPositionY: number, plinkoPegRadius: number) {
  let distanceBetweenCircles = Math.pow(puckPositionX - plinkoPegPositionX, 2) + Math.pow(puckPositionY - plinkoPegPositionY, 2);

  return distanceBetweenCircles <= Math.pow(puckRadius + plinkoPegRadius, 2);
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
