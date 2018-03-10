const http = require('http');
const uuid = require('uuid/v4');
const TodosRequestHandler = require('./TodosRequestHandler');

let todos = require('./todos');

const serverIp = process.argv[2] || '127.0.0.1';
const serverPort = process.argv[3] || 8080;

const todosRequestHandler = new TodosRequestHandler('./todos.js');


function getTodos(request, response, todos) {
    response.end(JSON.stringify(todos, undefined, 2));
}

function createTodo(request, response, todos) {
    if (request.headers['content-type'] !== 'application/json') {
        response.statusCode = 400;
        response.end();
        return;
    }

    let requestContent = '';
    request.on('data', (data) => {
        requestContent += data;
    });

    request.on('end', () => {
        const todo = JSON.parse(requestContent);
        const todoId = uuid();
        todos[todoId] = todo;
        response.statusCode = 201;
        response.end(todoId);
    });

    request.on('error', () => {
        response.statusCode = 500;
        response.end();
    });
}

todosRequestHandler.addRequestHandler('/todos', 'GET', (request, response) => {
    getTodos(request, response, todos);
});

todosRequestHandler.addRequestHandler('/todos', 'POST', (request, response) => {
    createTodo(request, response, todos);
});


const server = http.createServer(todosRequestHandler.handleRequest);

server.listen(serverPort, serverIp);
