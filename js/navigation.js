/**
 * jQuery Navigation Plugin
 * Includes responsiveMenu() and flipMenu() functions
 *
 * Copyright 2015 ThemeZee
 * Free to use under the GPLv2 and later license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Author: Thomas Weichselbaumer (themezee.com)
 *
 * @package Merlin
 */

(function($) {

	/**--------------------------------------------------------------
	# Responsive Navigation for WordPress menus
	--------------------------------------------------------------*/
	$.fn.responsiveMenu = function( options ) {

		if (options === undefined) options = {};

		/* Set Defaults */
		var defaults = {
			menuClass: "menu",
			toggleClass: "menu-toggle",
			toggleText: "",
			maxWidth: "60em"
		};

		/* Set Variables */
		var vars = $.extend({}, defaults, options),
			menuClass = vars.menuClass,
			toggleID = (vars.toggleID) ? vars.toggleID : vars.toggleClass,
			toggleClass = vars.toggleClass,
			toggleText = vars.toggleText,
			maxWidth = vars.maxWidth,
			$this = $(this),
			$menu = $('.' + menuClass);


		/*********************
		* Desktop Navigation *
		**********************/

		/* Set and reset dropdown animations based on screen size */
		if(typeof matchMedia == 'function') {
			var mq = window.matchMedia('(max-width: ' + maxWidth + ')');
			mq.addListener(widthChange);
			widthChange(mq);
		}
		function widthChange(mq) {

			if (mq.matches) {

				/* Reset desktop navigation menu dropdown animation on smaller screens */
				$menu.find( 'ul.sub-menu' ).css( { display: 'block' } );
				$menu.find( 'li ul.sub-menu' ).css( { visibility: 'visible', display: 'block' } );
				$menu.find( 'li.menu-item-has-children' ).unbind( 'mouseenter mouseleave' );

				$menu.find( 'li.menu-item-has-children ul.sub-menu' ).each( function() {
					$( this ).hide();
					$( this ).parent().find( '.submenu-dropdown-toggle' ).removeClass( 'active' );
				} );

			} else {

				/* Add dropdown animation for desktop navigation menu */
				$menu.find( 'ul.sub-menu' ).css( { display: 'none' } );
				$menu.find( 'li.menu-item-has-children' ).hover( function() {
					$( this ).find( 'ul:first' ).css( { visibility: 'visible', display: 'none' } ).slideDown( 300 );
				}, function() {
					$( this ).find( 'ul:first' ).css( { visibility: 'hidden' } );
				} );

			}

		}


		/********************
		* Mobile Navigation *
		*********************/

		/* Add Menu Toggle Button for mobile navigation */
		$this.before('<button id=\"' + toggleID + '\" class=\"' + toggleClass + '\">' + toggleText + '</button>');

		/* Add dropdown toggle for submenus on mobile navigation */
		$menu.find('li.menu-item-has-children').prepend('<span class=\"submenu-dropdown-toggle\"></span>');

		/* Add dropdown slide animation for mobile devices */
		$('#' + toggleID).on('click', function(){
			$menu.slideToggle();
			$(this).toggleClass('active');
		});

		/* Add dropdown animation for submenus on mobile navigation */
		$menu.find('li.menu-item-has-children .sub-menu').each( function () {
			$( this ).hide();
		} );
		$menu.find('.submenu-dropdown-toggle').on('click', function(){
			$(this).parent().find('ul:first').slideToggle();
			$(this).toggleClass('active');
		});

	};

	/**--------------------------------------------------------------
	# Flip between dropdown menus for Social Icons and Top Navigation
	--------------------------------------------------------------*/
	$.fn.flipMenu = function( options ) {

		if (options === undefined) options = {};

		/* Set Defaults */
		var defaults = {
			menuClass: "menu",
			flipMenuClass: "menu",
			toggleClass: "menu-toggle",
			toggleText: ""
		};

		/* Set Variables */
		var vars = $.extend({}, defaults, options),
			menuClass = vars.menuClass,
			flipMenuClass = vars.flipMenuClass,
			toggleID = (vars.toggleID) ? vars.toggleID : vars.toggleClass,
			toggleClass = vars.toggleClass,
			toggleText = vars.toggleText,
			$this = $(this),
			$menu = $('.' + menuClass),
			$flipMenu = $('.' + flipMenuClass);


		/* Add both Menu Toggle Buttons */
		$this.before('<button id=\"' + toggleID + '\" class=\"' + toggleClass + '\">' + toggleText + '</button>');

		/* Add dropdown slide animation for mobile devices */
		$('#' + toggleID).on('click', function(){
			if( $flipMenu.is(':visible') ) {
				$flipMenu.slideToggle();
				$menu.delay(400).slideToggle();
			} else {
				$menu.slideToggle();
			}
			$(this).toggleClass('active');
		});

	};


	/**--------------------------------------------------------------
	# Setup Navigation Menus
	--------------------------------------------------------------*/
	$( document ).ready( function() {

		/* Setup Main Navigation */
		$("#main-navigation").responsiveMenu({
			menuClass: "main-navigation-menu",
			toggleClass: "main-navigation-toggle",
			maxWidth: "60em"
		});

		/* Setup Top Navigation */
		$("#top-navigation").responsiveMenu({
			menuClass: "top-navigation-menu",
			toggleID: "top-navigation-toggle-tablet",
			toggleClass: "top-navigation-toggle",
			maxWidth: "65em"
		});


		/* Add flipMenu for social icons menu */
		$("#header-social-icons").flipMenu({
			menuClass: "social-icons-navigation",
			flipMenuClass: "top-navigation-menu",
			toggleClass: "social-icons-navigation-toggle"
		});

		/* Add flipMenu for top navigation */
		$("#top-navigation").flipMenu({
			menuClass: "top-navigation-menu",
			flipMenuClass: "social-icons-navigation",
			toggleID: "top-navigation-toggle-phone",
			toggleClass: "top-navigation-toggle"
		});

		/* Setup Sticky Menu for main navigation menu */
		var menu = $( '.header-main__nav' );
		var stickyNavTop = menu.offset().top;

		stickyMenu = function() {

			scrollTop = $(window).scrollTop();

			/* Add Sticky class */
			if (scrollTop > stickyNavTop) {
				menu.addClass('sticky-nav-menu');
				document.querySelector("body").classList.add("has-sticky-header");
			} else {
				menu.removeClass('sticky-nav-menu');
				document.querySelector("body").classList.remove("has-sticky-header");
			}

		}
		stickyMenu();
		$(window).scroll(function() {
			stickyMenu();
		});

	} );

}(jQuery));
