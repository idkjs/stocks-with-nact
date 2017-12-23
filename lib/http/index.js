"use strict";

const bodyParser = require("body-parser");
const express = require("express");
const logger = require("../logger");
const makeTodoController = require("./todo");
const { errorHandler, wrapAsync } = require("./middleware");
const cors = require("cors");

const makeServer = (port, basePath, todoService) => {
    basePath = basePath || "/api";
    port = port || 3000;

    const app = express();
    app.use(cors());
    const router = express.Router();
    /** define todoocontroller as () that calls makeTodoController 
     * and passes in the todoservice, which was passed as prop to makeserver
     * when we started the app.
     */
    const todoController = makeTodoController(todoService);
    /**        
     * if (type === types.GET_TODOS) {
    dispatch(ctx.sender, {
        payload: Object.values(state.todos),
        type: types.SUCCESS,
    }, ctx.self);
        */
    router.get("/todos", wrapAsync(todoController.getAll));
    router.get("/todos/:id", wrapAsync(todoController.get));
    router.post("/todos", wrapAsync(todoController.post));
    router.put("/todos/:id", wrapAsync(todoController.put));
    router.delete("/todos/:id", wrapAsync(todoController.delete));
    app.use(bodyParser.json());
    app.use(basePath, router);
    app.use(errorHandler);

    return {
        start: () => {
            app.listen(port, () => {
                logger.info(`Listening on port http://localhost:${port}/api/todos`);
            });
        },
    };
};

module.exports = makeServer;
