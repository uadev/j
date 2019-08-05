const j = require('../src/index')
const sinon = require('sinon')

const uncarryThis = f => (...args) => f.apply(args)
const reverse = str => str.split('').reverse().join('')
const lower = uncarryThis(String.prototype.toLowerCase)
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
const getName = obj => obj.name

const log = sinon.spy()

describe('Should getName->reverse->lower->capitalize->log', () => {
  log(capitalize(lower(reverse(getName({ name: 'Buckethead' })))))

  it('should log Daehtekcub', function () {
    sinon.assert.calledWith(log, 'Daehtekcub')
  })

  log.resetHistory()

  j({ name: 'Buckethead' })`|>`(getName, reverse, lower, capitalize, log)

  it('should again log Daehtekcub', function () {
    sinon.assert.calledWith(log, 'Daehtekcub')
  })
})
