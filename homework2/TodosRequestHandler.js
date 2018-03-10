function TodosRequestHandler() {
    let requestHandlers = {};

    this.addRequestHandler = function addRequestHandlers(requestPath, requestMethod, requestHandler) {
        requestMethod = requestMethod.toUpperCase();
        if (!requestHandlers[requestPath]) {
            requestHandlers[requestPath] = {};
        }
        requestHandlers[requestPath][requestMethod] = requestHandler;
    };

    this.handleRequest = function handleRequest(request, response) {
        if (!requestHandlers[request.url] || !requestHandlers[request.url][request.method]) {
            response.statusCode = 404;
            response.end();
            return;
        }
        const requestHandler = requestHandlers[request.url][request.method];
        requestHandler(request, response);
    }
}

module.exports = TodosRequestHandler;
