const bucketsPaths = {
  bucketOnePaths: [["L", "L", "L", "L"]],
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
  bucketFivePaths: [["R", "R", "R", "R"]],
};

function GetRandomPath(bucketPaths) {
  const numberOfPaths = bucketPaths.length;
  let randomNumber = Math.floor(Math.random() * numberOfPaths);

  console.log(`Path number: ${randomNumber}`);

  console.log(`Path: ${bucketPaths[randomNumber]}`);

  return numberOfPaths === 1 ? bucketPaths[0] : bucketPaths[randomNumber];
}

function GetBucketPath(bucketNumber, bucketsPaths) {
  switch (bucketNumber) {
    case 1:
      return GetRandomPath(bucketsPaths.bucketOnePaths);

    case 2:
      return GetRandomPath(bucketsPaths.bucketTwoPaths);

    case 3:
      return GetRandomPath(bucketsPaths.bucketThreePaths);

    case 4:
      return GetRandomPath(bucketsPaths.bucketFourPaths);

    case 5:
      return GetRandomPath(bucketsPaths.bucketFivePaths);
  }
}

function CalculatNavigationPath(bucketNumber) {
  let pathCoordinates = ["250;100"];
  let positionX = 250;
  let positionY = 100;

  const path = GetBucketPath(bucketNumber, bucketsPaths);

  for (const element of path) {
    element === "L" ? (positionX -= 50) : (positionX += 50);
    positionY += 50;

    pathCoordinates.push(`${positionX};${positionY}`);
  }

  pathCoordinates.push(`${positionX};${positionY + 75}`);

  return pathCoordinates;
}

export { CalculatNavigationPath };
