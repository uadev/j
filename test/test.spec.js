const j = require('../src/index')
const sinon = require('sinon')

// const uncurryThis = f => (...args) => f.apply(args)
const uncurryThis = Function.bind.bind(Function.call)
const reverse = str => str.split('').reverse().join('')
const lower = uncurryThis(String.prototype.toLowerCase)
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
const getName = obj => obj.name

const log = sinon.spy()

describe('Should getName->reverse->lower->capitalize->log', () => {
  log(capitalize(lower(reverse(getName({ name: 'Buckethead' })))))

  j({ name: 'Buckethead' })`|>`(getName, reverse, lower, capitalize, log)

  it('Pipe should return the same result', () => {
    sinon.assert.calledTwice(log)
    sinon.assert.alwaysCalledWith(log, 'Daehtekcub')
  })
})
