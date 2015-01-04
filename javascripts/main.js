if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

$(document).ready(function() {

    //
    // Main Slider
    //
    $('.banner').unslider({
        fluid: true,
        dots: true,
        keys: true,
        speed: 500,
        delay: 5000
    });


    //
    // Github linking contributers
    //
    var owner = 'fossasia';
    var repo = 'fossasia.github.io';

    $.ajax({
        url: 'http://api.github.com/repos/' + owner + '/' + repo + '/contributors?per_page=100',
        dataType: 'jsonp',
        success: function(data) {
            data = data.data;
            var n = data.length;
            for (var i = 0; i < n; i++) {
                var str = '<div class="sympl onefifth l-onethird m-half"><section class="person person--contributer"><div class="person__img"><div class="person__img__info"><div class="person__img__info__cont"><a target="_blank" href="{0}"><i class="icon-github"></i></a></div></div><img src="{1}"></div><h1 class="person__name">{2}</h1></section></div>'.format(data[i].html_url, data[i].avatar_url, data[i].login);
                $('#contr').append(str);
            }
        }
    });


    //
    // Menu
    //
    $('a[href^="#"]').on('click', function() {
        var id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 1000, "swing", function() {
            document.location.hash = id;
        });

        return false;
    });


    //
    // Animation
    //
    new WOW().init({
        mobile: false
    });

    function changeTitle() {
        if (window.matchMedia('(max-width: 1024px)').matches && window.matchMedia('(min-width: 470px)')) {
            $("#main-head").html('<span class="highlight">FOSSASIA</span>');
        } else {
            $("#main-head").html('<img src="images/logo.png" height="150px" width="300px">');
        }
    }

    function caller() {
        changeTitle();
    }

    $(window).on('resize', caller);
    $(window).trigger('resize');

    // Scrolling menu

    $(window).on('scroll', function() {
        if ($('.masthead').css('position') != 'absolute') {
            if (parseFloat($(window).scrollTop()) >= parseFloat($('.masthead').height())) {
                $('.masthead').removeClass('masthead--plain');
            } else {
                $('.masthead').addClass('masthead--plain');
            }
        }
    });


    $('.tweets-feed').each(function(index) {
        $(this).attr('id', 'tweets-' + index);
    }).each(function(index) {
        function handleTweets(tweets) {
                var x = tweets.length;
                var n = 0;
                var element = document.getElementById('tweets-' + index);
                var html = '<ul class="slides">';
                while (n < x) {
                    html += '<li>' + tweets[n] + '</li>';
                    n++;
                }
                html += '</ul>';
                element.innerHTML = html;

                $('.tweets-feed').unslider({
                    fluid: true,
                    keys: true,
                    delay: 5000
                });

                var elem = $('<p>').addClass('follow').text('Follow ');
                elem.append($('<a>', {
                    href: 'http://twitter.com/fossasia',
                    text: '@fossasia'
                }));
                elem.append(' for more updates');
                $('.tweets-feed').append(elem);
                return html;
            }
            // fetch(id, domId, max-tweets, enableLinks, showUser, showTime, dateFunction, showRT, custom-callback, interaction);
        twitterFetcher.fetch($('#tweets-' + index).attr('data-widget-id'), '', 5, true, false, true, '', false, handleTweets, false);
    });


    //
    // MAP
    //

    function hide_map_wrap() {
        $('.map-wrap').css('display', 'none');
    }

    function set_map_wrap() {
        $('.map-wrap').css('display', 'inline');
        console.log('clicked');
    }

    $('.map-wrap').on('click', hide_map_wrap);
    $('.map').on('click', set_map_wrap);


    //
    // MENU
    //

    var menu = function() {
        var hide = function() {
            $('.menu').slideUp(300, function() {
                $(this).removeClass('dropdown');
            });
        };
        var show = function() {
            $('.menu').addClass('dropdown').slideDown(300);
        };
        return {
            hide: hide,
            show: show
        };
    };

    $('.menu__toggle').on('click', function() {
        if ($('.menu').is(':visible'))
            menu().hide();
        else
            menu().show();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.menu, .menu__toggle').length) {
            if ($('.menu.dropdown').is(':visible'))
                menu().hide();
        }
    });

    function validateEmail(m) {
        if (typeof(m) == 'undefined') {
            m = $('.email').val();
        }
        if (m === '') {
            return true;
        }
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(m);
    }

    $('.email').on('input', function() {
        var m = $(this);
        if (!validateEmail(m.val())) {
            m.addClass('email-error');
        } else {
            m.removeClass('email-error');
        }
    });
});