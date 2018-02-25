const where = require('node-where');
const IpAddressResolver = require('./IpAdrressResolver');

function GoogleGeocodeApiCaller() {
    const ipResolver = new IpAddressResolver();

    const getLocationByIp = function (ipAddress) {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            };

            if (ipAddress === '::1' || ipAddress === '127.0.0.1') {
                ipResolver
                    .getPublicIpAddress()
                    .then((publicIpAddress) => {
                        publicIpAddress = publicIpAddress.substr(0, publicIpAddress.length - 1);
                        where.is(publicIpAddress, callback);
                    });
            } else {
                where.is(ipAddress, callback);
            }
        });
    };

    this.getLocationByIp = getLocationByIp;

    this.getLocationByIpMiddleware = function (request, response, next) {
        const requestSource = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        getLocationByIp(requestSource)
            .then((location) => {
                response.locationDetails = location;
                next();
            })
            .catch((error) => {
                console.error(error);
                next(error);
            });
    };
}

module.exports = GoogleGeocodeApiCaller;
