const { simulationHistory } = require('./simulationState')
const { simulator } = require('./simulator')

simulator()

console.log(simulationHistory.getHistory)
console.log('+----------------------------------+')
if (simulationHistory.getHistory.includes('crash')) {
  console.log('You hit a wall! Simulation failed... 😢')
} else {
  console.log('Simulation succeeded! 😃')
}