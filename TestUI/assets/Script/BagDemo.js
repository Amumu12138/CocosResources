
var BagWindow = cc.Class({
    extends: fgui.Window,

    properties: {
    },

    onInit:function()
    {
        this.contentPane = fgui.UIPackage.createObject("Bag", "BagWin").asCom;
        this.center();       
    },

    onShown:function()
    {
        var list = this.contentPane.getChild("list").asList;
        list.on(fgui.Event.CLICK_ITEM, this.onClickItem, this);
        list.itemRenderer = this.renderListItem.bind(this);
        list.setVirtual();
        list.numItems = 45;
    },

    renderListItem : function (index, obj) 
    {
        obj.icon = "Icons/i" + Math.floor(Math.random() * 10);
        obj.text = "" + Math.floor(Math.random() * 100);
    },
    onClickItem :function (item) 
    {
        this.contentPane.getChild("n11").asLoader.url = item.icon;
        this.contentPane.getChild("n13").text = item.icon;
    },

});



var BageDemo = cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        fgui.UIPackage.loadPackage("UI/Bag", this.onUILoaded.bind(this));
    },
    
    onUILoaded() {
        this._view = fgui.UIPackage.createObject("Bag", "Main").asCom;
        this._view.makeFullScreen();
        fgui.GRoot.inst.addChild(this._view);


        this._bagWindow = new BagWindow();
        this._view.getChild("bagBtn").onClick(() => { this._bagWindow.show(); }, this);
    },

    onDestroy() {
        fgui.UIPackage.removePackage("Bag");
    },


    start () {

    },

    // update (dt) {},
});



module.exports = BageDemo;