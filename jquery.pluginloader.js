/*!
 * jQuery Plugin Loader
 * Copyright(c) 2012 Eirikur Nilsson <eirikur@nilsson.is>
 * MIT Licensed
 */

(function($) {

    $.fn.loadPlugins = function() {
        // Pre-initialize jQuery object to iterate quicker
        var $this = $([1]);

        this.find('*[data-plugin]').add(this).each(function() {
            $this.context = $this[0] = this;

            var key, value, args
              , plugins = $this.data('plugin') || ""
              , isMap = plugins.indexOf(':') > -1;

            if (!plugins.length) { return; }

            if (!isMap) {
                plugins += ": [null]";
            }
            plugins = "({" + plugins + "})";
            plugins = eval(plugins);

            for (key in plugins) {
                if (plugins.hasOwnProperty(key) && key in $.fn) {
                    value = plugins[key];
                    args = $.isArray(value) ? value : [value];

                    $.fn[key].apply($this, args);
                }
            }
        });

        return this;
    };

    $(function() {
        $(document.body).loadPlugins();
    });

})(jQuery);