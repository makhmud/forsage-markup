
(function($){
    $.browser = {}
    if (typeof(buildChart) != 'undefined'){
        buildChart();
    }

    window.onscroll  = function(e){

        if ($('.improve, .banner-aside').offset().top > $('.side-bar').height() + $('.side-bar').offset().top - $('.improve, .banner-aside').height()){
            $('.improve, .banner-aside').offset({top:$('.side-bar').height() + $('.side-bar').offset().top - $('.improve, .banner-aside').height()})
        } else {
            $('.improve, .banner-aside').css({top:'auto'})
        }
    }


    $('.color input').on('change', function() {
        chartData.forEach(function(elm) {
            elm.value *= Math.random();
        });
        buildChart();
    })

    if (typeof $.fn.styler != 'undefined') $('input, select').not('.custom-select_js').styler();

    $(document).on('click', '.week-days a', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    })

    $(document).on('click', '.every-day', function(e) {
        e.preventDefault();
        $(this).closest('.form-item').find('.week-days a').toggleClass('active');
    })

    $('.form-item.descr textarea').blur(function(){
        if ( $('.form-item.descr textarea').val().length == 0 ){
            $('.form-item.descr textarea + .message').show()
        } else {
            $('.form-item.descr textarea + .message').hide()
        }
    })

    $(document).on('click', '.form-item.phone a.add', function(e){
        e.preventDefault();
        var parent = $(this).closest('.form-item');
        var clone = parent.clone();
        clone.find('a.add').removeClass('add').addClass('remove').text('Удалить');
        clone.find('label').remove();
        parent.after(clone);
    })
    $(document).on('click', '.form-item.phone a.remove', function(e){
        e.preventDefault();
        $(this).closest('.form-item').remove();
    })

    var timeout;

    var countPercent = function() {

        var percent = 0;
        var tuning = 'tuning-1';
        var empty = true;
        $('.params .form-item:not(.with-currency) select, .params .form-item input').each( function(indx, elm){
            if ($(this).val()) {
                empty = false;
            }
        })

        var complectCount = 0;
        $('.complect-section select, .complect-section input').each( function(indx, elm){
            if ($(this).is(":checked") || ($(this).is('select') && $(this).val()) ) {
                complectCount ++;
            }
        })

        if (!empty) {
            percent+=10;
        }

        if (complectCount <= 5 && complectCount > 0) {
            percent +=10
        }
        if (complectCount > 5 && complectCount <= 10) {
            percent +=15
        }
        if (complectCount > 10) {
            percent +=20
        }

        if ($('.form-item.descr textarea').val().length <= 150 && $('.form-item.descr textarea').val().length > 0){
            percent+=10;
        }
        if ($('.form-item.descr textarea').val().length > 150 && $('.form-item.descr textarea').val().length <= 250){
            percent+=20;
        }
        if ($('.form-item.descr textarea').val().length > 250){
            percent+=30;
        }

        var tuningNum = Math.ceil( percent/20 );
        tuningNum = tuningNum == 0? 1 : tuningNum;
        tuning = 'tuning-' + tuningNum;
        $('.progress-active').css({width:percent+'%'});

        for(var i = 1; i <= 5; i++){
            if (i<=tuningNum) {
                $('.tuning-' + i).addClass('opened');
            } else {
                $('.tuning-' + i).removeClass('opened');
            }
        }

        //timeout.clearTimeout();

        var changePercent = function(value) {

            console.clear();
            console.log(value);

            if (value > percent) {
                value--;
            }
            if (value < percent) {
                value++;
            }

            timeout = setTimeout(function() {
                $('.improve .percent .value').text(value);
                if (value != percent){
                    changePercent(value);
                }
            }, 50);
        }

        changePercent( parseInt($('.improve .percent .value').first().text()) );

    }

    var textareaHeightAdapt = function(textarea) {
        var form = textarea.closest('form');
        var maxHeight = Math.max(form.find('.col2').height(), form.find('.col1').height());
        var labelHeight = textarea.siblings('label').height();
        var labelMargin = parseInt(textarea.siblings('label').css('margin-bottom'));

        textarea.height( maxHeight - labelHeight - labelMargin - 2 );

        console.log();

    }

    textareaHeightAdapt($('#feedback textarea'));

    $('.form-item.required input, .form-item.required textarea').blur(function() {
        if ($(this).val().length == 0){
            var parent = $(this).closest('.form-item');
            var lastSelector = parent.find('.tip').length ? '.tip' : 'input';

            if (!parent.hasClass('error')){
                parent.addClass('error').find(lastSelector + ', textarea').after('<div class="error">Это поле должно быть заполнено</div>')
            }

        } else {
            $(this).closest('.form-item').removeClass('error').find('.error').remove();
        }

    })

    $(document).on('keyup', '.form-item.descr textarea', function() {
        $(this).siblings('.symb-count').find('.left').text(1000 - $(this).val().length);
        if ( $('.form-item.descr textarea').val().length == 0 ){
            $('.form-item.descr textarea + .message').show()
        } else {
            $('.form-item.descr textarea + .message').hide()
        }
        countPercent();
    })

    $('.complect-list a').on('click', function(e) {
        e.preventDefault();
        $('.complect-list a.selected').removeClass('selected');
        $(this).addClass('selected');
        $('.complect-section .tab.opened').removeClass('opened');
        $('.complect-section .tab-' + $(this).data('tab')).addClass('opened');
        //$('.complect-section .tab.opened input, .complect-section .tab.opened select').trigger('refresh');
    })

    var adaptSideBarHeight = function () {
        $('.side-bar.autoheight').each( function(indx, elm) {
            var parentHeight = $(elm).parent().find('.content').height();
            $(elm).height( parentHeight - 89 );
        })

    }



    $('.params .form-item:not(.with-currency) select, .params .form-item input, .complect-section select, .complect-section input').on('change', function(){

        countPercent()
    })

    adaptSideBarHeight();

    $(document).on('click', '[class^="add-step-"] .next', function(e) {
        e.preventDefault();
        var parent = $(this).closest('[class^="add-step-"]');
        var nextStep = parent.data('step') + 1;
        parent.hide();
        $('.add-step-' + nextStep).show();
        adaptSideBarHeight();
        if (nextStep == 4) {
            $(this).closest('.wrapper').addClass('thanks-add');
        }
    })

    $(document).on('click', '.every-hour', function(e) {

        e.preventDefault();
        var start = $(this).closest('.form-item').find('.jqselect:first-child select');
        start.find('option[selected]').removeAttr('selected');
        start.find('option:first-child').attr('selected', 'selected');
        start.trigger('refresh');
        var end = $(this).closest('.form-item').find('.jqselect:nth-child(2) select');
        end.find('option[selected]').removeAttr('selected');
        end.find('option:last-child').attr('selected', 'selected');
        end.trigger('refresh');

    })

    $(document).on('click', '[class^="add-step-"] .prev', function(e) {
        e.preventDefault();
        var parent = $(this).closest('[class^="add-step-"]');
        var nextStep = parent.data('step') - 1;
        parent.hide();
        $('.add-step-' + nextStep).show();
        adaptSideBarHeight();
    })

    $(document).on('click', '.autorize-tabs-links a', function(e) {
        e.preventDefault();
        $('.autorize-tabs-links a').removeClass('selected');
        $(this).addClass('selected');
        $('.autorize-tab.opened').removeClass('opened')
        $('#' + $(this).data('tab')).addClass('opened');
        adaptSideBarHeight();
    })
    /*adding triagle-icon for menu's item if are subMenu*/

    var subMenu = $('.nav li').children('ul');
    if(subMenu) {
        subMenu.parent().children('a').css({
            'backgroundImage':'url(images/header/icon-triangle.png)',
            'paddingRight': 30 + 'px'
        });
    }
    /*end*/

    /*toggle form*/
    var toggleButton = $('.toggle-search-form'),
        toggleButtonLink = $('#bt-toggle'),
        toggleElementForm = $('.form-search-features');

    toggleButtonLink.on('click', function(e){
        e.preventDefault();
        toggleElementForm.slideToggle('slow');

        if(toggleButtonLink.text() == 'Свернуть поиск') {
            toggleButtonLink.text('Развернуть поиск');
            toggleButton.css('backgroundImage','url(images/content/icon-triangle-disable.png)');
        }
        else {
            toggleButtonLink.text('Свернуть поиск');
            toggleButton.css('backgroundImage','url(images/content/icon-triangle-active.png)');
        }
    });
    /*end*/

    /*toggle auto pages*/
    $('#list-filter-auto_js a').on('click', function(e){
        e.preventDefault();
        var currentLink = $(e.target).text(),
            li = $(e.target).parent(),
            valueLi = $(e.target).parent().hasClass('active-category-auto'),
            allItemFilter = $('#list-filter-auto_js li');

        if(valueLi != 'active-category-auto') {
            for(var i = 0; i < allItemFilter.length; i++) {
                $(allItemFilter[i]).removeAttr('class');
            }

            li.addClass('active-category-auto');

            var brand = $('.list-auto-brand').parent(),
                type = $('.list-auto-type').parent(),
                city = $('.list-auto-city').parent();

            if(currentLink == 'По марке') {
                $('.wrap-all-category-auto > li').removeAttr('class');
                brand.addClass('show_js');
            }
            if(currentLink == 'По кузову') {
                $('.wrap-all-category-auto > li').removeAttr('class');
                type.addClass('show_js');
            }
            if(currentLink == 'По городу') {
                $('.wrap-all-category-auto > li').removeAttr('class');
                city.addClass('show_js');
            }

        }
    });
    /*end*/
    /*toggle autoservices pages*/
    $('#list-autoservice-auto_js a').on('click', function(e){
        e.preventDefault();
        var currentLink = $(e.target).text(),
            li = $(e.target).parent(),
            valueLi = $(e.target).parent().hasClass('active-category-auto'),
            allItemFilter = $('#list-autoservice-auto_js li');

        if(valueLi != 'active-category-auto') {
            for(var i = 0; i < allItemFilter.length; i++) {
                $(allItemFilter[i]).removeAttr('class');
            }

            li.addClass('active-category-auto');

            var sto = $('.list-sto').parent(),
                rental = $('.list-car-rental').parent(),
                dealer = $('.list-dealers').parent(),
                trucking = $('.list-trucking').parent();

            if(currentLink == 'СТО') {
                $('.wrap-all-category-autoservice > li').removeAttr('class');
                sto.addClass('show_js');
            }
            if(currentLink == 'Прокат авто') {
                $('.wrap-all-category-autoservice > li').removeAttr('class');
                rental.addClass('show_js');
            }
            if(currentLink == 'Автодиллеры') {
                $('.wrap-all-category-autoservice > li').removeAttr('class');
                dealer.addClass('show_js');
            }
            if(currentLink == 'Грузоперевозки') {
                $('.wrap-all-category-autoservice > li').removeAttr('class');
                trucking.addClass('show_js');
            }
        }
    });
    /*end*/

    /*toggle popup-regestration pages*/
    $('#list-reg-link_js a').on('click', function(e) {
        e.preventDefault();
        var currentLink = $(e.target).text(),
            li = $(e.target).parent(),
            valueLi = $(e.target).parent().hasClass('active-page'),
            allItemFilter = $('#list-reg-link_js li');


        if (valueLi != 'active-page') {
            for (var i = 0; i < allItemFilter.length; i++) {
                $(allItemFilter[i]).removeAttr('class');
            }


            var regBox = $('#reg-form'),
                autoregBox = $('#autoreg-form');

            if (currentLink == 'Авторизация') {
                $('#list-reg-link_js > li').removeAttr('class');
                li.addClass('active-page');
                regBox.removeClass('show_js');
                autoregBox.addClass('show_js');
            }
            if (currentLink == 'Регистрация') {
                $('#list-reg-link_js > li').removeAttr('class');
                li.addClass('active-page');
                autoregBox.removeClass('show_js');
                regBox.addClass('show_js');
            }
        }
    });
    /*end*/

    /*valid email*/
    $('#submit-subscription_js').submit(function(e){
        var emailValid = $('#valid-email_js');
        if(emailValid.val() == '' || emailValid == ' ') {
            e.preventDefault();
            $('#bt-subscription_js').css('backgroundColor','#ccc');
            emailValid.addClass('no-valid-email_js');

            emailValid.blur(function(){
                if(emailValid.val() != '' && emailValid != ' ') {
                    $('#bt-subscription_js').css('backgroundColor','#D7270D');
                    emailValid.removeClass('no-valid-email_js');
                }
                else {
                    $('#bt-subscription_js').css('backgroundColor','#ccc');
                }
            });
        }

    });
    /*end*/

    /*popup align*/

    /*end*/

    /*popup function*/
    function popupWindow(targetClick, showCurrentForm, subForm) {
        targetClick.on('click', function (e) {
            e.preventDefault();

            var bgPopup = $('#bg-popup'),
                fotoPopup = $('#wrap-popup');

            bgPopup.addClass('show_js');
            fotoPopup.prepend('<span class="icon-close_js"></span>').animate({'opacity': 1}, 500);
            showCurrentForm.addClass('show_js');
            try {
                subForm.addClass('show_js');
            }
            catch (err) {}

            bgPopup.height($(document).height());

            var fotoInPopupW = fotoPopup.width(),
                clientW = document.body.clientWidth,
                scrollTop = window.pageYOffset;

            fotoPopup.css({
                'top': scrollTop + 100,
                'left': '50%',
                'margin-left': - (fotoInPopupW / 2)
            });

            $('.icon-close_js, #bg-popup').on('click', function() {
                bgPopup.removeClass('show_js');
                $('.icon-close_js').remove();
                showCurrentForm.removeClass('show_js');

                $(showCurrentForm).find('.show_js').removeClass('show_js');

                fotoPopup.css({
                    'opacity' : 0,
                    'top': 0,
                    'left': 0,
                    'margin-left': 0
                });

                try {
                    subForm.removeClass('show_js');
                }
                catch (err) {}
            });

            $("#wrap-popup").click(function(e) {
                e.stopPropagation();
            });
        });
    }
    /*end*/

    /*popup call*/
    var popupRegestration = $('#popup-registration'),
        formReg = $('.wrap-reg-autoreg-form'),
        subForm = $('#reg-form'),
        callbackForm = $('#popup-callback'),
        screenshotPopup = $('#popup-service-screenshot');
    popupWindow(popupRegestration, formReg, subForm);

    var popupAutoreg = $('#popup-autoreg'),
        subFormAutoreg = $('#autoreg-form'),
        callbackCall = $('.callback'),
        screenshotCall = $('a.screenshot');
    popupWindow(popupAutoreg, formReg, subFormAutoreg);

    var popupTooltip = $('.popup-tooltip_js'),
        formTooltip = $('#popup-reg');
    popupWindow(popupTooltip, formTooltip);

    var popupAd = $('.bt-ad_js'),
        formAd = $('#popup-up-ad'),
        unregAdForm = $('#unregistered-ad-box');
    popupWindow(popupAd, formAd, unregAdForm);

    var popupAdvancedSearch = $('#link-advanced-search'),
        formAdvancedSearch = $('#popup-advanced-search'),
        useGraphPopupCall = $('a.use-graph'),
        useGraphPopup = $('#use-graph-popup');
    popupWindow(useGraphPopupCall, useGraphPopup);
    popupWindow(popupAdvancedSearch, formAdvancedSearch);

    popupWindow(callbackCall, callbackForm);
    popupWindow(screenshotCall, screenshotPopup);
    /*end*/

    /*responsive*/
    if(document.body.clientWidth < 769) {
        $('.list-autoservice tr, .list-autoservice td').load(function(e){
            e.preventDefault();
        });
    }
    /*end*/

    popupAutoreg.on('click', function(){
        $('#link-reg').parent().removeClass('active-page');
        $('#link-autoreg').parent().addClass('active-page');
    });

    popupRegestration.on('click', function(){
        $('#link-reg').parent().addClass('active-page');
        $('#link-autoreg').parent().removeClass('active-page');
    });

    var menuDynamik = $('.list-other-parameters > li > a');
    $('.active .list-values').css("opacity", 1);
    menuDynamik.on('click', function(e){
        e.preventDefault();
        $('.active .list-values').css("opacity", 0);

        menuDynamik.parent().each(function(){
            if($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });

        $(e.target).parent().addClass('active');
        $('.active .list-values').animate({"opacity": 1}, 500);
    });


        /* prepend menu icon */
        $('#nav-wrap').prepend('<div id="menu-icon"></div>');

        /* toggle nav */
        $("#menu-icon").on("click", function(){
            $("#nav").slideToggle();
            $(this).toggleClass("active");
        });

    $('.placeholder_js').focus(function(){
        var textPlaceholder = $(this).prop('placeholder');

        $(this).removeAttr('placeholder');
        $(this).blur(function(){
            $(this).prop('placeholder', textPlaceholder);
        });
    });

    $('input.check-other-parameters').change('click', function(e){
        var curLabel = $(e.target).parent();

        if(curLabel.hasClass('bg-label_js')) {
            curLabel.removeClass('bg-label_js');
        }
        else if (!curLabel.hasClass('bg-label_js')) {
            curLabel.addClass('bg-label_js');
        }
    });


    $(".custom-select_js").selectmenu();

    $(".ui-selectmenu-button").addClass( "custom-input custom-select-height" );
    $(".select-subscription").parent().children(".ui-selectmenu-button").addClass("select-subscription");

    /*collage toggle*/
    function collageToggle(targetFoto, wrapMainFoto) {
        targetFoto.on('click', function(e){
            var activeFotoCollage = $(e.target).clone();

            wrapMainFoto.children('img').remove();
            activeFotoCollage.css('opacity', 0);
            wrapMainFoto.prepend(activeFotoCollage);
            activeFotoCollage.animate({'opacity': 1}, 500);
        });
    }

    var littleFotoCollage = $('.list-foto-collage img'),
        wrapMainFotoCollage = $('.wrap-main-auto > a');
        collageToggle(littleFotoCollage, wrapMainFotoCollage);
    /*end*/

    /**/
    $('.hide-text_js').fadeToggle();
    $('#show-text').on('click', function(e){
        e.preventDefault();
        $('.hide-text_js').fadeToggle();
        console.log($(this).text());
        if($(this).text() != 'Скрыть') {
            $(this).text('Скрыть');
        }
        else {
            $(this).text('Подробнее');
        }
    });
    /*end*/

    /*favorites box*/
    var curFavoritesBt = $('.bt-favorites'),
        textCurFavoritesBt = curFavoritesBt.text();

    curFavoritesBt.on('click', function(e){
        var curBoxFavorites = $(e.target).closest('.favorite_js'),
            posTopCurBoxFavorites = curBoxFavorites.offset().top,
            posLeftCurBoxFavorites = curBoxFavorites.offset().left;

        if($(e.target).text() != 'В избранное') {
            $(e.target).text('В избранное');
        }
        else {
            $(e.target).text('В избранном');
                $('.box-favorites_js').remove();

                var searchFavoritesBox = curBoxFavorites.children('.box-favorites_js');
                if(searchFavoritesBox) {
                    curBoxFavorites.prepend('<span class="box-favorites_js"><i class="fa fa-heart"></i><br><span>250</span></span>');
                    $('.box-favorites_js').slideDown(250);
                    if($(window).width() > 1204) {
                        $('.box-favorites_js').css(
                            'left', posLeftCurBoxFavorites - 62
                        );
                        if(posTopCurBoxFavorites >= $(document).scrollTop()) {
                            topPosition = posTopCurBoxFavorites - $(document).scrollTop()
                        }
                        else {
                            topPosition = 0
                        }
                        $('.box-favorites_js').css(
                            'top', topPosition
                        )
                    }
                    else if($(window).width() < 1204 && $(window).width() > 480) {
                        $('.box-favorites_js').css(
                            'left', 0
                        );
                        if(posTopCurBoxFavorites >= $(document).scrollTop()) {
                            topPosition = posTopCurBoxFavorites - $(document).scrollTop()
                        }
                        else {
                            topPosition = 0
                        }
                        $('.box-favorites_js').css(
                            'top', topPosition
                        )
                    }

                    else if($(window).width() <= 480) {
                        $('.box-favorites_js').css({
                            'bottom': 0,
                            'left': 0
                        });
                    }
                }
        }

        if($('.bt-favorites').text() == textCurFavoritesBt){

            $('.box-favorites_js').remove();
        }
    });
    /*end*/

    /*sort element*/
    function sortElement(targetCategory, nameDataParameter, wrapListSort, placeEntry){
        targetCategory.click(function(e){
            e.preventDefault();

            var $detachAdsItem = wrapListSort.detach();

            $detachAdsItem.sort(function (a, b) {
                var aSortTime = $(a).data(nameDataParameter),
                    bSortTime = $(b).data(nameDataParameter);

                if ( aSortTime < bSortTime ) { return -1; }
                if ( aSortTime > bSortTime ) { return 1; }

                return 0;
            });

            $detachAdsItem.appendTo(placeEntry);
        });
    }
    var wrapBoxAuto = $(".box-content-list-auto"),
        wrapListBoxAuto = $('.wrap-content-list-auto'),
        wrapSortContentAuto = $(".wrap-all-list-auto-result-sort"),
        wrapListSortAuto = $(".all-list-auto-result-sort");

    var dataSort = $('.data-sort_js'),
        dataParam = 'sort-timestamp';
        sortElement(dataSort, dataParam, wrapBoxAuto, wrapListBoxAuto);
        sortElement(dataSort, dataParam, wrapSortContentAuto, wrapListSortAuto);

    var priceSort = $('.price-sort_js'),
        priceParam = 'sort-price';
        sortElement(priceSort, priceParam, wrapBoxAuto, wrapListBoxAuto);
        sortElement(priceSort, priceParam, wrapListSortAuto);

    var yearSort = $('.year-sort_js'),
        yearParam = 'sort-year';
        sortElement(yearSort, yearParam, wrapBoxAuto, wrapListBoxAuto);
        sortElement(yearSort, yearParam, wrapListSortAuto);

    var engineSort = $('.engine-sort_js'),
        engineParam = 'sort-engine';
        sortElement(engineSort, engineParam, wrapBoxAuto, wrapListBoxAuto);
        sortElement(engineSort, engineParam, wrapListSortAuto);

    var mileageSort = $('.mileage-sort_js'),
        mileageParam = 'sort-mileage';
        sortElement(mileageSort, mileageParam, wrapBoxAuto, wrapListBoxAuto);
        sortElement(mileageSort, mileageParam, wrapListSortAuto);

    var transmissionSort = $('.transmission-sort_js'),
        transmissionParam = 'sort-transmission';
        sortElement(transmissionSort, transmissionParam, wrapBoxAuto, wrapListBoxAuto);
        sortElement(transmissionSort, transmissionParam, wrapListSortAuto);
    /*end*/

    /*active link*/

    $('.list-sort-link li').on('click', function(event){
        var listLinks = $('.list-sort-link li');
            listLinks.each(function(){
                $(this).removeClass('active-sort-link');

            });
        $(event.target).parent().addClass('active-sort-link');

        if(!$(event.target).parent().hasClass('active-triagle')) {
            $(event.target).parent().addClass('active-triagle');
        }
        else {
            $(event.target).parent().removeClass('active-triagle');
        }
    });
    $('.js-tabs ul li a').click(function(e) {
        e.preventDefault();
        $('.js-tabs ul li a.active').removeClass('active');
        $(this).addClass('active');
        $('.js-tabs .tab-content .active').removeClass('active').hide();
        $('.js-tabs .tab-content').find('.'+$(this).data('tab')).addClass('active');

    });

    var chart, chart2, chart3;

    if( typeof(AmCharts) != 'undefined' ){
        AmCharts.ready(function () {
            // PIE CHART
            chart = new AmCharts.AmPieChart();
            chart.dataProvider = chartRegionData;
            chart.titleField = "country";
            chart.valueField = "visits";
            chart.outlineAlpha = 0.6;

            var legend = new AmCharts.AmLegend();
            legend.markerBorderColor = "#000000";
            legend.switchType = undefined;
            legend.align = "center";
            chart.addLegend(legend);

            // WRITE
            chart.write("by-region");

            chart2 = new AmCharts.AmPieChart();
            chart2.dataProvider = chartAgeData;
            chart2.titleField = "country";
            chart2.valueField = "visits";
            chart2.outlineAlpha = 0.6;

            var legend2 = new AmCharts.AmLegend();
            legend2.markerBorderColor = "#000000";
            legend2.switchType = undefined;
            legend2.align = "center";
            chart2.addLegend(legend2);

            // WRITE
            chart2.write("by-age");

            chart3 = new AmCharts.AmPieChart();
            chart3.dataProvider = chartDeviceData;
            chart3.titleField = "country";
            chart3.valueField = "visits";
            chart3.outlineAlpha = 0.6;

            var legend3 = new AmCharts.AmLegend();
            legend3.markerBorderColor = "#000000";
            legend3.switchType = undefined;
            legend3.align = "center";
            chart3.addLegend(legend3);

            // WRITE
            chart3.write("by-device");

            $('.tab-content > div').not('.active').hide();
        });
    }

    $(document).on('blur', '.check-num', function(e) {
        if ( !$(this).val().match(/^-?\d*(\.\d+)?$/) || $(this).val() == '' ) {
            $(this).addClass('invalid');
            $(this).siblings('.error, br').remove();
            $(this).after(' <br/><span class="error">Необходимо ввести цифры</span>')
        } else {
            $(this).removeClass('invalid');
            $(this).siblings('.error, br').remove();
        }
    })

    $(document).on('click', 'form#calc input[type="submit"]', function(e) {
        e.preventDefault();

        var price = parseFloat($('#calc #ch3').val());
        var fuelPer100 = parseFloat($('#calc #fuelPer100').val());

        var perKm = fuelPer100/100 * price;

        var fuelPerDay = parseFloat($('#calc #fuelPerDay').val());
        var pricePerDay = fuelPerDay * perKm;
        var fuelPerMonth = parseFloat($('#calc #fuelPerMonth').val());
        var pricePerMonth = fuelPerMonth * perKm;
        var fuelPerYear = parseFloat($('#calc #fuelPerYear').val());
        var pricePerYear = fuelPerYear * perKm;

        if (!isNaN(pricePerDay) && !isNaN(pricePerMonth) && !isNaN(pricePerMonth)){
            $('#resultPerDay').val(pricePerDay);
            $('#resultPerMonth').val(pricePerMonth);
            $('#resultPerYear').val(pricePerYear);
        }
    })


    /*end*/
})(jQuery);