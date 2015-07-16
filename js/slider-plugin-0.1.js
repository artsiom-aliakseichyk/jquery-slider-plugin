;(function($) {
    $.fn.ulSlider = function(options) {
        // console.profile();
        //default values
        var settings = $.extend({
            direction: 'right',
            speed: 'slow'
        }, options);
        //slider variable declaration
        var slidesNum;
        var slideWidth;
        var totalSliderWidth;
        var speed;
        //set data to first slide to detect it was copied or not
        this.children(":first").data("left", "x");
        //if was not copied
        if (!(this.children(":first").data("left") == this.children(":last").data("left"))) {
            //copy and set equal data attribute as in first slide
            this.children(":first").clone().appendTo(this);
            this.children(":last").data("left", "x");
        }
        //number of slides, each slide width, whole slider width
        slidesNum = $(this).find("li").length;
        slideWidth = $(this).find("li").width();
        totalSliderWidth = slidesNum * slideWidth;
        this.css({
            "width": totalSliderWidth
        });
        //speed value definition
        switch (settings.speed.toLowerCase()) {
            case "slow":
                speed = 400;
                break;
            case "fast":
                speed = 200;
                break;
            default:
                speed = 400;
        };
        //Direction definition
        switch (settings.direction.toLowerCase()) {
            case "right":
                method.slideToRight(this, slideWidth, slidesNum, speed);
                break;
            case "left":
                method.slideToLeft(this, slideWidth, slidesNum, speed);
                break;
        };
        // console.profileEnd();
        return this;
    };
    //namespace
    var method = {
        slideToRight: function(slider, slideWidth, slidesNum, speed) {
            slider.clearQueue();
            //check slider still has active animation process or not
            if (!slider.is(":animated")) {
                //if not active animations
                //define current slide
                var currentSlide = method.defineSlideNum(slider, slideWidth);
                //animate - change margin-left
                slider. /*speed(speed).*/ animate({
                    "margin-left": -slideWidth * currentSlide
                }, speed, function() {
                    //if it is last slide - "move" to begining - change margin-left to zero
                    if (method.defineSlideNum(slider, slideWidth) == slidesNum) {
                        slider.css({
                            "margin-left": 0
                        });
                    }
                });
            }
        },
        slideToLeft: function(slider, slideWidth, slidesNum, speed) {
            slider.clearQueue();
            if (!slider.is(":animated")) {
                //define current slide
                var currentSlide = method.defineSlideNum(slider, slideWidth);
                //if it's first slide
                if (currentSlide == 1) {
                    //set margin-left to last(copied) slide
                    slider.css({
                        "margin-left": -(slidesNum - 1) * slideWidth
                    });
                    //and animate move to slide which is pre-last in dom but last logicaly
                    slider. /*speed(speed).*/ animate({
                        "margin-left": -slideWidth * (method.defineSlideNum(slider, slideWidth) - 2)
                    }, speed);
                }
                //if it's not first slide just change margin-left
                else {
                    slider. /*speed(speed).*/ animate({
                        "margin-left": -slideWidth * (currentSlide - 2)
                    }, speed);
                }
            }
        },
        defineSlideNum: function(slider, slideWidth) {
            var currentSlide;
            //detect first slide
            if (parseInt(slider.css("margin-left")) == 0) {
                currentSlide = 1;
            } else {
                //else not first - get margin-left position and devide by slideWidth
                //cause of negative value of margin-left we need to use .abs method
                currentSlide = Math.abs(parseInt(slider.css("margin-left")) / slideWidth) + 1;
            }
            return currentSlide;
        }
    };
})(jQuery);