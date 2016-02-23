;(function($){
    var Editable = function(element, options){
        this.$element = $(element);
        this.$parent =this.$element.closest('td');
        this.$editable = this.$parent.find('.editable-container');
        this.options = $.extend({},$.fn.editable.defaults, options);
        this.options.dataBack = function()
        if(!this.options.selector) {
            this.init();
        }
    }

    Editable.prototype = {
        constructor: Editable,
        init: function() {
            var data = null;

            this.options.name = this.options.name || this.$element.attr('data-name');

            this.options.scope = this.$element[0];
            this.options.value = $.trim(this.$element.html());
            this.options.editContainer = template('editInput',data);
            // console.log(template('editInput',data));
            this.options.input = $('.editinput');

            this.options.data = this.getData();


            // this.createInput();
            this.bindEvent();
            // this.input =
        },
        bindEvent:function() {
            var _self = this;
            this.$element.on('click.editable', function(event) {
                event.preventDefault();
                _self.createInput();
                _self.hideother();
                _self.displayEdit();
            });
            this.$parent.on('click.editableCancel','.editable-cancel', function(event) {
                _self.hideEditCon();
            });
            this.$parent.on('click.editablesubmit','.editable-submit', function(event) {
                // console.log(888)
                event.preventDefault();
                _self.options.data.diff = _self.getValue();

                _self.ajaxSub();
            });
        },
        getData: function(){
            var dataKeys = ['op_number','card_no','order_date','kind_id','type'];
            var dataValue = {};
            for (var i = 0; i < dataKeys.length; i++) {
                dataValue[dataKeys[i]] = this.$element.data(dataKeys[i]);
                // dataValue.push[this.$element.data(dataKeys[i])];
            };
            return dataValue;
        },
        ajaxSub:function() {
            _self = this;
            $.ajax({
                url: _self.options.url,
                type: 'POST',
                dataType: 'json',
                data:_self.options.data,
                beforeSend:function() {
                    _self.beforeSubmit()
                },
                success:function(res) {
                    if(res.status) {
                         _self.success(res.msg);

                    }else{
                        _self.tips(res.msg)
                    }
                }
                // success
            })

        },
        //提示信息
        tips:function(msg) {
            $('.editableform-loading').hide();
            $('.editableform').show();
            $('.editinput').focus();
            $('.editable-error-block').show().html(msg);
        },
        //提交之前
        beforeSubmit: function(){
            $('.editableform-loading').show();
            $('.editableform').hide();
        },
        //提交成功之后
        success: function(msg) {
            this.setEditValue(this.getValue());
            this.hideEditCon();
            // this.hideEditCon();
        },
        //提交失败
        error: function() {
            $('.editableform-loading').hide();
            $('.editableform').show();
        },
        //移除编辑框
        hideEditCon: function() {
            $('.editable-container').remove();
            this.$element.show()
        },
        //创建 可编辑的input
        createInput:function(){
            this.$element.parent().append(this.options.editContainer);

        },
        //移除相邻的input 显示相邻的a
        hideother: function() {
            this.$element.parent().parent().siblings().find('.editable').show();
            this.$element.parent().parent().siblings().find('.editable-container').remove();
            this.$element.parent().siblings().find('.editable').show();
            this.$element.parent().siblings().find('.editable-container').remove();
        },
        //得到输入框的值
        getValue: function() {
            this.options.value = $('.editinput').val();
            return $('.editinput').val();
        },
        //显示输入框 并聚焦
        displayEdit:function() {
            this.$element.hide();
            this.setInputValue();
            $('.editable-container').show();
            $('.editinput').focus();
        },
        //初始化输入框的值
        setInputValue: function() {
            $('.editinput').val(this.options.value);
        },
        //设置editable a 的text
        setEditValue: function(value) {
            this.$element.html(value)
        },
        html2value:function(html) {
            // return
        },
        value2html:function() {

        }
    }
    $.fn.editable = function(option){
        return this.each(function() {
           var $this = $(this),
               data,
               options = typeof option === 'object'  && option;
               if(options && !options.selector) {
                    data = new Editable(this,options);
                    return;
               }
        });
    }
    $.fn.editable.defaults = {
        type: 'text',
        disabled:false,
        toggle: 'click',
        emptytext: 'Empty',
        value: null,
        display:null,
        selector:null,
        url:null,
        dataBack:null
    }

})(jQuery)