# FLUXX
[![Build Status](http://img.shields.io/travis/mohayonao/fluxx.svg?style=flat-square)](https://travis-ci.org/mohayonao/fluxx)
[![NPM Version](http://img.shields.io/npm/v/@mohayonao/fluxx.svg?style=flat-square)](https://www.npmjs.org/package/@mohayonao/fluxx)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> simple implementation of Flux architecture

## Installation

```
npm install @mohayonao/fluxx
```

## API
### Router
- `constructor()`

#### Instance attributes
- `actions: Action[]`
- `stores: Store[]`

#### Instance methods
- `getStateFromStores(): object`
- `createAction(address: string, data: any): void`
- `addChangeListener(listener: function): void`
- `removeChangeListener(listener: function): void`

### Action
- `constructor(router: Router)`

#### Instance attributes
- `router: Router`

#### Instance methods
- `doneAction(address: string, data: any): void`

### Store
- `constructor(router: Router)`

#### Instance attributes
- `router: Router`
- `data: object`
- `name: string`

#### Instance methods
- `getInitialState(): object`
- `getState(): object`
- `emitChange(): void`

## LICENSE
MIT
