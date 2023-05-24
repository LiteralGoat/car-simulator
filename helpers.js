const hasCrashed = (carPosition, room) => {
  let crash = false
  Object.keys(room).forEach((axis) => {
    if (carPosition[axis] < 1 || carPosition[axis] > room[axis]) {
      crash = true
    }
  })
  return crash
}

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

module.exports = {
  hasCrashed,
  compass
}