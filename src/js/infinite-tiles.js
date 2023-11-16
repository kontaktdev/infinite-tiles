(function ($) {
    // Define the InfiniteTiles plugin
    $.fn.infiniteTiles = function (options) {
        const NUMBER_OF_COLUMNS = 4;

        var $container;

        var settings = $.extend({
            data: [], // Array of image URLs
            transition: null
        }, options);

        /**
         *
         * @param element
         */
        function init(element) {
            $container = $(element);

            $container.addClass('grid-gallery');

            var data = []
            if (settings.data != null) {
                data = settings.data;
            }

            var transition = null
            if (settings.transition != null) {
                transition = settings.transition;
            }

            addResources($container, data, transition);
        }

        /**
         *
         * @param $container
         * @param data
         * @param transition
         */
        function addResources($container, data, transition) {
            if (data.length == 0) {
                return;
            }

            var $column = [];
            for (var i = 0; i < NUMBER_OF_COLUMNS; i++) {
                $column[i] = $('<div class="column"></div>');
                $container.append($column);
            }

            var index = 0;
            for (var j = 0; j < data.length; j++) {
                if(index > NUMBER_OF_COLUMNS - 1) {
                    index = 0;
                }
                var src = '';
                if (data[j] != null && data[j].src != null) {
                    $img = $('<img src="' + data[j].src + '">');
                    if (transition != null) {
                        $img.addClass(transition);
                    }

                    $column[index].append($img);
                    index++;
                }
            }

            setTimeout(
            function()
            {
                fadeInVisibleImages($container);
            }, 100);


        }

        function fadeInVisibleImages($container) {
            $container.find('.column img').each(function() {
                if (isElementInViewport(this)) {
                    $(this).addClass('visible');
                }
            });
        }

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            //console.log(rect.top, window.innerHeight, document.documentElement.clientHeight);

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight)
            );
        }

        $(window).scroll(function() {
            fadeInVisibleImages($container);
        });

        // Initialize the plugin on each selected element
        return this.each(function () {
            init(this);
        });
    };
})(jQuery);