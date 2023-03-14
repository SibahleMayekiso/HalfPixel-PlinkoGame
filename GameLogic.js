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

function ChooseBucket(bucketNumber, bucketsPaths) {
    switch (bucketNumber) {
        case 1:
            bucketsPaths.bucketOnePaths
            break;

        case 2:

            break;

        case 3:

            break;

        case 4:

            break;

        case 5:

            break;

    }
}

function GetRandomPath(bucketPaths) {
    const numberOfPaths = bucketPaths.length;

    let randomNumber = Math.floor(Math.random() * 4);

    if (numberOfPaths == 1) {
        return bucketPaths[0];
    }
    else {
        return bucketPaths[randomNumber]
    }
}

function GetRandomNumberInRange(minNumber, maxNumber) {
    return Math.floor(math.Random() * (max - min + 1) + min)
}