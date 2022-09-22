import '@babel/polyfill';
import 'tippy.js/dist/tippy.css'; // optional for styling

window.$ = window.jQuery = $;
import '@fancyapps/fancybox';
import 'slick-carousel';
import 'select2';
import 'select2/dist/js/i18n/ru.js';

import ES6Promise from "es6-promise";

import "whatwg-fetch";
import 'ion-rangeslider';

import React from 'react';
import ReactDOM from 'react-dom';

import {NewsBanner} from './components/sections/NewsBanner';
import {CatalogView} from './components/sections/CatalogView';
import {AvatarUpload} from './components/sections/AvatarUpload';
import {CloneBlock} from './components/sections/CloneBlock';
import {FileUpload} from './components/sections/FileUpload';
import {Schedule} from './components/sections/Schedule';

import {Action} from "./components/base/Action";
import {SetCurrency} from "./components/actions/SetCurrency";
import {SetContragent} from "./components/actions/SetContragent";
import {SetRegion} from "./components/actions/SetRegion";
import {SetRegionInitial} from "./components/actions/SetRegionInitial";
import {CancelOrder} from "./components/actions/CancelOrder";
import {RepeatOrder} from "./components/actions/RepeatOrder";
import {SetSubscriptionPeriod} from "./components/actions/SetSubscriptionPeriod";
import {CreatePostpaymentRequest} from "./components/actions/CreatePostpaymentRequest";
import {DeleteBasketItem} from "./components/actions/DeleteBasketItem";
import {DeleteSubscription} from "./components/actions/DeleteSubscription";
import {AddSampleToBasket} from "./components/actions/AddSampleToBasket";
import {GetBill} from "./components/actions/GetBill";
import {GetSpecification} from "./components/actions/GetSpecification";

import {Form} from "./components/base/Form";
import {GenericForm} from "./components/forms/Generic";
import {RequestCallbackForm} from "./components/forms/RequestCallback";
import {GetPriceForm} from "./components/forms/GetPrice";
import {AuthorizeForm} from "./components/forms/Authorize";
import {RegisterForm} from "./components/forms/Register";
import {TicketListForm} from "./components/forms/TicketList";
import {ServiceOrderForm} from "./components/forms/ServiceOrder";
import {FastOrderForm} from "./components/forms/FastOrder";
import {SubmitReviewForm} from "./components/forms/SubmitReview";
import {BecomeSupplierForm} from "./components/forms/BecomeSupplier";
import {SubscribeToNewsForm} from "./components/forms/SubscribeToNews";
import {PriceInqiuryForm} from "./components/forms/PriceInqiury";
import {PriceSubscribeForm} from "./components/forms/PriceSubscribe";
import {OfferGetForm} from "./components/forms/OfferGet";
import {ScheduleOrderForm} from "./components/forms/ScheduleOrder";

import {Section} from "./components/base/Section";
import {Services} from "./components/sections/Services";
import {Actions} from "./components/sections/Actions";
import {Contacts} from "./components/sections/Contacts";
import {CatalogDetail} from "./components/sections/CatalogDetail";
// import {SearchTitle} from "./components/sections/SearchTitle";
import {Payment} from "./components/sections/Payment";
import {TabbedPage} from "./components/sections/TabbedPage";

import {BasketSmall} from "./react/BasketSmall";
import {PersonalContragents} from "./react/PersonalContragents";
import {LegalPerson} from './react/LegalPerson'
import {Order} from "./react/Order";
import {PhoneField} from "./react/PhoneField";
import {PopupPhone} from "./react/PopupPhone";
import {PopupChooseIndastry} from "./react/PopupChooseIndastry";
import ChangeLegalPersonBtn from "./react/changeLegalPersonBtn";
import Installment from "./react/Installment";

import {SearchTitle} from "./compat/SearchTitle";

import {config, getUrl, plural, iOS} from "./functions";
import {bindFancybox, bindInputmask, bindSelect2, isMobile, showMessage} from "./helpers";


