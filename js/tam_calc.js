var v_m;
var cost;
var rast;
var dvig;
var age;
var usd;
var eur;
var date;
var cross;

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: 'http://www.forsage.by/cache_kurs/rates_new.xml',
        headers: {
            'Access-Control-Allow-Origin' : true
        },
        dataType: 'xml',
        success: function(data) {
            usd = $(data).find('valuta today usd').text();
            eur = $(data).find('valuta today eur').text();
            cross = (eur / usd);
            cross = cross.toFixed(3);
            date = $(data).find('valuta today date').text();
        },
        error: function() {
            usd = 10810;
            eur = 13470;
            cross = (eur / usd);
            cross = cross.toFixed(3);
            date = '01.12.14';
        }
    });
    $('.zbutton[name="result_tam"]').click(function() {
        rachet();
        return false;
    });
    $('input[name="lico"]').change(function() {
        lico = $('input[name="lico"]:checked').val();
        if (lico == 1) {
            $('.typ_dvig').hide();
        } else {
            $('.typ_dvig').show();
        }
    });
    $('.engine_v').keyup(function() {
        val = $(this).val();
        if (!(val * 1)) {
            $(this).val(val.substr(0, val.length - 1));
            return;
        }
    });
    $('.cost').keyup(function() {
        val = $(this).val();
        if (!(val * 1)) {
            $(this).val(val.substr(0, val.length - 1));
            return;
        }
    });
});

function rachet() {
    v_m = $(".engine_v").val();
    if (v_m == '' || (!(v_m * 1))) {
        $('.err_v').show();
        setTimeout(function() {
            $('.err_v').hide();
        }, 4000);
        return false;
    }

    cost = $(".cost").val();
    if (cost == '' || (!(cost * 1))) {
        $('.err_c').show();
        setTimeout(function() {
            $('.err_c').hide();
        }, 4000)
        return false;
    }
    rast = $('input[name="lico"]:checked').val();
    dvig = $('input[name="dvig"]:checked').val();
    age = $('input[name="age"]:checked').val();
    if (rast == "1") {
        if (age == "1") {
            if (cost < 8500) {
                res = fiz(0.54, 2.5);
            } else if (cost >= 8500 && cost < 16700) {
                res = fiz(0.48, 3.5);
            } else if (cost >= 16700 && cost < 42300) {
                res = fiz(0.48, 5.5);
            } else if (cost >= 42300 && cost < 84500) {
                res = fiz(0.48, 7.5);
            } else if (cost >= 84500 && cost < 169000) {
                res = fiz(0.48, 15);
            } else if (cost >= 169000) {
                res = fiz(0.48, 20);
            } else {
                return false;
            }
        } else if (age == "2") {
            if (v_m < 1000) {
                res = v_m * 1.5;
            } else if (v_m >= 1000 && v_m < 1500) {
                res = v_m * 1.7;
            } else if (v_m >= 1500 && v_m < 1800) {
                res = v_m * 2.5;
            } else if (v_m >= 1800 && v_m < 2300) {
                res = v_m * 2.7;
            } else if (v_m >= 2300 && v_m < 3000) {
                res = v_m * 3;
            } else if (v_m >= 3000) {
                res = v_m * 3, 6;
            } else {
                return false;
            }
        } else if (age == "3") {
            if (v_m < 1000) {
                res = v_m * 3;
            } else if (v_m >= 1000 && v_m < 1500) {
                res = v_m * 3.2;
            } else if (v_m >= 1500 && v_m < 1800) {
                res = v_m * 3.5;
            } else if (v_m >= 1800 && v_m < 2300) {
                res = v_m * 4.8;
            } else if (v_m >= 2300 && v_m < 3000) {
                res = v_m * 5;
            } else if (v_m >= 3000) {
                res = v_m * 5.7;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else if (rast == "2") {
        if (dvig == 1) {
            if (age == 1) {
                if (v_m <= 1000) {
                    res = uri(0.3, 1.2);
                } else if (v_m > 1000 && v_m <= 1500) {
                    res = uri(0.3, 1.45);
                } else if (v_m > 1500 && v_m <= 1800) {
                    res = uri(0.3, 1.5);
                } else if (v_m > 1800 && v_m <= 2300) {
                    res = uri(0.3, 2.15);
                } else if (v_m > 2300 && v_m <= 3000) {
                    res = uri(0.3, 2.15);
                } else if (v_m > 3000) {
                    res = uri(0.3, 2.8);
                } else {
                    return false;
                }
            } else if (age == 2) {
                if (v_m <= 1000) {
                    res = uri(0.35, 1.2);
                } else if (v_m > 1000 && v_m <= 1500) {
                    res = uri(0.35, 1.45);
                } else if (v_m > 1500 && v_m <= 1800) {
                    res = uri(0.35, 1.5);
                } else if (v_m > 1800 && v_m <= 2300) {
                    res = uri(0.35, 2.15);
                } else if (v_m > 2300 && v_m <= 3000) {
                    res = uri(0.35, 2.15);
                } else if (v_m > 3000) {
                    res = uri(0.35, 2.8);
                } else {
                    return false;
                }
            } else if (age == 3) {
                if (v_m <= 1000) {
                    res = v_m * 2.5;
                } else if (v_m > 1000 && v_m <= 1500) {
                    res = v_m * 2.7;
                } else if (v_m > 1500 && v_m <= 1800) {
                    res = v_m * 2.9;
                } else if (v_m > 1800 && v_m <= 2300) {
                    res = v_m * 4.0;
                } else if (v_m > 2300 && v_m <= 3000) {
                    res = v_m * 4.0;
                } else if (v_m > 3000) {
                    res = v_m * 5.8;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else if (dvig == 2) {
            if (age == 1) {
                if (v_m <= 1500) {
                    res = uri(0.3, 1.45);
                } else if (v_m > 1500 && v_m <= 2500) {
                    res = uri(0.3, 1.9);
                } else if (v_m > 2500) {
                    res = uri(0.3, 2.8);
                } else {
                    return false;
                }
            } else if (age == 2) {
                if (v_m <= 1500) {
                    res = uri(0.35, 1.45);
                } else if (v_m > 1500 && v_m <= 2500) {
                    res = uri(0.35, 2.15);
                } else if (v_m > 2500) {
                    res = uri(0.35, 2.8);
                } else {
                    return false;
                }
            } else if (age == 3) {
                if (v_m <= 1500) {
                    res = v_m * 2.7;
                } else if (v_m > 1500 && v_m <= 2500) {
                    res = v_m * 4.0;
                } else if (v_m > 2500) {
                    res = v_m * 5.8;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }

    res_eur = parseInt(res).toFixed(0);
    res_usd = (res * cross);
    res_usd = parseInt(res_usd).toFixed(0);
    html = 'Растаможка составит <span>' + res_eur + ' €</span> или <span>' + res_usd + ' $</span>';
    $(".result-e").html(html);
    html = 'По курсу <b>' + parseFloat(cross).toFixed(3) + '</b> НБ РБ на <b>' + date + '</b>';
    $(".result-kurs").html(html);
}

function fiz(p, v) {
    res1 = cost * p;
    res2 = v * v_m;
    if (res1 >= res2)
        return res1;
    else
        return res2;
}
function uri(p, v) {
    res1 = cost * p;
    res2 = v * v_m;
    if (res1 >= res2)
        return res1;
    else
        return res2;
}

jQuery(function($) {
    $('#emadr').focus(function() {
        if ($(this).val() == '1800') {
            $(this).val('');
        }
    }).blur(function() {
        if ($(this).val() == '') {
            $(this).val('1800');
        }
    })

});