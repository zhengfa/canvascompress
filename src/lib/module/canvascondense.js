/**
 * Compress upload image with canvas
 * Author:guopee.com
 * Email:2984403397@qq.com
 */
class canvascondense  {
    constructor(input, options) {
        this.options = options
        this.input = input
    }

    fileToDataURL(file, callback) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            callback(e.target.result);
        };
    }

    comporess() {
        let self = this
        return new Promise(function (re, rj) {
            var file = self.input.files[0]
            var fileType = file.fileType
            self.fileToDataURL(file, function (e) {
                let img = document.createElement('img')
                img.src = e
                img.onload = function () {
                    var cvs = document.createElement('canvas')
                    var scale = 1;
                    if (this.width > self.options.maxpix || this.height > self.options.maxpix) {//设置最大高宽度
                        if (this.width > this.height) {
                            scale = self.options.maxpix / this.width
                        } else {
                            scale = self.options.maxpix / this.height
                        }
                    }
                    cvs.width = this.width * scale
                    cvs.height = this.height * scale
                    var ctx = cvs.getContext('2d')
                    ctx.drawImage(this, 0, 0, cvs.width, cvs.height)
                    var base64imgdata = cvs.toDataURL(fileType, self.options.qulity)
                    if (base64imgdata) {
                        re(base64imgdata)
                    } else {
                        rj('error')
                    }
                }
            })
        })
    }
}

module.exports = canvascondense