/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es/symbol';
import 'core-js/es/object';
import 'core-js/es/function';
import 'core-js/es/parse-int';
import 'core-js/es/parse-float';
import 'core-js/es/number';
import 'core-js/es/math';
import 'core-js/es/string';
import 'core-js/es/date';
import 'core-js/es/array';
import 'core-js/es/regexp';
import 'core-js/es/map';
import 'core-js/es/set';

ES6Promise.polyfill();

let dtop_mode = false;

$(() => {
    $.fancybox.defaults.touch = false;

    const $body = $("body");
    const header = $('header');
    const hideOnMenu = header.find('.hideOnMenu');
    const tg = hideOnMenu.find('.toggleCont');

    tg.find('.toggleLink').click((e) => {
        header.removeClass('openMenu');
    });

    $('.avatarUpload').each(function () {
        const av = new AvatarUpload($(this));
        av.init();
    });
    $('.cloneBlocks').each(function () {
        const cb = new CloneBlock($(this));
        cb.init();
    });

    $('#getPriceBtn').click(e => {
        $(e.target).parent().toggleClass('done');

        return false;
    });

    bindInputmask();

    $body.find('.tabs').each(function() {
        var allTab = $(this).find('nav').find('a');

        allTab.each(function() {
            var link = $(this);
            var href = link.attr('href');
            var tgL = $(href).find('.toggleLink');

            tgL.click(function() {
                allTab.not(link).removeClass('selected');
                link.toggleClass('selected');
            });

            link.click(function() {
                tgL.click();
                return false;
            });
        });
    });

    const linkedToggles = [
        ".toggleContragent",
        ".toggleLanguage",
        ".togglePersonal",
        ".toggleCurrency",
        ".toggleRegion"
    ];


    $body.find('.toggleCont')/* .not('.haveToggle') */.each((index, node) => {
        const cont = $(node).addClass('haveToggle');
        const toggle = cont.children('.toToggle');
        const inner = toggle.children('.inner');
        let link = cont.children('.toggleLink');

        if (!link.length) {
            link = cont.children('a').find('.toggleLink');
        }

        let linkedToggle = false;

        for (const klass of linkedToggles) {
            if (link.is(klass)) {
                linkedToggle = true;
                break;
            }
        }

        if(!linkedToggle) {
            // Кнопки не входящие в linkedToggles (старый код)
            link.click((e) => {
                if (cont.hasClass('opened')) {
                    if (link.is(".toggleContragent, .togglePersonal")) {
                        setTimeout(() => {
                            $("header .rightBasket").css({
                                "z-index": "",
                            });
                        }, 400);
                    }
    
                    cont.removeClass('preOpened');
                    toggle.css('overflow', 'hidden');
    
                    toggle.animate({height: 0}, 400, () => {
                        cont.removeClass('opened');
                        toggle.removeAttr('style');
                    });
                } else {
                    if (link.is(".toggleContragent, .togglePersonal")) {
                        $("header .rightBasket").css({
                            "z-index": "5",
                        });
                    }
    
                    if (cont.parents('.tabs').length) {
                        cont.siblings('.toggleCont.opened').each(function() {
                            const otherC = $(this);
                            const otherT = otherC.children('.toToggle');
    
                            otherT.animate({height: 0}, 400, function() {
                                otherC.removeClass('preOpened').removeClass('opened');
                                otherT.removeAttr('style');
                                //$("html:not(:animated),body:not(:animated)").animate({scrollTop: link.offset().top}, 600);
                            });
                        });
                    }
                    cont.addClass('preOpened');
                    toggle.css('overflow', 'hidden');
    
                    toggle.animate({height: inner.outerHeight()}, 400, () => {
                        cont.addClass('opened');
                        toggle.removeAttr('style');
                    });
                }
    
                if (isMobile() || !e.target.getAttribute("href") || (e.target.getAttribute("href") === "#")) {
                    return false;
                }
            });
        } else {
            if(isMobile()) {
                // linkedToggles на мобилке (нужно перезагружать страницу)
                link.click((e) => {
                    for (const klass of linkedToggles) {
                        const cont = $(klass).closest(".haveToggle");
                        const toggle = cont.children('.toToggle');
    
                        if (!link.is(klass) && cont.hasClass('opened'))  {
                            cont.removeClass('preOpened');
                            toggle.css('overflow', 'hidden');
                            toggle.animate({height: 0}, 400, () => {
                                cont.removeClass('opened');
                                toggle.removeAttr('style');
                            });
                        }
                    }

                    if (cont.hasClass('opened')) {
                        if (link.is(".toggleContragent, .togglePersonal")) {
                            setTimeout(() => {
                                $("header .rightBasket").css({
                                    "z-index": "",
                                });
                            }, 400);
                        }
        
                        cont.removeClass('preOpened');
                        toggle.css('overflow', 'hidden');
        
                        toggle.animate({height: 0}, 400, () => {
                            cont.removeClass('opened');
                            toggle.removeAttr('style');
                        });
                    } else {
                        if (link.is(".toggleContragent, .togglePersonal")) {
                            $("header .rightBasket").css({
                                "z-index": "5",
                            });
                        }
                        cont.addClass('preOpened');
                        toggle.css('overflow', 'hidden');
        
                        toggle.animate({height: inner.outerHeight()}, 400, () => {
                            cont.addClass('opened');
                            toggle.removeAttr('style');
                        });
                    }

                    if (isMobile() || !e.target.getAttribute("href") || (e.target.getAttribute("href") === "#")) {
                        return false;
                    }
                });
            } else {
                // linkedToggles на десктопе
                toggle.css('height', 'auto');
                toggle.css('display', 'none');
                toggle.css('margin-top', '0');

                if (link.is(".toggleContragent, .togglePersonal")) {
                    $("header .rightBasket").css({
                        "z-index": "5",
                    });
                }

                cont.hover((e) => {
                    toggle.not(':animated').slideDown(400);
                    if (isMobile() || !e.target.getAttribute("href") || (e.target.getAttribute("href") === "#")) {
                        return false;
                    }
                },
                (e) => {
                    toggle.slideUp(400, (e) => {
                        if (link.is(".toggleContragent, .togglePersonal")) {
                            setTimeout(() => {
                                $("header .rightBasket").css({
                                    "z-index": "",
                                });
                            }, 400);
                        }
                    });

                    if (isMobile() || !e.target.getAttribute("href") || (e.target.getAttribute("href") === "#")) {
                        return false;
                    }
                });
            }
        }
    });
    
    $('.mainSlider').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: false,
        arrows: false,
        dots: true,
        speed: 1000,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false
                }
            }
        ]
    });

    $('.goodsSlider').each((index, node) => {
        const that = $(node);
        const slider = that.find('.slider');

        slider.on('init', (event, slick) => {
            that.addClass('slick-initialized');
        });

        let mCnt = 0;

        if (that.parents('.rightContent').length) {
            mCnt = 2;
        }
        slider.slick({
            infinite: false,
            autoplay: false,
            slidesToShow: 6-mCnt,
            slidesToScroll: 1,
            centerMode: false,
            variableWidth: false,
            arrows: true,
            nextArrow: that.find('.slick-next'),
            prevArrow: that.find('.slick-prev'),
            dots: false,
            speed: 1000,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 1100,
                    settings: {
                        slidesToShow: 5-mCnt
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 560,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 420,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    });

    bindSelect2();

    $('.numSlider').each((index, node)  => {
        const block = $(node);
        const from = block.find('.from');
        const to = block.find('.to');
        const hidden = block.find("input:hidden");

        hidden.ionRangeSlider({
            grid: false,
            skin: "big",
            from_shadow: false,
            to_shadow: false,
            hide_min_max: true,
            hide_from_to: true,
            force_edges: false,
            onChange: data => {
                from.val(data.from);
                to.val(data.to);
                smartFilter.keyup(from.get(0));
            },
        });

        const myRange = hidden.data("ionRangeSlider");

        from.on('change', () => {
            myRange.update({
                from: from.val(),
                to: to.val()
            });
        });

        to.on('change', () => {
            myRange.update({
                from: from.val(),
                to: to.val()
            });
        });
    });

    var mn = $('.miniSlider');

    $('.sliderFancy').fancybox({
        autoSize: true,

        afterShow: function() {
            const slider = $('.fancybox-content').find('.slider');

            slider.slick({
                infinite: false,
                autoplay: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                variableWidth: false,
                arrows: true,
                nextArrow: mn.find('.slick-next'),
                prevArrow: mn.find('.slick-prev'),
                dots: false,
                speed: 1000,
                autoplaySpeed: 5000,
            });
        },

        beforeClose: function() {
            mn.find('a').first().click();

            $('.sliderPP').find('iframe').attr('src', "");

            const thumbs = $('.sliderPP .miniSlider a' );

            thumbs.removeClass("clicked");
            // thumbs.eq(0).addClass("clicked");
        }
    });

    mn.find('a').click(function() {
        var that = $(this);
        var big = mn.parents('.sliderPP').find('.big');
        var src = $(this).data('src');

        if (that.hasClass('play')) {
            big.find('img').hide();

            var iframe = big.find('iframe');

            if (src != iframe.attr('src')) {
                iframe.attr('src', src);

                var frm = iframe.get(0);

                frm.onload = function() {
                    frm.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                    iframe.show();
                }
            } else {
                iframe.show().get(0).contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
        } else {
            big.find('iframe').hide().get(0).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

            var img = big.find('img');

            if (src != img.attr('src')) {
                img.attr('src', src);
            }

            img.show();
        }

        mn.find("a").removeClass("clicked");
        that.addClass("clicked");

        return false;
    });

    const sch = $('.topSearch');
    const inp = sch.find('input:text');

    sch.find('input:submit').click(() => {
        if (window.innerWidth <= 560) {
            if (sch.hasClass('expanded')) {
                if (!inp.val()) {
                    sch.removeClass('expanded');

                    return false;
                }
            } else {
                sch.addClass('expanded');

                return false;
            }
        }
    });

    $('.searchResults').on("DOMNodeInserted", function () {
        if ($(this).children().length === 0) {
            $(this).html(null);
        }
    });

    $('.showMore').find('a').click(e => {
        $(e.target).parent().toggleClass('wait');

        return false;
    });

    $('.fileInpt').each(function () {
        const fu = new FileUpload($(this));

        fu.init();
    });

    $(window).on("scroll", function() {
        const scrollY = $(document).scrollTop();
        const new_mode = scrollY >= 187 ? "showFixed" : "notShowFixed";

        if ($('.catalog-wrapper').hasClass('open')) {
            $('header').addClass('openMenu')
        }

        if (new_mode !== dtop_mode) {
            $body.removeClass(dtop_mode).addClass(new_mode);
            dtop_mode = new_mode;
        }
    });

    const menu = $('.topMenuToggler');

    $('.toggleMenuFixed').click(function() {
        if (header.hasClass('openMenu')) {
            menu.css('overflow', 'hidden');
            menu.animate({height: 8}, 200, function() {
                header.removeClass('openMenu');
                menu.removeAttr('style');
            });
            $('.catalog-wrapper').removeClass('open')
        } else {
            menu.animate({height: 45}, 200, function() {
                header.addClass('openMenu');
                menu.removeAttr('style');
            });
        }

        tg.removeClass('opened preOpened');

        return false;
    });

    $(".toggleEditLegal").on("click", (e) => {
        e.preventDefault();

        $(document).trigger("contragents.edit-form");
    });

    $("body").on("click", (e) => {
        const toggle = $(e.target).closest(".toggleCont");

        if (!toggle.length) {
            $(".haveToggle.opened")
                .find(linkedToggles.join(", "))
                .trigger('click');
        }
    });

    if (window.outerWidth > 991) {
        $('.header-catalog .noSeparate').on('click', (e) => {
            e.preventDefault()
            if ($('.catalog-wrapper').hasClass('open')) {
                $('.catalog-wrapper').removeClass('open')
            } else {
                $('.catalog-wrapper').addClass('open')
            }

        })

        const headerCatalog = document.querySelector('.header-catalog')

        document.addEventListener('click', (e) => {
            if (e.path.indexOf(headerCatalog) === -1) {
                $('.catalog-wrapper').removeClass('open')
            }
        })

        $.each($('[data-header-menu-category]') ,(key, value) => {
            $(value).hover(() => {
                $('.chooseMenuItem').removeClass('chooseMenuItem')
                $(value).addClass('chooseMenuItem')
                $('.header-right-catalog .header-catalog-list.open').removeClass('open')
                $(`[data-header-menu-item=${value.attributes[1].value}]`).addClass('open')
            })
        } )
    } else {
        $('.header-catalog .noSeparate').on('click', (e) => {
            e.preventDefault()
            if ($('.catalog-wrapper').hasClass('open')) {
                $('.catalog-wrapper').removeClass('open')
            } else {
                $('.catalog-wrapper').addClass('open')
            }
        })

        $('.right-catalog__title .icon-close').on('click', () => {
            $('.header-catalog').removeClass('open2lvlMenu')
            $('.catalog-wrapper.open').removeClass('open')
        })

        $.each($('.header-left-catalog ul li a') ,(key, value) => {
            $(value).click((e) => {
                e.preventDefault()
                $.each($('.header-right-catalog .header-catalog-list'), (index, item) => {
                    $(`[data-header-menu-item=${value.attributes[1].value}]`).addClass('open')
                    $('.header-catalog').addClass('open2lvlMenu')
                })
            })
        } )
        $('.arrow_container').on('click', () => {
            $('.header-catalog').removeClass('open2lvlMenu')
            $('.header-catalog-list.open').removeClass('open')
        })
    }



    // Скрываем title у select2
    setInterval(() => $('.select2-selection__rendered').removeAttr('title'), 250);
});

document.addEventListener("DOMContentLoaded", () => {
    // noinspection JSUnusedLocalSymbols
    const newsSlider = new NewsBanner(".newsSlider", 768);
    // noinspection JSUnusedLocalSymbols
    const branchSlider = new NewsBanner(".branchSlider", 768);

    // Cсылка из переключателя текущей валюты
    Action.processTriggers(".js-link--set-currency", SetCurrency);
    // Cсылка из переключателя текущего региона продаж
    Action.processTriggers(".js-link--set-region", SetRegion);
    // Селект с выбором региона продаж, начальный попап
    Action.processTriggers(".js-trigger--set-region", SetRegionInitial);
    // Cсылка из переключателя контрагентов
    Action.processTriggers(".js-link--set-contragent", SetContragent);
    // Отмена заказа
    Action.processTriggers(".js-link--cancel-order", CancelOrder);
    // Повтор заказа
    Action.processTriggers(".js-link--repeat-order", RepeatOrder);
    // Установка периода подписки
    Action.processTriggers(".js-link--set-subscription-period", SetSubscriptionPeriod);
    // Запрос на лимит рассрочки
    Action.processTriggers(".js-link--create-postpayment-request", CreatePostpaymentRequest);
    // Удаление товара из корзины
    Action.processTriggers(".js-link--delete-basket-item", DeleteBasketItem);
    // Удаление подписки
    Action.processTriggers(".js-link--delete-subscription", DeleteSubscription);
    // Добавление образца в корзину
    Action.processTriggers(".js-link--add-sample", AddSampleToBasket);
    // Скачивание счета
    Action.processTriggers(".js-link--get-bill", GetBill);
    // Скачивание файла
    Action.processTriggers(".js-link--get-specification", GetSpecification);

    // Явное определение fancybox для отслеживания afterShow
    bindFancybox();

    // Малая корзина
    const basketAnchor = document.getElementById("basket-small");

    if (basketAnchor) {
        ReactDOM.render(<BasketSmall/>, basketAnchor);
    }

    // Костыль для iOS
    if (iOS()) {
        $(".js-link--get-specification").on("click", (e) => {
            window.open($(".js-link--get-specification").attr("pdf-url"), "_blank");
        });
    }

    // для менюшки


    //let newMenu1lvlItems = $(document).find('.header-catalog .header-left-catalog a')
    //console.log(newMenu1lvlItems)
    //for (let i = 0; i < newMenu1lvlItems.length; i++) {

        //$(newMenu1lvlItems[i]).on('click', () => {
           // let dataAttr = newMenu1lvlItems[i].dataset.headerMenuCategory
            //$(document).find('.header-catalog-list.open').removeClass('open')
            //$(document).find(`[data-header-menu-item = ${dataAttr}]`).addClass('open')
            //$(document).find('.header-catalog').addClass('open2lvlMenu')
        //})
   // }

    //$(document).find('.arrow_container').on('click', () => {
        //$(document).find('.header-catalog').removeClass('open2lvlMenu')
    //})


});

window.app = {
    base: {
        Form,
        Section,
    },
    forms: {
        RequestCallbackForm,
        GetPriceForm,
        AuthorizeForm,
        RegisterForm,
        TicketListForm,
        ServiceOrderForm,
        SubmitReviewForm,
        BecomeSupplierForm,
        GenericForm,
        FastOrderForm,
        SubscribeToNewsForm,
        PriceInqiuryForm,
        PriceSubscribeForm,
        OfferGetForm,
        ScheduleOrderForm,
    },
    sections: {
        Services,
        Actions,
        Contacts,
        SearchTitle,
        CatalogDetail,
        CatalogView,
        Schedule,
        Payment,
        TabbedPage,
    },
    compat: {
        SearchTitle,
    },
    react: {
        attachContragents: (elementId, data) => ReactDOM.render(
            <LegalPerson {...data} />, document.getElementById(elementId)
        ),
        attachOrder: (elementId, data) => ReactDOM.render(
            <Order {...data} />, document.getElementById(elementId)
        ),
        initPhoneField: (elementId, data) => {
            const element = document.getElementById(elementId);

            if (!element) {
                return;
            }

            let payload;

            if (element.dataset.payload) {
                try {
                    payload = JSON.parse(element.dataset.payload);
                } catch (e) {
                    // Не делаем ничего
                }
            }

            app.registry[elementId] = ReactDOM.render(
                <PhoneField {...payload} {...data} />,
                element
            );

            return app.registry[elementId];
        },

        confirmPhone: (context, actions) => {
            ReactDOM.render(
            <PopupPhone context={context} actions={actions}/>, document.getElementById('fancybox__confirm_phone')
        )},
        chooseCategory: () => {
            ReactDOM.render(
                <PopupChooseIndastry />, document.getElementById('register_fake-input')
            )},
        addPopupChangeLegalPerson: () => {
            ReactDOM.render(
                <ChangeLegalPersonBtn />, document.getElementById('btn-addPopupChangeLegalPerson')
            )},

        renderInstallment: (elementId, data) => {
            ReactDOM.render(
                <Installment {...data} />, document.getElementById(elementId)
            )
        }
        },
    registry: {},
    config,
    getUrl,
    plural,
    bindInputmask,
    bindFancybox,
    bindSelect2,
    isMobile,
    showMessage,
};
