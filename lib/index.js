"use strict";

const { start } = require("nact");
const server = require("./http");
const todo = require("./todo");

const system = start();
// define todoserver as function passing nact system module to todo, which requires
// it to start. This ends up being passed to the server in http/index in app() below
const todoService = todo(system);
// server is expecting are nact system we define above and pass it below as todoservice
const app = server(4000, "/api", todoService);
// console.log("LIB/INDEX");
app.start();
