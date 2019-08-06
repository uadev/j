class WithoutTemplateVars {}

const pipe = (...functions) => (value) => {
  return functions.reduce((currentValue, currentFunction) => {
    console.log('Current', currentFunction)

    return currentFunction(currentValue)
  }, value)
}

function isFunction (fn) {
  return fn instanceof Function
}

const OPERATORS = {
  '|>': function (args, ...functions) {
    console.debug(`Operator |> called with args: ${functions} and values ${args}`)
    return bindArgs(pipe(...functions.filter(isFunction)), args)()
  }
}

function bindArgs (fn, ...boundArgs) {
  return function (...args) {
    return fn.apply(this, boundArgs.concat(args))
  }
}

function j (args, withVars = WithoutTemplateVars, ...vars) {
  if (args.raw) {
    console.debug('Template!')
  }

  if (withVars === WithoutTemplateVars) {
    console.debug('WithoutTemplateVars!')
  } else {
    console.debug(`TemplateVars are ${vars.concat(withVars)}`)
  }

  return bindArgs(function jWaitOperator (args, operator, ...$vars) {
    console.log(`Args: ${args}, operators: ${operator}, template vars: ${$vars}`)
    return bindArgs(OPERATORS[operator], args, $vars)
  }, args)
}

module.exports = j
