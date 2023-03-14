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

function GetRandomPath(bucketPaths) {
    let randomNumber = Math.floor(Math.random() * 4);

    const numberOfPaths = bucketPaths.length;
    return (numberOfPaths == 1) ? bucketPaths[0] : bucketPaths[randomNumber]
}

// function GetRandomNumberInRange(minNumber, maxNumber) {
//     return Math.floor(math.Random() * (max - min + 1) + min)
// }