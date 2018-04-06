jQuery(document).ready(function() {

	// Sidenav

	$('.sidenav').sidenav();

	// Dropdown

	$('.dropdown-trigger').dropdown();

	// Datepicker

	$('.datepicker').datepicker();

	$('.dropdown-trigger + .dropdown-content').on('click', function(event) {
		event.stopPropagation();
	});

	// Datapicker init

	// $('.datepicker').pickadate({
	// 	selectMonths: true, // Creates a dropdown to control month
	// 	selectYears: 15, // Creates a dropdown of 15 years to control year,
	// 	today: 'Сегодня',
	// 	clear: 'Отменить',
	// 	close: 'ок',
	// 	closeOnSelect: false,
	// 	monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
	// 	monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Ию', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
	// 	weekdays: ['Воскресенье', 'Понидельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	// 	weekdaysShort: ['Вс', 'Пон', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
	// });




	// Select

	$('select').formSelect();

});
