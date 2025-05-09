'use strict';

function withoutNulls(obj) {
    return obj && Object.keys(obj).reduce(function (sum, curr) {
        if (typeof obj[curr] === 'string') {
            sum[curr] = obj[curr];
        }
        return sum;
    }, {});
}

module.exports = function headers(plexApi, extraHeaders) {
    var options;
    if (typeof plexApi !== 'object') {
        throw new TypeError('A PlexAPI object containing .options is required');
    }

    options = plexApi.options;
    extraHeaders = withoutNulls(extraHeaders) || {};

    return Object.assign(extraHeaders, {
        'X-Plex-Client-Identifier': options.identifier,
        'X-Plex-Product': options.product,
        'X-Plex-Version': options.version,
        'X-Plex-Device': options.device,
        'X-Plex-Device-Name': options.deviceName,
        'X-Plex-Platform': options.platform,
        'X-Plex-Platform-Version': options.platformVersion,
        'X-Plex-Provides': 'controller'
    });
};
