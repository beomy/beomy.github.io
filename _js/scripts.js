/*eslint-env jquery*/

// Jquery & Velocity JS included in GULP
$( document ).ready( function() {

    toggleMobileNav();
    ShowHideNav();
    formCheck();
    tocPos();

} );

// Close modal if ESC is pressed
$( document ).keyup( function( e ) {
    e.keyCode === 27 ? removeModal() : null;
} );

function tocPos () {
    var chapter = {};
    var threshold = 100;

    $( ".toc a" ).each( function( index, item ) {
        var id = $( item ).attr( "href" ).substring( 1 );
        var href = $( ".toc a" ).eq( index + 1 ).attr( "href" );
        chapter[ id ] = href ? $( href ).offset().top : null;
    } );

    $( document ).scroll( function() {
        var scrollTop = $( this ).scrollTop();
        if ( scrollTop >= 120 ) {
            $( ".toc" ).addClass( "fixed" );
        } else {
            $( ".toc" ).removeClass( "fixed" );
        }

        for ( var key in chapter ) {
            if ( chapter[ key ] >= ( scrollTop + threshold ) || chapter[ key ] === null ) {
                break;
            }
        }

        var el = $( "#markdown-toc a[href='#" + key + "']" );
        if ( !el.hasClass( "active" ) ) {
            $( "#markdown-toc a" ).removeClass( "active" );
            el.addClass( "active" );
        }
    } );
}

// Toggle Mobile Navigation
function toggleMobileNav() {
    $( ".header__toggle" ).click( function() {
        if ( $( ".header__links" ).hasClass( "js--open" ) ) {
            $( ".header__toggle" ).removeClass( "--open" );
            $( ".header__links" ).removeClass( "js--open" );
            $( "#categories__slide" ).removeClass( "is-visible" );
            $( "#categories__slide" ).addClass( "hide-visible" );
        }
        else {
            $( ".header__toggle" ).addClass( "--open" );
            $( ".header__links" ).addClass( "js--open" );
            $( "#categories__slide" ).addClass( "is-visible" );
            $( "#categories__slide" ).removeClass( "hide-visible" );
        }
    } );
}

// SHOW/HIDE NAV
function ShowHideNav() {
    var previousScroll = 0, // previous scroll position
        $header = $( ".header" ), // just storing header in a variable
        navHeight = $header.outerHeight(), // nav height
        detachPoint = 576 + 60, // after scroll past this nav will be hidden
        hideShowOffset = 6; // scroll value after which nav will be shown/hidden

    $( window ).scroll( function() {
        var wW = 1024;
        // if window width is more than 1024px start show/hide nav
        if ( $( window ).width() >= wW ) {
            if ( !$header.hasClass( "fixed" ) ) {
                var currentScroll = $( this ).scrollTop(),
                    scrollDifference = Math.abs( currentScroll - previousScroll );

                // if scrolled past nav
                if ( currentScroll > navHeight ) {

                    // if scrolled past detach point -> show nav
                    if ( currentScroll > detachPoint ) {
                        if ( !$header.hasClass( "fix-nav" ) ) {
                            $header.addClass( "fix-nav" );
                        }
                    }

                    if ( scrollDifference >= hideShowOffset ) {
                        if ( currentScroll > previousScroll ) {

                            // scroll down -> hide nav
                            if ( !$header.hasClass( "hide-nav" ) ) {
                                $header.addClass( "hide-nav" );
}
                        } else {

                            // scroll up -> show nav
                            if ( $header.hasClass( "hide-nav" ) ) {
                                $( $header ).removeClass( "hide-nav" );
                            }
                        }
                    }
                }
                else {
                    // at the top
                    if ( currentScroll <= 0 ) {
                        $header.removeClass( "hide-nav show-nav" );
                        $header.addClass( "top" );
                    }
                }
            }

            // scrolled to the bottom -> show nav
            if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) {
                $header.removeClass( "hide-nav" );
            }
            previousScroll = currentScroll;
        }

        // if window width is less than 1024px fix nav
        else {
            $header.addClass( "fix-nav" );
        }
    } );
}


