$(document).ready(function() {
	App.init();
});

window.App = {
	storage: {
		filter: null,
		datepicker: null,
		select: null,
	},
	init: function() {
		// Sidenav

		$('.sidenav').sidenav();

		// Dropdown

		$('.dropdown-trigger').dropdown({
			container: 'body',
			closeOnClick: false,
			coverTrigger: false,
		});

		$('.filter-trigger').on('click', function(e) {
			var options = {
				container: 'body',
				closeOnClick: false,
				coverTrigger: false,
			};
			App.storage.filter = M.Dropdown.init(e.currentTarget, options);
			App.storage.filter.open();
		});

		// Datepicker

		$('.datepicker').on('click', function(e) {
			var options = {
				container: 'body',
				onClose: function() {
					$('.filter-trigger').click();
				}
			};
			App.storage.datepicker = M.Datepicker.init(e.target, options);
			if (App.storage.filter !== null) {
				App.storage.filter.close();
			}
			App.storage.datepicker.open();
		});

		// Fixed action btn

		$('.fixed-action-btn').floatingActionButton();

		// Select

		// $('select').formSelect({
		// 	dropdownOptions: {
		// 		autoTrigger: false,
		// 		container: 'body',
		// 		coverTrigger: false,
		// 		closeOnClick: false,
		// 	}
		// });

		var select_opt = {
			dropdownOptions: {
				coverTrigger: false,
			}
		};
		var select_elem = $('.filter-select');
		App.storage.select = M.FormSelect.init(select_elem, select_opt);
		$('.dropdown-content .select-wrapper input.select-dropdown').removeClass('dropdown-trigger');

		$('.select-wrapper').on('click', function(e) {
			App.storage.select.dropdown.open();
			$('.filter-select').change(function() {
				App.storage.select.dropdown.close();
			});
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
	},
}