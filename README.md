# j
Functional library for everything :)

```js
const j = require('j');
const uncarryThis = f => (...args) => f.apply(args);

const reverse = str => str.split().reverse().join('');
const lower = uncarryThis(String.prototype.toLowerCase);
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1); 
const getName = obj => obj.name;


//No pipes
console.log(capitalize(lower(reverse(getName({ name: 'Buckethead' })))));

//With pipes
j ({name: 'Buckethead}) `|>` (getName, reverse, lower, capitalize, console.log);

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
j (user) `|>.` (getName, reverse, lower, capitalize, console.log) `||` (console.error)
j (user) `|>.` (getName, reverse, lower, capitalize, console.log).catch(console.error)

j `Buckhead` `|>` (reverse, lower, capitalize, console.log)
j `${user}` `|>.` (getName, reverse, lower, capitalize, console.log)

const logReverse = j `|>` (getName, reverse, lower, capitalize, console.log);
user
  .then(logReverse)
  .catch(console.error)
  
j (user) `|>.` (logReverse) `||` (console.error)
j (user) `|>.` (logReverse)
  .catch(console.error)


