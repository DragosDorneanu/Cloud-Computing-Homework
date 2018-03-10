const http = require('http');
const uuid = require('uuid/v4');

const httpUtils = require('./httpUtils');
const TodosRequestHandler = require('./TodosRequestHandler');

let todos = require('./todos');

const serverIp = process.argv[2] || '127.0.0.1';
const serverPort = process.argv[3] || 8080;

const todosRequestHandler = new TodosRequestHandler('./todos.js');


function getTodos(request, response, todos) {
    response.end(JSON.stringify(todos, undefined, 2));
}

function createTodo(request, response, todos) {
    function successfulGotBody(newTodo) {
        if (!newTodo['text'] || typeof(newTodo['completed']) === 'undefined') {
            httpUtils.sendCustomResponse(response, 400, 'A todo should have "text" and "completed" properties.');
            return;
        }
        const todoId = uuid();
        todos[todoId] = newTodo;
        httpUtils.sendCustomResponse(response, 201, undefined, todoId);
    }

    function failedToGetBody(error) {
        console.error(error);
        httpUtils.sendCustomResponse(response, 500);
    }

    if (request.headers['content-type'] !== 'application/json') {
        httpUtils.sendCustomResponse(response, 400);
        return;
    }
    httpUtils
        .getHttpBody(request)
        .then(successfulGotBody)
        .catch(failedToGetBody);
}

function deleteTodos(request, response) {
    todos = {};
    response.end();
}

function replaceTodos(request, response, todos) {
    function successfulReceivedNewTodos(newTodos) {
        if (!(newTodos instanceof Array)) {
            httpUtils.sendCustomResponse(response, 400, 'You must send a JSON Array.');
            return;
        }

        let todo, todoId;
        for (let todoId in todos) {
            if (todos.hasOwnProperty(todoId)) {
                delete todos[todoId];
            }
        }
        for (let index = 0; index < newTodos.length; ++index) {
            todo = newTodos[index];
            if ((todo instanceof Object)) {
                if (todo['text'] && todo['completed']) {
                    todoId = uuid();
                    todos[todoId] = todo;
                }
            }
        }
        response.end();
    }

    function failedReceivingNewTodos(error) {
        console.error(error);
        httpUtils.sendCustomResponse(response, 500);
    }

    if (request.headers['content-type'] !== 'application/json') {
        httpUtils.sendCustomResponse(response, 400);
        return;
    }
    httpUtils
        .getHttpBody(request)
        .then(successfulReceivedNewTodos)
        .catch(failedReceivingNewTodos);
}

todosRequestHandler.addRequestHandler('/todos', 'GET', (request, response) => {
    getTodos(request, response, todos);
});

todosRequestHandler.addRequestHandler('/todos', 'POST', (request, response) => {
    createTodo(request, response, todos);
});

todosRequestHandler.addRequestHandler('/todos', 'PUT', (request, response) => {
    replaceTodos(request, response, todos);
});

todosRequestHandler.addRequestHandler('/todos', 'DELETE', deleteTodos);


const server = http.createServer(todosRequestHandler.handleRequest);

server.listen(serverPort, serverIp);
