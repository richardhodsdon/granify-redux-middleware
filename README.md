# Redux Middleware for Granify Installations

[![npm](https://img.shields.io/npm/v/granify-redux-middleware.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/granify-redux-middleware)
[![npm](https://img.shields.io/npm/dm/granify-redux-middleware.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/granify-redux-middleware)
[![Build Status](https://travis-ci.org/evgenyrodionov/redux-logger.svg?branch=master)](https://travis-ci.org/evgenyrodionov/granify-redux-middleware)

[![](https://i.imgur.com/U2TejxM.png)](https://granify.com?cid=github_redux)

Redux Middleware used to communicate the store to Granify Scripts

## Install

`npm i --save granify-redux-middleware`

or

`yarn add granify-redux-middleware`

## Usage

```javascript
import { applyMiddleware, createStore } from 'redux';
import granifyMiddleware from 'granify-redux-middleware';

const store = createStore(reducer, applyMiddleware(granifyMiddleware));

// Note passing middleware as the third argument requires redux@>=3.1.0
```
