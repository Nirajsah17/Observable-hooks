# Observable Hooks

[![SLSA 3](https://img.shields.io/badge/Observable-hooks-blue)](https://slsa.dev)
[![SLSA 3](https://img.shields.io/badge/node-v20-red)](https://slsa.dev)
[![SLSA 3](https://img.shields.io/badge/npm-10.2.4-green)](https://slsa.dev)

**Observable Module**
This is a lightweight and reusable Observable module inspired by React hooks. It provides a simple way to observe changes to an object's properties and subscribe to those changes using callback functions.

**Installations**

To use this module, simply import the `useObservable` function from the `observable-hooks` file:

```javascript
import useObservable from "observable-hooks";
```

**Usage**

1. Create an observable object:

```javascript
const person = { name: "John", age: 30 };
const observable = useObservable(person);
```

2. Subscribe to changes:

```javascript
const unsubscribe = observable.subscribe((prop, value) => {
  console.log(`${prop} changed to ${value}`);
});
```

3. Update properties:

```javascript
observable.set("age", 31); // Output: "age changed to 31"
observable.set("name", "Jane"); // Output: "name changed to Jane"
```

4. Unsubscribe from changes (optional):

```javascript
unsubscribe();
```

**API**
`useObservable(obj)`

`obj (Object)`: The object to be observed.
Returns an object with the following methods:

`subscribe(callback)`

`callback (Function)`: The function to be called when a property changes. It receives two arguments: prop (the property name) and value (the new value).

`unsubscribe(callback)`

`callback (Function)`: The function to be unsubscribed from property changes.

`set(prop, value)`

`prop (string)`: The property name to update.
`value (any)`: The new value for the property.

`get(prop)`

`prop (string)`: The property name to retrieve.
Returns the current value of the property.

## Simple Object and array Observable


```javascript
import useObservable from "observable-hooks";

const person = { name: "John", age: 30 };
const observable = useObservable(person);

const unsubscribe = observable.subscribe((prop, value) => {
  console.log(`${prop} changed to ${value}`);
});

observable.set("age", 31); // Output: "age changed to 31"
observable.set("name", "Jane"); // Output: "name changed to Jane"

unsubscribe();

observable.set("age", 32); // No output
```

## Nested Object and array Observable

```javascript
import useObservable from "observable-hooks";

const person = { name: "John", age: 30, address: { city: "New York" } };
const observable = useObservable(person);

const unsubscribe = observable.subscribe((path, value) => {
  console.log(`${path} changed to ${value}`);
});

observable.set("age", 31); // Output: "age changed to 31"
observable.set("address.city", "San Francisco"); // Output: "address.city changed to San Francisco"
observable.set(["address", "zipCode"], "94101"); // Output: "address.zipCode changed to 94101"

unsubscribe();
```

