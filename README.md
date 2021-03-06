# j
Functional library for everything :)


## Examples

```js
const j = require('j');
const uncurryThis = Function.bind.bind(Function.call)

const reverse = str => str.split('').reverse().join('');
const lower = uncurryThis(String.prototype.toLowerCase);
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1); 
const getName = obj => obj.name;
```

### Pipes example

```js
//No pipes
console.log(capitalize(lower(reverse(getName({ name: 'Buckethead' })))));

//With pipes
j ({name: 'Buckethead'}) `|>` (getName, reverse, lower, capitalize, console.log);
```

### Pipes and promises

```js
//Promises 
user = Promise.resolve({name: 'Buckethead'});

//No pipes
user.then(() => console.log(capitalize(lower(reverse(getName({ name: 'Buckethead' }))))))
    .catch(console.error);

//With pipes


//or
user .then(j `|>.` (getName, reverse, lower, capitalize, console.log))
           .catch(console.error)
           
//or 
try {
  j (await user) `|>` (getName, reverse, lower, capitalize, console.log)
} catch (e) {
  console.error(e)
}

//or
j (user) `|>.` (getName, reverse, lower, capitalize, console.log) `|e` (console.error)
j (user) `|>.` (getName, reverse, lower, capitalize, console.log).catch(console.error)

j `${user}` `|>.` (getName, reverse, lower, capitalize, console.log).catch(console.error)

const logReverse = j `|>` (getName, reverse, lower, capitalize, console.log);
user
  .then(logReverse)
  .catch(console.error)
  
j (user) `.` (logReverse) `|e` (console.error)
j (user) `.` (logReverse).catch(console.error)
j (user) `.` (logReverse) `|e` (console.error)
logReverse( j (user) `|e` (console.error))

j `${user} |> ${getName, reverse}`
```

### Jay operators

#### `|>` Pipeline
  Usage
  ```js
  j (value) `|>` (functionA, functionB, ...)()

### `.` Chain
  Usage
  ```js
  j `.` (functionA).catch(functionErrorHandling)
