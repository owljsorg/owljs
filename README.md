# owl.js

**Backbone-like frontend library**

[![Build Status](https://travis-ci.org/owljsorg/owljs.svg?branch=master)](https://travis-ci.org/owljsorg/owljs)
[![Coverage Status](https://coveralls.io/repos/github/owljsorg/owljs/badge.svg?branch=master)](https://coveralls.io/github/owljsorg/owljs?branch=master)
[![Stories in Ready](https://badge.waffle.io/owljsorg/owljs.png?label=ready&title=Ready)](http://waffle.io/owljsorg/owljs)

**Ask a question in [gitter](https://gitter.im/owljsorg/owl.js).**

## Install

**Bower**

    bower install owl.js

**npm**

    npm install owl.js

## Features

**Languages:** ES5, ES6, TypeScript.

**Modules:** CommonJS, amd.

**Libraries:** React.

## Examples

To start examples server

    cd examples
    npm start

## Concept

owl.js is simple library similar to backbone.js, without dependency on underscore.js and jQuery.
If you know backbone.js you mostly know owl.js.

The library uses [MVC](https://en.wikipedia.org/wiki/Model-view-controller) as main pattern.
**owl.Model** is responsible for representing data from server based on [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) architecture.

**owl.View** is responsible for rendering view it can use any template engine to do it or generate DOM manually. You can use **React** or any other UI library insted of **owl.View**.

**owl.Controller** is responsible for business logic.

Also there is few classes out of the main pattern.

**owl.Router** is created to manage pages based on URL.
It contains records named routes.
Each route contains path and a controller that will be called for specified path.

**owl.Collection** is an array of **owl.Models** it is created to represent model sets.

## Development

**Run unit tests**

    karma start

or

    npm test
