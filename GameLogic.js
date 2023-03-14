const bucketsPaths = {
    bucketOnePaths: [
        ['L', 'L', 'L', 'L']
    ],
    bucketTwoPaths: [
        ['L', 'L', 'L', 'R'],
        ['L', 'L', 'R', 'L']
    ],
    bucketThreePaths: [
        ['L', 'R', 'L', 'R'],
        ['L', 'L', 'R', 'R'],
        ['L', 'R', 'R', 'L'],
        ['R', 'L', 'R', 'L'],
        ['R', 'R', 'L', 'L'],
        ['R', 'L', 'L', 'R']
    ],
    bucketFourPaths: [
        ['R', 'R', 'R', 'L'],
        ['R', 'L', 'R', 'R']
    ],
    bucketFivePaths: [
        ['R', 'R', 'R', 'R']
    ]
}

function GetRandomPath(bucketPaths) {
    let randomNumber = Math.floor(Math.random() * 4);
    const numberOfPaths = bucketPaths.length;

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

function NavigateBucketPath(bucketNumber) {
    let pathCoordinates = [];
    let postionX = 250;
    let positionY = 100;

    const path = GetBucketPath(bucketNumber, bucketsPaths);

    for (let index = 0; index < path.length; index++) {
        path[index] === 'L' ? (postionX -= 50) : (postionX += 50);
        positionY += 50;

        pathCoordinates.push(`${postionX};${positionY}`);
    }

    return pathCoordinates;
}