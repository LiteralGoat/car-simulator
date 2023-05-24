const prompt = require('prompt-sync')();
const { simulationParams, simulationHistory } = require('./simulationState')
const { drive } = require('./drive')
const { hasCrashed } = require('./helpers')

const simulator = () => {
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

  for (i in simulationParams.getActions) {
    drive(simulationParams.getActions[i])
    simulationHistory.setHistory = {
      action: simulationParams.getActions[i],
      direction: simulationParams.getCarDirection,
      position: simulationParams.getCarPosition,
      direction: simulationParams.getCarDirection
    }
    if (hasCrashed(simulationParams.getCarPosition, simulationParams.getRoom)) {
      simulationHistory.setHistory = 'crash'
      break
    }
  }
}

module.exports = {
  simulator
}