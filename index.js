const prompt = require('prompt-sync')();

const simulationParams = {
  roomLength: 0,
  roomWidth: 0,
  carPosition: {
    length: 0,
    width: 0
  },
  carDirection: 'n',
  actions: [],

  get getSimulationValues() {
    return this
  },

  get getRoom() {
    return {
      length: this.roomLength,
      width: this.roomWidth
    }
  },

  get getCarPosition() {
    return {
      length: this.carPosition.length,
      width: this.carPosition.width
    }
  },

  get getCarDirection() {
    return this.carDirection
  },

  get getActions() {
    return this.actions
  },

  set setRoom({axis, value}) {
    this[`room${axis}`] = value
  },

  set setCarPosition({axis, value}) {
    this.carPosition[axis] = value
  },

  set setCarDirection(direction) {
    this.carDirection = direction
  },

  set setAction(action) {
    this.actions = [...this.actions, action]
  }
}

const simulationHistory = []

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

console.log('Room size')
simulationParams.roomLength = parseInt(prompt('Enter the room length: '))
simulationParams.roomWidth = parseInt(prompt('Enter the room width: '))
console.log('+----------------------------------+')

console.log('Type the starting position')
simulationParams.setCarPosition = {axis: 'length', value: parseInt(prompt('Car position on the North axis of room length: '))}
simulationParams.setCarPosition = {axis: 'width', value: parseInt(prompt('Car position on the East axis of room width: '))}
console.log('+----------------------------------+')

console.log('Instructions')
let showActionsPrompt = true
while (showActionsPrompt) {
  const actionsInput = prompt('Add an instruction or safe by entering S: ')
  if (/s/i.test(actionsInput)) {
    showActionsPrompt = false
  } else if (/[f,b,r,l]/i.test(actionsInput)) {
    simulationParams.setAction = actionsInput
    console.log('Setting action ', actionsInput, simulationParams.getActions)
  } else {
    console.log('Please type valid answers such as: ')
  }
}
console.log('+----------------------------------+')

const compass = {
  n: {
    f: '+1',
    b: '-1',
    axis: 'length'
  },
  e: {
    f: '+1',
    b: '-1',
    axis: 'width'
  },
  s: {
    f: '-1',
    b: '+1',
    axis: 'length'
  },
  w: {
    f: '-1',
    b: '+1',
    axis: 'width'
  }
}

const hasCrashed = (carPosition, room) => {
  let crash = false
  Object.keys(room).forEach((axis) => {
    if (carPosition[axis] < 1 || carPosition[axis] > room[axis]) {
      crash = true
    }
  })
  return crash
}

const drive = (action) => {
  const variables = compass[simulationParams.getCarDirection]
  if (['f', 'b'].includes(action)) {
    const currentPos = simulationParams.getCarPosition
    const newPos = eval(currentPos[variables.axis] + variables[action])

    simulationParams.setCarPosition = { 
      axis: variables.axis,
      value: newPos
    }

  } else if (['r', 'l'].includes(action)) {
    switch(action) {
      case 'r':
        switch(simulationParams.getCarDirection) {
          case 'n':
            simulationParams.setCarDirection = 'e'
            break
          case 'e':
            simulationParams.setCarDirection = 's'
            break
          case 's': 
            simulationParams.setCarDirection = 'w'
            break
          case 'w': 
            simulationParams.setCarDirection = 'n'
            break
        }
        break
      case 'l':
        switch(simulationParams.getCarDirection) {
          case 'n':
            simulationParams.setCarDirection = 'w'
            break
          case 'w':
            simulationParams.setCarDirection = 's'
            break
          case 's':
            simulationParams.setCarDirection = 'e'
            break
          case 'e':
            simulationParams.setCarDirection = 'n'
            break
        }
        break
    }
  }
}

for (i in simulationParams.getActions) {
  drive(simulationParams.getActions[i])
  simulationHistory.push({
    action: simulationParams.getActions[i],
    direction: simulationParams.getCarDirection,
    newPosition: simulationParams.getCarPosition,
    direction: simulationParams.getCarDirection
  })
  if (hasCrashed(simulationParams.getCarPosition, simulationParams.getRoom)) {
    simulationHistory.push('crash')
    break
  }
}

console.log(simulationHistory)
console.log('+----------------------------------+')
if (simulationHistory.includes('crash')) {
  console.log('You hit a wall! Simulation failed... 😢')
} else {
  console.log('Simulation succeeded! 😃')
}