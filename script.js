//ajout d’une function de callback sur le carousel
jQuery.extend(Drupal.settings.jcarousel.carousels[«jcarousel - dom - 1»], {
    "initCallback": jcarousel_initCallback
});

//function de callback permettant d’affecter les actions aux liens play / stop
function jcarousel_initCallback(carousel) {
    jQuery('#btn_pause').bind('click', function() {
        carousel.stopAuto();
    });
    jQuery('#btn_play').bind('click', function() {
        carousel.startAuto();
    });
}

// achat 

function myFunction() {
    let txt;
    if (confirm("Très bon choix!")) {
        txt = "à bientot";
    } else {
        txt = "Nous esperons vous revoir";
    }
    document.getElementById("demo").innerHTML = txt;
}
// load scroll 

$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        // ajax call get data from server and append to the div
    }
});

function infiniteScroll() {
    let offset = 20;

    // on initialise ajaxready à true au premier chargement de la fonction
    $(window).data('ajaxready', true);

    $('#content').append('<div id="loader"><img src="/img/ajax-loader.gif" alt="loader ajax"></div>');

    let deviceAgent = navigator.userAgent.toLowerCase();
    let agentID = deviceAgent.match(/(iphone|ipod|ipad)/);

    $(window).scroll(function() {
        // On teste si ajaxready vaut false, auquel cas on stoppe la fonction
        if ($(window).data('ajaxready') == false) return;

        if (($(window).scrollTop() + $(window).height()) == $(document).height() ||
            agentID && ($(window).scrollTop() + $(window).height()) + 150 > $(document).height()) {
            // lorsqu'on commence un traitement, on met ajaxready à false
            $(window).data('ajaxready', false);

            $('#content #loader').fadeIn(400);
            $.get('/more/' + offset + '/', function(data) {
                if (data != '') {
                    $('#content #loader').before(data);
                    $('#content .hidden').fadeIn(400);
                    offset += 20;
                    // une fois tous les traitements effectués,
                    // on remet ajaxready à false
                    // afin de pouvoir rappeler la fonction
                    $(window).data('ajaxready', true);
                }

                $('#content #loader').fadeOut(400);
            });
        }
    });
};
