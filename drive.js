const { simulationParams } = require('./simulationState')
const { compass } = require('./helpers')

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

module.exports = {
  drive
}