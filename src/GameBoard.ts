import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameBucketSlot } from "./GameBucketSlot.js";
import { gameBoardMap, container, CheckCircleIntersect } from "./app.js";
import { GamePuck } from "./GamePuck.js";
import { GamePlinkoPin } from "./GamePlinkoPin.js";

export class GameBoard {
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

        let collisionVector = { xAxis: plinkoPin.positionX - puck.positionX, yAxis: plinkoPin.positionY - puck.positionY };
        let distance = Math.sqrt(Math.pow(puck.positionX - plinkoPin.positionX, 2) + Math.pow(puck.positionY - plinkoPin.positionY, 2));

        let normalizedCollisionVector = { xAxis: collisionVector.xAxis / distance, yAxis: collisionVector.yAxis / distance };

        let relativeVectorVelocity = { xAxis: puck.velocityX - plinkoPin.velocityX, yAxis: puck.velocityY - plinkoPin.velocityY };
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

        puck.velocityX -= (speed * normalizedCollisionVector.xAxis);
        puck.velocityY -= (speed * normalizedCollisionVector.yAxis);
        // plinkoPin.velocityX += (speed * normalizedCollisionVector.xAxis);
        // plinkoPin.velocityY += (speed * normalizedCollisionVector.yAxis);
      }

    }
  }
}
