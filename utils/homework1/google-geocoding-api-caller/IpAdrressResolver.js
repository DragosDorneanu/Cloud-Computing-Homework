const Client = require('node-rest-client').Client;

function IpAddressResolver() {
    const client = new Client();
    const ipAddressResolver = 'https://checkip.amazonaws.com/';

    this.getPublicIpAddress = function () {
        return new Promise((resolve, reject) => {
            client.get(ipAddressResolver, (data, response) => {
                resolve(data.toString());
            });
        });
    }
}

module.exports = IpAddressResolver;
