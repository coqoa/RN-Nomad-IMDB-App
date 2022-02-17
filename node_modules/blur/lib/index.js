// Load modules

var Hoek = require('hoek');
var Traverse = require('traverse');


// Declare internals

module.exports = function (obj, options) {

    Hoek.assert(typeof(options) === 'object', 'Options value must be an object');
    var cloneObj = Hoek.clone(obj);

    Traverse(cloneObj).forEach(function (x) {

        for (var key in x) {
            if (!x.hasOwnProperty(key)) {
                continue;
            }

            for (var optionKey in options) {
                if (!options.hasOwnProperty(optionKey)) {
                    continue;
                }

                if (key === optionKey) {

                    switch (options[key]) {
                        case module.exports.creditCard:
                            if (typeof(x[key]) !== 'string') {
                                continue;
                            }
                            var value = x[key].toString();
                            if (value.length <= 4) {
                                continue;
                            }
                            var matchResult = value.match(/^(.+)?(....)$/);
                            var firstPart = matchResult[1];
                            var lastPart = matchResult[2];
                            firstPart = firstPart.replace(/./g, 'X');
                            value = [firstPart, lastPart].join('');
                            x[key] = value;
                            break;
                        case module.exports.remove:
                            delete x[key];
                            break;

                        case module.exports.censor:
                            x[key] = '[BLURRED]';
                            break;

                        default:
                            Hoek.abort('No such Blur.option exists');
                    }

                    this.update(x);
                }
            }
        }
    });

    return cloneObj;
};

module.exports.creditCard = 1;
module.exports.remove = 2;
module.exports.censor = 4;
