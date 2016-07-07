django.jQuery(function () {
    mmnony();
    try {
        SuitAfterInline.register('my_unique_func_name', function(inline_prefix, row){
            mmnony();
        });
    } catch (e) {}
});

function mmnony() {
    django.jQuery('input.mmony').each(function (idx, obj) {
        obj = django.jQuery(obj);
        var decimal = obj.attr('decimal');
        var symbol = obj.attr('symbol');
        obj.maskMoney({"decimal": decimal, "symbol": symbol});
    });
}