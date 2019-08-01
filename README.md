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
j ({name: 'Buckethead}) `|>` (getName, reverse, lover, capitalize, console.log);
