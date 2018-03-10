function TodosRequestHandler() {
    let requestHandlers = {};
    let variablePathRequestHandlers = {};

    function getVariablePathMatch(requestPath, requestMethod) {
        let pathVariables, token, index;
        const requestPathTokens = requestPath.split('/');

        for (let variablePath in variablePathRequestHandlers) {
            const variablePathTokens = variablePath.split('/');
            if (variablePathTokens.length === requestPathTokens.length) {
                pathVariables = {};
                for (index = 0; index < requestPathTokens.length; ++index) {
                    token = variablePathTokens[index];
                    if (token[0] === ':') {
                        pathVariables[token.substr(1)] = requestPathTokens[index];
                    } else if (token !== variablePathTokens[index]) {
                        break;
                    }
                }

                if (index === requestPathTokens.length) {
                    return {
                        "requestHandler": variablePathRequestHandlers[variablePath][requestMethod],
                        "pathVariables": pathVariables
                    }
                }
            }
        }
        return undefined;
    }

    function addHandler(requestHandlersMap, requestPath, requestMethod, requestHandler) {
        requestMethod = requestMethod.toUpperCase();
        if (!requestHandlersMap[requestPath]) {
            requestHandlersMap[requestPath] = {};
        }
        requestHandlersMap[requestPath][requestMethod] = requestHandler;
    }

    this.addRequestHandler = function addRequestHandlers(requestPath, requestMethod, requestHandler) {
        addHandler(requestHandlers, requestPath, requestMethod, requestHandler);
    };

    this.addVariablePathRequestHandler = function addVariablePathRequestHandler(requestPath, requestMethod, requestHandler) {
        addHandler(variablePathRequestHandlers, requestPath, requestMethod, requestHandler);
    };

    this.handleRequest = function handleRequest(request, response) {
        if (!requestHandlers[request.url] || !requestHandlers[request.url][request.method]) {
            const result = getVariablePathMatch(request.url, request.method);
            if (result && result.requestHandler) {
                request.params = result.pathVariables;
                result.requestHandler(request, response);
            } else {
                response.statusCode = 404;
                response.end();
            }
            return;
        }
        const requestHandler = requestHandlers[request.url][request.method];
        requestHandler(request, response);
    };
}

module.exports = TodosRequestHandler;
