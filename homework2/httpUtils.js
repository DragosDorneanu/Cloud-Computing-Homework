function getHttpBody(httpEntity) {
    return new Promise((resolve, reject) => {
        let content = '';
        httpEntity.on('data', (data) => {
            content += data;
        });

        httpEntity.on('end', () => {
            if (content) {
                content = JSON.parse(content);
            }
            resolve(content);
        });

        httpEntity.on('error', (error) => {
            reject(error);
        });
    });
}

function sendCustomResponse(response, statusCode, statusMessage, responseBody) {
    response.statusCode = statusCode;
    if (statusMessage) {
        response.statusMessage = statusMessage;
    }
    response.end(responseBody);
}

module.exports = {getHttpBody, sendCustomResponse};