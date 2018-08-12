(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.canvascondense = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _lib = require('./lib');

var _lib2 = _interopRequireDefault(_lib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _lib2.default;

},{"./lib":2}],2:[function(require,module,exports){
'use strict';

var _canvascondense = require('./module/canvascondense.js');

var _canvascondense2 = _interopRequireDefault(_canvascondense);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _canvascondense2.default;

},{"./module/canvascondense.js":3}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvascondense = function () {
    function canvascondense(input, options) {
        _classCallCheck(this, canvascondense);

        this.options = options;
        this.input = input;
    }

    _createClass(canvascondense, [{
        key: 'fileToDataURL',
        value: function fileToDataURL(file, callback) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                callback(e.target.result);
            };
        }
    }, {
        key: 'compress',
        value: function compress() {
            var self = this;
            return new Promise(function (re, rj) {
                var file = self.input.files[0];
                var fileType = file.type;
                self.fileToDataURL(file, function (e) {
                    var img = document.createElement('img');
                    img.src = e;
                    img.onload = function () {
                        var cvs = document.createElement('canvas');
                        var scale = 1;
                        if (this.width > self.options.maxpix || this.height > self.options.maxpix) {
                            if (this.width > this.height) {
                                scale = self.options.maxpix / this.width;
                            } else {
                                scale = self.options.maxpix / this.height;
                            }
                        }
                        cvs.width = this.width * scale;
                        cvs.height = this.height * scale;
                        var ctx = cvs.getContext('2d');
                        ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
                        var base64imgdata = cvs.toDataURL(fileType, self.options.qulity);
                        if (base64imgdata) {
                            re(base64imgdata);
                        } else {
                            rj('error');
                        }
                    };
                });
            });
        }
    }]);

    return canvascondense;
}();

module.exports = canvascondense;

},{}]},{},[1])(1)
});
