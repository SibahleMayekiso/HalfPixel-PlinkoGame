import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameBucketSlot } from "./GameBucketSlot.js";
import { gameBoardMap, container } from "./app.js";
import { GamePlinkoPin } from "./GamePlinkoPin.js";
export class GameBoard {
    constructor(width, height) {
        this._width = width;
        this._height = height;
        this.plinkoPins = [];
        this.buckets = [];
    }
    SetUpGameBoard() {
        const boardMidpointXaxis = this._width / 2;
        gameBoardMap.forEach((row, rowIndex) => {
            row.forEach((column, columnIndex) => {
                switch (column) {
                    case "0":
                        const hole = new PIXI.Graphics()
                            .beginFill(0xdddddd)
                            .drawCircle(boardMidpointXaxis + 50 * rowIndex, this._height / 6, 15)
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
                        this.buckets.push(bucket);
                        break;
                    default:
                        break;
                }
            });
        });
        console.log(this.buckets);
    }
    DetectCircleOnCirclceCollisions(puck) {
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
                // console.log(`Calculation results:\n 
                // Collision Vector: x: ${collisionVector.xAxis} y: ${collisionVector.yAxis}\n
                // Distance: ${distance}\n
                // Normalized Collision Vector: x: ${normalizedCollisionVector.xAxis} y: ${normalizedCollisionVector.yAxis}\n
                // Relative Vector Velocity: x: ${relativeVectorVelocity.xAxis} y: ${relativeVectorVelocity.yAxis}\n
                // Speed: ${speed}`);
                if (speed < 0) {
                    break;
                }
                puck.velocityX -= (speed * normalizedCollisionVector.xAxis);
                puck.velocityY -= (speed * normalizedCollisionVector.yAxis);
            }
        }
    }
    DetectCircleOnSquareCollisions(puck) {
        puck.isColliding = false;
        this.buckets.forEach((element) => element.isColliding = false);
        for (let index = 0; index < this.buckets.length; index++) {
            let bucket = this.buckets[index];
            if (CheckCircleRectIntersect(puck.positionX, puck.positionY, puck.radius, bucket.positionX, bucket.positionY, bucket.bucketWidth, bucket.bucketHeight)) {
                puck.isColliding = false;
                bucket.isColliding = false;
                let collisionVector = { xAxis: bucket.positionX - puck.positionX, yAxis: bucket.positionY - puck.positionY };
                let distance = Math.sqrt(Math.pow(puck.positionX - bucket.positionX, 2) + Math.pow(puck.positionY - bucket.positionY, 2));
                let normalizedCollisionVector = { xAxis: collisionVector.xAxis / distance, yAxis: collisionVector.yAxis / distance };
                let relativeVectorVelocity = { xAxis: puck.velocityX, yAxis: puck.velocityY };
                let speed = relativeVectorVelocity.xAxis * normalizedCollisionVector.xAxis + relativeVectorVelocity.yAxis * normalizedCollisionVector.yAxis;
                // console.log(`Calculation results:\n 
                // Collision Vector: x: ${collisionVector.xAxis} y: ${collisionVector.yAxis}\n
                // Distance: ${distance}\n
                // Normalized Collision Vector: x: ${normalizedCollisionVector.xAxis} y: ${normalizedCollisionVector.yAxis}\n
                // Relative Vector Velocity: x: ${relativeVectorVelocity.xAxis} y: ${relativeVectorVelocity.yAxis}\n
                // Speed: ${speed}`);
                console.log(`You just scored: ${bucket.bucketPoints} points`);
                if (speed < 0) {
                    break;
                }
                puck.velocityX -= (speed * normalizedCollisionVector.xAxis);
                puck.velocityY -= (speed * normalizedCollisionVector.yAxis);
            }
        }
    }
}
let testX = 0;
let testY = 0;
function CheckCircleIntersect(puckPositionX, puckPositionY, puckRadius, plinkoPegPositionX, plinkoPegPositionY, plinkoPegRadius) {
    let distanceBetweenCircles = Math.sqrt(Math.pow(puckPositionX - plinkoPegPositionX, 2) + Math.pow(puckPositionY - plinkoPegPositionY, 2));
    return distanceBetweenCircles <= puckRadius + plinkoPegRadius;
}
function CheckCircleRectIntersect(puckPositionX, puckPositionY, puckRadius, bucketPositionX, bucketPositionY, bucketWidth, bucketHeight) {
    if (puckPositionX < bucketPositionX) {
        testX = bucketPositionX;
    }
    else if (puckPositionX > bucketPositionX + bucketHeight) {
        testX = bucketPositionX + bucketHeight;
    }
    if (puckPositionY < bucketPositionY) {
        testY = bucketPositionY;
    }
    else if (puckPositionY > bucketPositionY + bucketHeight) {
        testY = bucketPositionY + bucketHeight;
    }
    let distanceXAxis = puckPositionX - testX;
    let distanceYAxis = puckPositionY - testY;
    let distanceBetweenPuckAndBucket = Math.sqrt(Math.pow(distanceXAxis, 2) + Math.pow(distanceYAxis, 2));
    return distanceBetweenPuckAndBucket <= puckRadius;
}
