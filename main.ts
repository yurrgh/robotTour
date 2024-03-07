// Define a function to get the current time
function getCurrentTime(): number {
    // Assuming input.runningTime() returns the time since power on in milliseconds
    return input.runningTime();
}

// Function to drive the robot forward for a specified duration
function driveForward(duration: number): void {
    let startTime = getCurrentTime(); // Get the start time
    let currentTime = startTime; // Initialize current time with start time

    while (currentTime - startTime <= duration) {
        motion.driveStraight(100); // Adjust power as needed
        pause(100); // Add a small delay
        currentTime = getCurrentTime(); // Update current time
    }
    motion.stop(); // Stop the robot after driving forward
}

// Function to turn the robot left
function turnLeft(): void {
    motion.turnLeft(15);
    pause(turnLeftTime); // Assuming a 90-degree turn takes 1 second
    motion.stop(); // Stop the robot after turning left
}

function turnRight() : void {
    motion.turnRight(15);
    pause(turnLeftTime);
    motion.stop();
}

// Define GridPosition type
type GridPosition = [number, number];

// Function to navigate the robot through a series of grid positions
function navigatePath(path: GridPosition[], fullSquareTime: number, halfSquareTime: number): void {
    for (let i = 0; i < path.length; i++) {
        let currentPos: GridPosition = path[i];
        let nextPos: GridPosition | undefined = path[i + 1];

        // Drive forward to the next position
        if (nextPos[0] == currentPos[0]) {
            if(currentPos[1] > nextPos[1]){
                turnLeft();
                driveForward(halfSquareTime+fullSquareTime);
                turnRight;
            }else{
                turnRight;
                driveForward(halfSquareTime + fullSquareTime);
                turnLeft;
            }
        }
        else{
            driveForward(fullSquareTime);
        }   
    }
}


let path: GridPosition[] = [
    [3,0],[3,1]
];//Tell it which grid positions to go through
// [0,0] [0,1] [0,2] [0,3]
// [1,0] [1,1] [1,2] [1,3]
// [2,0] [2,1] [2,2] [2,3]
// [3,0] [3,1] [3,2] [3,3] 
//start pose will always be a bottom one
//depending on which way you face your robot
//Starting grid will always be 
let fullSquareTime = 1000; // Time in milliseconds for a full square
let halfSquareTime = 500; // Time in milliseconds for a half square
let turnLeftTime = 1000;

navigatePath(path, fullSquareTime, halfSquareTime);