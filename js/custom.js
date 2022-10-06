jQuery(document).ready(function ($) {
    $('.salegood').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        variableWidth: true,
        prevArrow: '<img class="slider-arrow slider-arrow__left" src="img/Ellipse2.png">',
        nextArrow: '<img class="slider-arrow slider-arrow__right" src="img/Ellipse3.png">'
    });

    $('.btn_catalog').on('click', function () {
        if ($('.topMenuToggler').hasClass('topMenuTogglerOpen')) {
            $('.topMenuToggler').removeClass('topMenuTogglerOpen');
        } else {
            $('.topMenuToggler').addClass('topMenuTogglerOpen')
        }
    });
    $('.left_menu').on('click', function () {
        if ($('.topMenuOpacity').hasClass('topMenuOpacityOpen')) {
            $('.topMenuOpacity').removeClass('topMenuOpacityOpen');
        } else {
            $('.topMenuOpacity').addClass('topMenuOpacityOpen')
        }
    });
    $('.topMenuOpacityClose').on('click', function () {
        $('.topMenuOpacity').removeClass('topMenuOpacityOpen');
    });

    


});