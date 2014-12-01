jQuery(document).ready(function(){

/* слайдер цен */
jQuery("#slider").slider({
	min: 100,
	max: 200000,
	values: [100,200000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
		
    },
    slide: function(event, ui){
		jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
    }
});

jQuery("input#minCost").change(function(){

	var value1=jQuery("input#minCost").val();
	var value2=jQuery("input#maxCost").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minCost").val(value1);
	}
	jQuery("#slider").slider("values",0,value1);	
});

	
jQuery("input#maxCost").change(function(){
		
	var value1=jQuery("input#minCost").val();
	var value2=jQuery("input#maxCost").val();
	
	if (value2 > 200000) { value2 = 200000; jQuery("input#maxCost").val(200000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxCost").val(value2);
	}
	jQuery("#slider").slider("values",1,value2);
});



// фильтрация ввода в поля
	jQuery('#minCost, #maxCost').keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		
		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;
	
		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		
		if(!/\d/.test(keyChar))	return false;
	
	});


    /*two*/
    jQuery("#slider1").slider({
        min: 100,
        max: 200000,
        values: [100,200000],
        range: true,
        stop: function(event, ui) {
            jQuery("input#minCost1").val(jQuery("#slider1").slider("values",0));
            jQuery("input#maxCost1").val(jQuery("#slider1").slider("values",1));

        },
        slide: function(event, ui){
            jQuery("input#minCost1").val(jQuery("#slider1").slider("values",0));
            jQuery("input#maxCost1").val(jQuery("#slider1").slider("values",1));
        }
    });

    jQuery("input#minCost1").change(function(){

        var value1=jQuery("input#minCost1").val();
        var value2=jQuery("input#maxCost1").val();

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            jQuery("input#minCost1").val(value1);
        }
        jQuery("#slider1").slider("values",0,value1);
    });


    jQuery("input#maxCost1").change(function(){

        var value1=jQuery("input#minCost1").val();
        var value2=jQuery("input#maxCost1").val();

        if (value2 > 200000) { value2 = 200000; jQuery("input#maxCost1").val(200000)}

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            jQuery("input#maxCost1").val(value2);
        }
        jQuery("#slider1").slider("values",1,value2);
    });



	// фильтрация ввода в поля
    jQuery('#minCost1, #maxCost1').keypress(function(event){
        var key, keyChar;
        if(!event) var event = window.event;

        if (event.keyCode) key = event.keyCode;
        else if(event.which) key = event.which;

        if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
        keyChar=String.fromCharCode(key);

        if(!/\d/.test(keyChar))	return false;

    });
	
	// полосатая таблица
	jQuery('table.char-table tr:even').addClass('even');
	
	// car-photos Carousel
    $('.jc-car-photos').jcarousel();
    $('.jc-control-prev')
        .on('jcarouselcontrol:active', function() {
			$(this).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 400);
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
			$(this).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 400);
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=9'
        });
    $('.jc-control-next')
        .on('jcarouselcontrol:active', function() {
			$(this).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 400);
			$(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
			$(this).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 400);
			$(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=9'
        });
			
	// similar-cars Carousel
    $('.jc-similar-cars').jcarousel({vertical: true});
	var jcarousel = $('.jc-similar-cars');
    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var width = $('body').innerWidth();
			var height;
            if (width >= 768) {
                height = 218;
				jcarousel.jcarousel('items').css('height', height + 'px');
				jcarousel.css('height', (height + 20) * 4 + 'px');
				$('.jc-control-v-prev').jcarouselControl({target: '-=4'});
				$('.jc-control-v-next').jcarouselControl({target: '+=4'});
            } else {
                height = (jcarousel.innerWidth() - 18) * 0.6181 + 82;
				jcarousel.jcarousel('items').css('height', height + 'px');
				jcarousel.css('height', height + 'px');
				$('.jc-control-v-prev').jcarouselControl({target: '-=1'});
				$('.jc-control-v-next').jcarouselControl({target: '+=1'});
            }
        });
    $('.jc-control-v-prev')
        .on('jcarouselcontrol:active', function() {
			$(this).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 400);
            $(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
			$(this).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 400);
            $(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '-=4'
        });
    $('.jc-control-v-next')
        .on('jcarouselcontrol:active', function() {
			$(this).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 400);
			$(this).removeClass('inactive');
        })
        .on('jcarouselcontrol:inactive', function() {
			$(this).css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 400);
			$(this).addClass('inactive');
        })
        .jcarouselControl({
            target: '+=4'
        });
});



