/**
 * Jribbble v@VERSION
 * A jQuery-free version of the JavaScript Dribbble API wrapper
 * http://dribbble.com/api
 *
 * Copyright (c) 2013 Tyler Gaw
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 *
 * Date: @DATE
 *
 */
var jribbble;

(function (exports) {
    // CommonJS
    if (typeof module !== "undefined" && module.exports) {
        module.exports = exports;
    }
    // AMD
    else if (typeof define === "function") {
        define(exports);
    }
    // <script>
    else {
        jribbble = exports;
    }
}((function () {
    'use strict';

    var exports = {};

    var jsonpGET = function (path, args) {
        var script = document.createElement('script'),
            callbackName = 'jribbble_' + new Date().getTime(),
            url = 'http://api.dribbble.com' + path + '?callback=' + callbackName;

        window[callbackName] = function (data) {
            if (typeof (data) === 'undefined') {
                args[0]({error: true});
            }
            else {
                args[0](data);
            }

            // Garbage collect
            script.parentNode.removeChild(script);
            window[callbackName] = undefined;
        };

        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    };

    // Working on this for the paging options
    // parametersToString = function (parameters, encodeURI) {
    //     var str = "",
    //         key,
    //         parameter;

    //     for (key in parameters) {
    //         if (parameters.hasOwnProperty(key)) {
    //             key = encodeURI ? encodeURIComponent(key) : key;
    //             parameter = encodeURI ? encodeURIComponent(parameters[key]) : parameters[key];
    //             str += key + "=" + parameter + "&";
    //         }
    //     }
    //     return str.replace(/&$/, "");
    // };

    var methods = {
        'getShotById': '/shots/$/',
        'getReboundsOfShot': '/shots/$/rebounds/',
        'getShotsByList': '/shots/$/',
        'getShotsByPlayerId': '/players/$/shots/',
        'getShotsThatPlayerFollows': '/players/$/shots/following/',
        'getPlayerById': '/players/$/',
        'getPlayerFollowers': '/players/$/followers/',
        'getPlayerFollowing': '/players/$/following/',
        'getPlayerDraftees': '/players/$/draftees/',
        'getCommentsOfShot': '/shots/$/comments/',
        'getShotsThatPlayerLikes': '/players/$/shots/likes/'
    };

    for (var method in methods) {
        exports[method] = function () {
            var slug = methods[method];

            return function () {
                var args = [].slice.call(arguments),
                    url = slug.replace('$', args.shift());

                jsonpGET(url, args);
            };
        }();
    }

    return exports;
}())));