function openModal() {
    $( "body" ).css( "overflow", "hidden" );
    $( ".modal, .modal__overlay" ).show().css( "display", "flex" );
    $( ".modal__inner" ).velocity( { translateY: 0, opacity: 1 } );
    $( ".modal__overlay" ).velocity( { opacity: 1 }, 100 );
}

function removeModal() {
    $( "body" ).css( { "overflow": "visible" } );
    $( ".modal, .modal__overlay, .modal__inner" ).velocity( { opacity: 0 }, function() {
        $( ".modal" ).css( { opacity: 1 } );
        $( ".modal__inner" ).css( {
            "-webkit-transform": "translateY(200px)",
            "-ms-transform": "translateY(200px)",
            transform: "translateY(200px)"
        } );
        $( ".modal, .modal__overlay" ).hide();
        $( ".modal__body" ).empty();
    } );
}

$( ".js-modal-close" ).click( function() {
    removeModal();
} );

$( ".modal__overlay" ).click( function() {
    removeModal();
} );

// Contact Form Validation
function formCheck() {
    $( ".js-submit" ).click( function( e ) {

        e.preventDefault();

        var $inputs = $( ".form__input input" );
        var textarea = $( ".form__input textarea" );
        var isError = false;

        $( ".form__input" ).removeClass( "error" );
        $( ".error-data" ).remove();

        for ( var i = 0; i < $inputs.length; i++ ) {
            var input = $inputs[ i ];
            if ( $( input ).attr( "required", true ) && !validateRequired( $( input ).val() ) ) {

                addErrorData( $( input ), "This field is required" );

                isError = true;
            }
            if ( $( input ).attr( "required", true ) && $( input ).attr( "type" ) === "email" && !validateEmail( $( input ).val() ) ) {
                addErrorData( $( input ), "Email address is invalid" );
                isError = true;
            }
            if ( $( textarea ).attr( "required", true ) && !validateRequired( $( textarea ).val() ) ) {
                addErrorData( $( textarea ), "This field is required" );
                isError = true;
            }
        }
        if ( isError === false ) {
            $( "#contactForm" ).submit();
        }
    } );
}

// Validate if the input is not empty
function validateRequired( value ) {
    if ( value === "" ) {
return false;
}
    return true;
}

// Validate if the email is using correct format
function validateEmail( value ) {
    if ( value !== "" ) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test( value );
    }
    return true;
}

// Add error message to the input
function addErrorData( element, error ) {
    element.parent().addClass( "error" );
    element.after( "<span class='error-data'>" + error + "</span>" );
}

// AJAX Form submit
$( "#contactForm" ).submit( function( e ) {

    e.preventDefault();

    var $btn = $( ".js-submit" ),
        $inputs = $( ".form__input input" ),
        $textarea = $( ".form__input textarea" ),
        $name = $( "input#name" ).val();

    $.ajax( {

        // Change the email address here:
        url: "https://formspree.io/jan.czizikow@Fmail.com",
        method: "POST",
        data: $( this ).serialize(),
        dataType: "json",

        beforeSend: function() {
            $btn.prop( "disabled", true );
            $btn.text( "Sending..." );
        },
        success: function() {
            $inputs.val( "" );
            $textarea.val( "" );
            $btn.prop( "disabled", false );
            $btn.text( "Send" );
            openModal();
            $( ".modal__body" ).append( "<h1>Thanks " + $name + "!</h1><p>Your message was successfully sent! Will get back to you soon.</p>" );

        },
        error: function( err ) {
            $( ".modal, .modal__overlay" ).addClass( "--show" );
            $( ".modal__body" ).append( "<h1>Aww snap!</h1><p>Something went wrong, please try again. Error message:</p>" + err );
        }
    } );
} );
