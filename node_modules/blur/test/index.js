var Blur = require('../');


// Load modules

var Lab = require('lab');
var Code = require('code');


// Test shortcuts

var lab = exports.lab = Lab.script();
var expect = Code.expect;
var describe = lab.describe;
var it = lab.it;


describe('blur', function () {

    describe('creditcard', function () {

        it('should leave non-string alone', function (done) {

            var obj = {
                creditcard: {
                    number: ['blah']
                }
            };

            var expected = {
                creditcard: {
                    number: ['blah']
                }
            }

            var result = Blur(obj, { number: Blur.creditCard });
            expect(result).to.deep.equal(expected);
            done();
        });

        it('blurs creditcard information', function (done) {

            var obj = {
                creditcard: {
                    number: 'ABCDEFGHIJKLMNOP'
                }
            };

            var expected = {
                creditcard: {
                    number: 'XXXXXXXXXXXXMNOP'
                }
            }

            var result = Blur(obj, { number: Blur.creditCard });
            expect(result).to.deep.equal(expected);
            done();
        });

        it('should not error with a 4 character string', function (done) {

            var obj = {
                creditcard: {
                    number: '4448',
                }
            };

            var expected = {
                creditcard: {
                    number: '4448',
                }
            }

            var result = Blur(obj, { number: Blur.creditCard });
            expect(result).to.deep.equal(expected);
            done();
        });

        it('should not error with a short string', function (done) {

            var obj = {
                creditcard: {
                    number: 'LMNOP',
                }
            };

            var expected = {
                creditcard: {
                    number: 'XMNOP',
                }
            }

            var result = Blur(obj, { number: Blur.creditCard });
            expect(result).to.deep.equal(expected);
            done();
        });

        it('should not error with a really short string', function (done) {

            var obj = {
                creditcard: {
                    number: 'P',
                }
            };

            var expected = {
                creditcard: {
                    number: 'P',
                }
            }

            var result = Blur(obj, { number: Blur.creditCard });
            expect(result).to.deep.equal(expected);
            done();
        });
    });

    describe('remove', function () {

        it('should remove a key altogether', function (done) {

            var obj = {
                creditcard: {
                    number: 'P',
                    year: 17
                }
            };

            var expected = {
                creditcard: {
                    year: 17
                }
            }

            var result = Blur(obj, { number: Blur.remove });
            expect(result).to.deep.equal(expected);
            done();
        });
    });

    describe('censor', function () {

        it('should completely censor any object', function (done) {

            var obj = {
                creditcard: {
                    number: ['anything goes'],
                }
            };

            var expected = {
                creditcard: {
                    number: '[BLURRED]'
                }
            }

            var result = Blur(obj, { number: Blur.censor });
            expect(result).to.deep.equal(expected);
            done();
        });
    });

    it('should fail for bad blur option', function (done) {

        var obj = {
            creditcard: {
                number: ['anything goes'],
            }
        };

        var badnessTest = function () {
            Blur(obj, { number: Blur.badmojo });
        }

        expect(badnessTest).to.throw()
        done();
    });

    it('should fail for bad blur options non-object', function (done) {

        var obj = {
            creditcard: {
                number: ['anything goes'],
            }
        };

        var badnessTest = function () {
            Blur(obj, true);
        }

        expect(badnessTest).to.throw()
        done();
    });
});



