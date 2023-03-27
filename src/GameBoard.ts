import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameBucketSlot } from "./GameBucketSlot.js";
import { gameBoardMap, container} from "./app.js";
import { GamePuck } from "./GamePuck.js";
import { GamePlinkoPin } from "./GamePlinkoPin.js";
import { GameScoreSystem } from "./ScoreSystem.js";

export class GameBoard {
  _width: number;
  _height: number;
  plinkoPins: GamePlinkoPin[];
  buckets: GameBucketSlot[];
  scoreState: GameScoreSystem;
  testX = 0;
  testY = 0;

  constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.plinkoPins = [];
    this.buckets = []
    this.scoreState = new GameScoreSystem(10, 0);
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
            this.plinkoPins.push(plinkoPin);
            plinkoPin.GeneratePin();
            break;

          case "_":
            const bucket = new GameBucketSlot(50 * columnIndex, 100 + 50 * rowIndex);
            bucket.GenerateBucket(columnIndex);

            this.buckets.push(bucket);
            break;

          default:
            break;
        }
      });
    });
    
  }

  DetectCircleOnCirclceCollisions(puck: GamePuck) {
    puck.isColliding = false;
    this.plinkoPins.forEach((element) => element.isColliding = false);

    for (let index = 0; index < this.plinkoPins.length; index++) {
      let plinkoPin = this.plinkoPins[index];

      if (this.CheckCircleIntersect(puck.positionX, puck.positionY, puck.radius, plinkoPin.positionX, plinkoPin.positionY, plinkoPin.radius)) {
        puck.isColliding = true;
        plinkoPin.isColliding = true;

        let collisionVector = { xAxis: plinkoPin.positionX - puck.positionX, yAxis: plinkoPin.positionY - puck.positionY };
        let distance = Math.sqrt(Math.pow(plinkoPin.positionX - puck.positionX, 2) + Math.pow(plinkoPin.positionY - puck.positionY, 2));

        let normalizedCollisionVector = { xAxis: collisionVector.xAxis / distance, yAxis: collisionVector.yAxis / distance };

        let relativeVectorVelocity = { xAxis: puck.velocityX - plinkoPin.velocityX, yAxis: puck.velocityY - plinkoPin.velocityY };
        let speed = relativeVectorVelocity.xAxis * normalizedCollisionVector.xAxis + relativeVectorVelocity.yAxis * normalizedCollisionVector.yAxis;

        // speed *= plinkoPin.restitution;
        
        if (speed < 0) {
          break;
        }
        
        let impulse = 2 * speed / (puck.mass + plinkoPin.mass);
        puck.velocityX -= (impulse * plinkoPin.mass * normalizedCollisionVector.xAxis);
        puck.velocityY -= (impulse * plinkoPin.mass * normalizedCollisionVector.yAxis);
      }
    }
  }
  
  DetectCircleOnSquareCollisions(puck: GamePuck){
    puck.isColliding = false;
    this.buckets.forEach((element) => element.isColliding = false);

    for (let index = 0; index < this.buckets.length; index++) {
      let bucket = this.buckets[index];
      
      if (this.CheckCircleRectIntersect(puck.positionX, puck.positionY, puck.radius, bucket.positionX, bucket.positionY, bucket.bucketWidth, bucket.bucketHeight)) {
        puck.isColliding = true;
        bucket.isColliding = true;
      }

      if (puck.isColliding && bucket.isColliding) {
        let currentScore = this.scoreState.GetCurrentScore()
        this.scoreState.UpdateScore(currentScore, index + 1);
        // console.log(`You just scored: ${this.scoreState._totalPlayerScore} points`);
        document.getElementById("player-score")!.innerHTML = `Score : ${this.scoreState.GetCurrentScore()}`;
        break;
      }
    }
  }

  CheckCircleIntersect(puckPositionX: number, puckPositionY: number, puckRadius: number, plinkoPegPositionX: number, plinkoPegPositionY: number, plinkoPegRadius: number) {
    let distanceBetweenCircles = Math.sqrt(Math.pow(puckPositionX - plinkoPegPositionX, 2) + Math.pow(puckPositionY - plinkoPegPositionY, 2));
    
    return distanceBetweenCircles <= puckRadius + plinkoPegRadius;
  }

  CheckCircleRectIntersect(puckPositionX: number, puckPositionY: number, puckRadius: number, bucketPositionX: number, bucketPositionY: number, bucketWidth: number, bucketHeight: number) {
    if (puckPositionX < bucketPositionX) {
      this.testX = bucketPositionX;
    }
    else if(puckPositionX > bucketPositionX + bucketHeight){
      this.testX = bucketPositionX + bucketHeight;
    }

    if (puckPositionY < bucketPositionY) {
      this.testY = bucketPositionY;
    }
    else if(puckPositionY > bucketPositionY + bucketHeight){
      this.testY = bucketPositionY + bucketHeight;
    }

    let distanceXAxis = puckPositionX - this.testX;
    let distanceYAxis = puckPositionY - this.testY;

    let distanceBetweenPuckAndBucket = Math.sqrt(Math.pow(distanceXAxis, 2) + Math.pow(distanceYAxis, 2));

    return distanceBetweenPuckAndBucket <= puckRadius;
  }
}