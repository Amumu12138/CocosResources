cc.Class({
    extends: require('./textureRenderUtils'),

    start () {
        this.init();
    },

    captureAndShow () {
        let canvas = this.createSprite();
        var img = this.initImage();
        this.showSprite(img);
        this.saveFile(canvas);
    },

    saveFile (tempCanvas) {
        // This is one of the ways that could save the img to your local.
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            let self = this;
            let data = {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height,
                // destination file sizes
                destWidth: canvas.width,
                destHeight: canvas.height,
                fileType: 'png',
                quality: 1
            }
            // https://developers.weixin.qq.com/minigame/dev/api/render/canvas/Canvas.toTempFilePathSync.html
            let _tempFilePath = tempCanvas.toTempFilePathSync(data);
            cc.log(`Capture file success!${_tempFilePath}`);
            self.label.string = '图片加载完成，等待本地预览';
            // https://developers.weixin.qq.com/minigame/dev/api/media/image/wx.previewImage.html
            wx.previewImage({
                urls: [_tempFilePath],
                success: (res) => {
                    cc.log('Preview image success.');
                    self.label.string = '';
                }
            });
        }
    }
});
