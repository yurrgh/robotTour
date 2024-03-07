// Function to turn the robot left
function turnLeft () {
    motion.turnLeft(15)
    // Assuming a 90-degree turn takes 1 second
    pause(turnLeftTime);
// Stop the robot after turning left
    motion.stop()
}
// Function to navigate the robot through a series of grid positions
function navigatePath (path: number[][], fullSquareTime: number, halfSquareTime: number, turnLeftTime: number) {
    for (let i = 0; i <= path.length - 1; i++) {
        currentPos = path[i]
        nextPos = path[i + 1]
        // Drive forward to the next position
        if (nextPos && nextPos[0] == currentPos[0]) {
            if (currentPos[1] > nextPos[1]) {
                turnLeft()
                driveForward(halfSquareTime + fullSquareTime)
                turnRight()
            } else {
                turnRight()
                driveForward(halfSquareTime + fullSquareTime)
                turnLeft()
            }
        } else {
            driveForward(fullSquareTime)
        }
    }
}
// Define a function to get the current time
function getCurrentTime () {
    // Assuming input.runningTime() returns the time since power on in milliseconds
    return input.runningTime()
}
function turnRight () {
    motion.turnRight(15)
    pause(turnLeftTime);
motion.stop()
}
// Function to drive the robot forward for a specified duration
function driveForward (duration: number) {
    // Get the start time
    startTime = getCurrentTime()
    // Initialize current time with start time
    currentTime = startTime
    while (currentTime - startTime <= duration) {
        // Adjust power as needed
        motion.driveStraight(100)
        // Add a small delay
        pause(100);
// Update current time
        currentTime = getCurrentTime()
    }
    // Stop the robot after driving forward
    motion.stop()
}
let currentTime = 0
let startTime = 0
let nextPos: number[] = []
let currentPos: number[] = []
type GridPosition = [number, number];
// Define the path
let path = [[3, 0], [3, 1]]
// Tell it which grid positions to go through
// [0,0] [0,1] [0,2] [0,3]
// [1,0] [1,1] [1,2] [1,3]
// [2,0] [2,1] [2,2] [2,3]
// [3,0] [3,1] [3,2] [3,3]
// start pose will always be a bottom one
// depending on which way you face your robot
// Starting grid will always be
// Time in milliseconds for a full square
let fullSquareTime = 1000
// Time in milliseconds for a half square
let halfSquareTime = 500
// Assuming a 90-degree turn takes 1 second
let turnLeftTime = 1000
// Call the function
navigatePath(path, fullSquareTime, halfSquareTime, turnLeftTime)
