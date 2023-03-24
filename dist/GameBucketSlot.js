import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { container } from "./app.js";
export class GameBucketSlot {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.bucketPoints = 0;
        this.bucketWidth = 75;
        this.bucketHeight = 50;
        this.isColliding = false;
    }
    GetBucketPoints() {
        console.log(`Bucket points: ${this.bucketPoints}`);
    }
    GenerateBucket(bucketIndex) {
        let absoulteNumber = Math.abs(bucketIndex - 5);
        switch (absoulteNumber) {
            case 4:
                this.bucketPoints = 10;
                const bucketTen = PIXI.Sprite.from("/assets/BucketAssets/10PointsBucketSlot.png");
                bucketTen.anchor.set(0.5);
                bucketTen.width = this.bucketWidth;
                bucketTen.height = this.bucketHeight;
                bucketTen.x = this.positionX;
                bucketTen.y = this.positionY;
                // this.buckets.push(bucketTen);
                container.addChild(bucketTen);
                break;
            case 2:
                this.bucketPoints = 5;
                const bucketFive = PIXI.Sprite.from("/assets/BucketAssets/5PointsBucketSlot.png");
                bucketFive.anchor.set(0.5);
                bucketFive.width = this.bucketWidth;
                bucketFive.height = this.bucketHeight;
                bucketFive.x = this.positionX;
                bucketFive.y = this.positionY;
                // this.buckets.push(bucketFive);
                container.addChild(bucketFive);
                break;
            case 0:
                this.bucketPoints = 2;
                const bucketTwo = PIXI.Sprite.from("/assets/BucketAssets/2PointsBucketSlot.png");
                bucketTwo.anchor.set(0.5);
                bucketTwo.width = this.bucketWidth;
                bucketTwo.height = this.bucketHeight;
                bucketTwo.x = this.positionX;
                bucketTwo.y = this.positionY;
                // this.buckets.push(bucketTwo);
                container.addChild(bucketTwo);
                break;
            default:
                break;
        }
    }
}
