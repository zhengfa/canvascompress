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
                var fileType = file.fileType;
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