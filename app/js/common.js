jQuery(document).ready(function() {

	// Sidenav init

	$('.button-collapse').sideNav({
		menuWidth: 300, // Default is 300
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
		draggable: true, // Choose whether you can drag to open on touch screens,
		onOpen: function(el) {}
	});

	// Datapicker init

	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15, // Creates a dropdown of 15 years to control year,
		today: 'Сегодня',
		clear: 'Отменить',
		close: 'ок',
		closeOnSelect: false,
		monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Ию', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
		weekdays: ['Воскресенье', 'Понидельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		weekdaysShort: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	});

	$('.dropdown-button + .dropdown-content').on('click', function(event) {
		event.stopPropagation();
	});


	// Select

	$('select').material_select();

	/* Wow */

	new WOW().init();

	/* Phone input mask */

	$(".phone").mask("+380 999 999 999");

	/* Scroll */

	$('a[href*=#]').bind("click", function(e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top
		}, 1000);
		e.preventDefault();
	});
	return false;

});

// Fixed plus button init

var elem = document.querySelector('.fixed-action-btn');
var instance = M.FloatingActionButton.init(elem, options);
