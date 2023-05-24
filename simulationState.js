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

const simulationHistory = {
  history: [],

  get getHistory() {
    return this.history
  },

  set setHistory(event) {
    this.history = [...this.history, event]
  }
}

module.exports = {
  simulationParams,
  simulationHistory
}