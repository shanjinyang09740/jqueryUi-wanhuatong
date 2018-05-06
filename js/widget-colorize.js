$(function(){
    //部件定义，其中"custom"是命名空间, "colorize"是部件名称
    $.widget("custom.colorize", {
        //默认选项
        options: {
            red: 255,
            green: 0,
            blue: 0,

            //回调
            change: null,
            random: null
        },

        //构造函数
        _create: function(){
            this.element
                //添加一个主题化的class
                .addClass("custom-colorize")
                //防止双击来选择文本
                .disableSelection();

            this.changer = $("<button>", {
                text: "改变",
                "class": "custom-colorize-changer"
            })
            .appendTo(this.element)
            .button();

            //绑定changer按钮上的click事件到random方法
            this._on(this.changer, {
                //当小部件被禁用时，_on不会调用random
                click: "random"
            });
            this._refresh();
        },

        //当创建及之后改变选项时调用
        _refresh: function(){
            this.element.css("background-color", "rgb(" +
                this.options.red +"," +
                this.options.green +"," +
                this.options.blue + ")"
            );

            //触发一个回调/事件
            this._trigger("change");
        },

        //一个改变颜色为随机值的公共方法
        //可通过.colorize("random")直接调用
        random: function(event) {
            var colors = {
                red: Math.floor(Math.random() * 256),
                green: Math.floor(Math.random() * 256),
                blue: Math.floor(Math.random() * 256)
            };

            //触发一个事件，检查是否已取消
            if(this._trigger("random", event, colors) != false) {
                this.option(colors);
            }
        },

        //自动移除通过_on绑定的事件
        //在这里重置其他的修改
        _destroy: function(){
            //移除生成的元素
            this.changer.remove();

            this.element
                .removeClass("custom-colorize")
                .enableSelection()
                .css("backgroundColor", "transparent");
        },

        //_setOptions 是通过一个带有所有改变的选项的哈希来调用的
        //当改变选项时总是刷新
        _setOptions: function(){
            this._superApply(arguments);
            this._refresh();
        },

        //_setOption 是为每个独立的改变的选项调用的
        _setOption: function(key, value){
            //防止无效的颜色值
            if(/red|green|blue/.test(key) && (value<0 || value>255)){
                return;
            }
            this._super(key, value);
        }
    });

});