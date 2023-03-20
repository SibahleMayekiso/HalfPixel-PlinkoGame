const bucketsWithPaths = {
  bucketOnePaths: [
    ["L", "L", "L", "L"]
  ],
  bucketTwoPaths: [
    ["L", "L", "L", "R"],
    ["L", "L", "R", "L"],
  ],
  bucketThreePaths: [
    ["L", "R", "L", "R"],
    ["L", "L", "R", "R"],
    ["L", "R", "R", "L"],
    ["R", "L", "R", "L"],
    ["R", "R", "L", "L"],
    ["R", "L", "L", "R"],
  ],
  bucketFourPaths: [
    ["R", "R", "R", "L"],
    ["R", "L", "R", "R"],
  ],
  bucketFivePaths: [
    ["R", "R", "R", "R"]
  ],
};

function GetRandomPath(paths: string[][]) {
  const numberOfPaths = Object.keys(paths).length;

  let randomNumber = Math.floor(Math.random() * numberOfPaths);

  return paths[randomNumber];
}

function PreDetermineBucketToLandIn(){
  let bucketWeights = [1, 2, 3];
  const leftRightProbalility = Math.random();

  const weigthProbabilties = bucketWeights.map(number => number * Math.random())

  let lowestWeight = Math.min(...weigthProbabilties);

  let weigthIndex = 0;

  for (let index = 0; index < weigthProbabilties.length; index++) {
      if (weigthProbabilties[index] === lowestWeight) {
        weigthIndex = index + 1;
      }
  }

  switch (weigthIndex) {
    case 2:
      return (leftRightProbalility < 0.5) ? 2 : 4;
      
    case 3:
      return (leftRightProbalility < 0.5) ? 1: 5;
      
    default:
      return 3;
  }



  // return randomBucketIndex;
}

function GetBucketPath(bucketNumber: number, bucketsWithPaths: {bucketOnePaths: string[][], bucketTwoPaths: string[][], bucketThreePaths: string[][], bucketFourPaths: string[][], bucketFivePaths: string[][]}) {
  switch (bucketNumber) {
    case 1:
      return GetRandomPath(bucketsWithPaths.bucketOnePaths);

    case 2:
      return GetRandomPath(bucketsWithPaths.bucketTwoPaths);

    case 3:
      return GetRandomPath(bucketsWithPaths.bucketThreePaths);

    case 4:
      return GetRandomPath(bucketsWithPaths.bucketFourPaths);

    case 5:
      return GetRandomPath(bucketsWithPaths.bucketFivePaths);
  }
}

function CalculateNavigationPath(bucketNumber: number) {
  let pathCoordinates = ["250;100"];
  let positionX = 250;
  let positionY = 100;

  const path = GetBucketPath(bucketNumber, bucketsWithPaths) as string[];

  for (const element of path) {
    element === "L" ? (positionX -= 50) : (positionX += 50);
    positionY += 50;

    pathCoordinates.push(`${positionX};${positionY}`);
  }

  pathCoordinates.push(`${positionX};${positionY + 75}`);

  return pathCoordinates;
}

export { CalculateNavigationPath, PreDetermineBucketToLandIn };
