document.addEventListener('DOMContentLoaded', function(){
    //Options Slider
    var optionsSlider = new Swiper ('.options__container', {
        slideClass: 'options__slide',
        wrapperClass: 'options__wrapper',
        slidesPerView: 4,
        navigation: {
            nextEl: '.options__button-next',
            prevEl: '.options__button-prev',
        },
        pagination: {
            el: '.options__swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'options__swiper_bullet',
            bulletActiveClass: 'options__swiper_bullet-active',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 32
            },
            747: {
                slidesPerView: 4,
                spaceBetween: 0
            }
        }
    });
    //Works Slider
    var worksSlider = new Swiper ('.works__container', {
        dynamicBullets: true,
        dynamicMainBullets: 3,
        slideClass: 'works__item',
        wrapperClass: 'works__wrapper',
        slidesPerView: 4,
        spaceBetween: 32,
        navigation: {
            nextEl: '.works__button-next',
            prevEl: '.works__button-prev',
        },
        pagination: {
            el: '.works__swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'works__swiper_bullet',
            bulletActiveClass: 'works__swiper_bullet-active',
            dynamicBullets: true,
            dynamicMainBullets: 5,
            hideOnClick: false
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 32
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 32
            },

            820: {
                slidesPerView: 3,
                spaceBetween: 32
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 32
            }
        }
    });
    //Reviews Slider
    var reviewsSlider = new Swiper ('.reviews__container', {
        slideClass: 'reviews__item',
        wrapperClass: 'reviews__wrapper',
        slidesPerView: 1,
        autoHeight: true,
        navigation: {
            nextEl: '.reviews__button-next',
            prevEl: '.reviews__button-prev',
        },
        pagination: {
            el: '.reviews__swiper-pagination',
            type: 'bullets',
            clickable: true,
            bulletClass: 'reviews__swiper_bullet',
            bulletActiveClass: 'reviews__swiper_bullet-active'
        },
    });
});


$(document).ready(function () {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 90){
            $('header').addClass("sticky");
        }
        else{
            $('header').removeClass("sticky");
        }
    });

    // $(function() {
    //     $('#main-menu').smartmenus({
    //         mainMenuSubOffsetX: -1,
    //         mainMenuSubOffsetY: 4,
    //         subMenusSubOffsetX: 6,
    //         subMenusSubOffsetY: -6
    //     });
    // });

    // SmartMenus mobile menu toggle button
    $(function() {
        var $mainMenuState = $('#main-menu-state');
        if ($mainMenuState.length) {
            // animate mobile menu
            $mainMenuState.change(function(e) {
                var $menu = $('#main-menu');
                if (this.checked) {
                    $menu.hide().slideDown(250, function() { $menu.css('display', ''); });
                } else {
                    $menu.show().slideUp(250, function() { $menu.css('display', ''); });
                }
            });
            // hide mobile menu beforeunload
            $(window).bind('beforeunload unload', function() {
                if ($mainMenuState[0].checked) {
                    $mainMenuState[0].click();
                }
            });
        }
    });

    //Close menu
    $(window).ready(closeMenu);
    $(window).resize(closeMenu);
    function closeMenu()
    {
        if ( $(window).width() < 1100 ) {
            $(".yakor").on("click", function (event) {
                setTimeout(function(){
                    $("#main-menu-state").prop('checked', false).change();
                }, 300);
            });
        }
    }

    // для плавного перехода по якорям
    $(".yakor").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top -64;
        $('body,html').animate({scrollTop: top}, 500);
    });

    $(".js-callback").on( "click", function() {
        var newtitle = $(this).attr("data-title");
        var newinput = $(this).attr("data-input");
        $(".js-title").html(newtitle);
        $(".js-from").val(newinput);
    });

    $(".main-form__form").submit(function(e){
        e.preventDefault();        
        payment = $('input[name=pay]:checked').val();
        $(".js-payment").val(payment);
        console.log(payment);
    });

    $("#popup-form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            // $(this).find("input").val("");
            parent.jQuery.fancybox.getInstance().close();
            $.fancybox.open({
                src: '#fancyalert',
            });
            $("#popup-form").trigger("reset");
        });
        return false;
    });
    $("#popup-reviews").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            // $(this).find("input").val("");
            parent.jQuery.fancybox.getInstance().close();
            $.fancybox.open({
                src: '#fancyalert',
            });
            $("#popup-reviews").trigger("reset");
        });
        return false;
    });
    
    $(".main-form__form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open({
                src: '#fancyalert',
            });
            $(".main-form__form").trigger("reset");
        });
        return false;
    });

    $(".callback__form").submit(function(){
        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize()
        }).done(function() {
            $.fancybox.open({
                src: '#fancyalert',
            });
            $(".callback__form").trigger("reset");
        });
        return false;
    });
});

var ymID = 68201572;

$(function() {
    $('.js-callback').on("click", function() {
        var sendPopup = $(this).attr('data-send');
        // $(modal).find('input[name=target]').val(parent);
        $(".popup-form__btn").attr("data-goal", sendPopup);
        console.log(sendPopup);
    });

});

var metrikaGoals = function () {


    $('.js-onClickGoal').click(function () {

        var goal = this.dataset.goal;
        // var gtagGoal = this.dataset.gtagGoal;
        // var thisGoal = getCookie(goal);
        if (typeof thisGoal == "undefined") {
            if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                ym(ymID, 'reachGoal', goal);
            }

            var date = new Date(new Date().getTime() + 720 * 3600 * 1000);
            document.cookie = goal + "=1; path=/; expires=" + date.toUTCString();
        }


    });

    $('.js-validate-form').click(function () {
        var form = $(this).closest('.js-form-default');
        var validated = 1;

        $(form).find('input[required]').each(function (indexInArray, valueOfElement) {
            if ($(valueOfElement).val() == "") {
                validated = 0;
            }
        });

        if (validated == 0) {


            var goal = this.dataset.goal;
            // var gtagGoal = this.dataset.gtagGoal;

            if ((typeof goal !== 'undefined' || goal != '') && typeof ym !== 'undefined') {
                ym(ymID, 'reachGoal', goal);
            }
        }
        console.log(form);
    });
};

$(document).ready(function () {
    metrikaGoals();
});