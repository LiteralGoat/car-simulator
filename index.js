const prompt = require('prompt-sync')();

console.log(`
This game is based on a 1x1 meter coordinate system.
-------------------------------------------------------
The car is as big as a whole block.
-------------------------------------------------------
If the car hits the walls L and W it crashes!
-------------------------------------------------------
Give your instructions and win by not crashing the car.

                     L
                     ^
                     |
                     +-----+-----+-----+-----+
                     |     |     |     |     |
                   2 |     |     |     |     |
                     |     |     |     |     |
                     +-----+-----+-----+-----+
                     |     |     |     |     |
                   1 |     |     |     |     |
                     |     |     |     |     |
default position ->  *-----+-----+-----+-----+->W
                        1     2     3     4
`)
console.log('+----------------------------------+')

let simulationParams = {
  roomLength: 0,
  roomWidth: 0,
  carPosition: {
    l: 0,
    w: 0
  },
  carDirection: 'N',
  actions: []
}

console.log('Room size')
simulationParams.roomLength = prompt('Enter the room length: ')
simulationParams.roomWidth = prompt('Enter the room width: ')
console.log('+----------------------------------+')

console.log('Type the starting position')
simulationParams.carPosition.l = prompt('Car position on the North axis of room length: ')
simulationParams.carPosition.w = prompt('Car position on the East axis of room width: ')
console.log('+----------------------------------+')

console.log('Instructions')
let showActionsPrompt = true
while (showActionsPrompt) {
  let actionsInput = prompt('Add an instruction or safe by entering S: ')
  if (/s/i.test(actionsInput)) {
    showActionsPrompt = false
  } else if (/[f,b,r,l]/i.test(actionsInput)) {
    simulationParams['actions'].push(actionsInput)
  } else {
    console.log('Please type valid answers such as: ')
  }
}
console.log('+----------------------------------+')
