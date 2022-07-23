//< " ПОДКЛЮЧЕНИЕ JS КОМПОНЕНТОВ " >=============================================================================================================>//
function dynamicAdaptive() {
	function DynamicAdapt(type) {
		this.type = type;
	}

	DynamicAdapt.prototype.init = function () {
		const _this = this;
		this.оbjects = [];
		this.daClassname = "_dynamic_adapt_";
		this.nodes = document.querySelectorAll("[data-da]");

		for (let i = 0; i < this.nodes.length; i++) {
			const node = this.nodes[i];
			const data = node.dataset.da.trim();
			const dataArray = data.split(",");
			const оbject = {};
			оbject.element = node;
			оbject.parent = node.parentNode;
			оbject.destination = document.querySelector(dataArray[0].trim());
			оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
			оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.оbjects.push(оbject);
		}

		this.arraySort(this.оbjects);

		this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
			return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
		}, this);
		this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
			return Array.prototype.indexOf.call(self, item) === index;
		});

		for (let i = 0; i < this.mediaQueries.length; i++) {
			const media = this.mediaQueries[i];
			const mediaSplit = String.prototype.split.call(media, ',');
			const matchMedia = window.matchMedia(mediaSplit[0]);
			const mediaBreakpoint = mediaSplit[1];

			const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
				return item.breakpoint === mediaBreakpoint;
			});
			matchMedia.addListener(function () {
				_this.mediaHandler(matchMedia, оbjectsFilter);
			});
			this.mediaHandler(matchMedia, оbjectsFilter);
		}
	};

	DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
		if (matchMedia.matches) {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				оbject.index = this.indexInParent(оbject.parent, оbject.element);
				this.moveTo(оbject.place, оbject.element, оbject.destination);
			}
		} else {
			for (let i = 0; i < оbjects.length; i++) {
				const оbject = оbjects[i];
				if (оbject.element.classList.contains(this.daClassname)) {
					this.moveBack(оbject.parent, оbject.element, оbject.index);
				}
			}
		}
	};

	DynamicAdapt.prototype.moveTo = function (place, element, destination) {
		element.classList.add(this.daClassname);
		if (place === 'last' || place >= destination.children.length) {
			destination.insertAdjacentElement('beforeend', element);
			return;
		}
		if (place === 'first') {
			destination.insertAdjacentElement('afterbegin', element);
			return;
		}
		destination.children[place].insertAdjacentElement('beforebegin', element);
	}

	DynamicAdapt.prototype.moveBack = function (parent, element, index) {
		element.classList.remove(this.daClassname);
		if (parent.children[index] !== undefined) {
			parent.children[index].insertAdjacentElement('beforebegin', element);
		} else {
			parent.insertAdjacentElement('beforeend', element);
		}
	}

	DynamicAdapt.prototype.indexInParent = function (parent, element) {
		const array = Array.prototype.slice.call(parent.children);
		return Array.prototype.indexOf.call(array, element);
	};

	DynamicAdapt.prototype.arraySort = function (arr) {
		if (this.type === "min") {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return -1;
					}

					if (a.place === "last" || b.place === "first") {
						return 1;
					}

					return a.place - b.place;
				}

				return a.breakpoint - b.breakpoint;
			});
		} else {
			Array.prototype.sort.call(arr, function (a, b) {
				if (a.breakpoint === b.breakpoint) {
					if (a.place === b.place) {
						return 0;
					}

					if (a.place === "first" || b.place === "last") {
						return 1;
					}

					if (a.place === "last" || b.place === "first") {
						return -1;
					}

					return b.place - a.place;
				}

				return b.breakpoint - a.breakpoint;
			});
			return;
		}
	};

	const da = new DynamicAdapt("max");
	da.init();

}
dynamicAdaptive(); // ДИНАМИЧЕСКИЙ АДАПТИВ

/* function scrollHeader() {
	const header = document.querySelector('.header');

	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			header.classList.remove('_scroll');
		} else {
			header.classList.add('_scroll');
		}
	};

	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(header);
}
scrollHeader(); // ДОБАВЛЕНИЕ ХЕДЕРУ КЛАСС ПРИ СКРОЛЛЕ */

/* new Swiper(".swiper", {
	slidesPerView: 1,
	spaceBetween: 15,
	grabCursor: true,
	loop: true,
	speed: 800,

	autoplay: {
		delay: 3500,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		767.8: {},
	}
});

; // НАСТРОЙКИ СЛАЙДЕРА */

//< " СКРИПТЫ " >=============================================================================================================>//

let isMobile = {
	Android: function () { return navigator.userAgent.match(/Android/i); },
	BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
	iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
	Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
	Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
	any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};

if (isMobile.any()) {
	document.body.classList.add("_touch");
} else {
	document.body.classList.add("_pc");
}

//< " СКРИПТЫ " >=============================================================================================================>//

function actionsHeader() {

	function burgerHeader() {
		const menuBtn = document.querySelector(".header__burger");
		const menuBody = document.querySelector(".header-menu");

		if (menuBtn && menuBody) {
			menuBtn.addEventListener("click", function () {
				menuBtn.classList.toggle("_active");
				menuBody.classList.toggle("_active");
				document.body.classList.toggle("_lock-scroll");
			});

			const dropdownBtn = document.querySelector(".header-dropdown__btn");

			if (dropdownBtn) {
				dropdownBtn.addEventListener("click", function () {
					menuBtn.classList.remove("_active");
					menuBody.classList.remove("_active");
					document.body.classList.remove("_lock-scroll");
				})
			}
		}
	}
	burgerHeader()

	function dropdownHeader() {
		const dropdownBtn = document.querySelector(".header-dropdown__btn");
		const dropdownBody = document.querySelector(".header-dropdown__body");

		if (dropdownBtn && dropdownBody) {
			dropdownBtn.addEventListener("click", function () {
				dropdownBody.classList.toggle("_active");
			});

			document.addEventListener("click", function (e) {
				const elementTarget = e.target;

				if (!elementTarget.closest(".header-dropdown")) {
					dropdownBody.classList.remove("_active");
				}
			});
		}
	}
	dropdownHeader()

}
actionsHeader()

//< " СКРИПТЫ " >=============================================================================================================>//

function actionsMainBlock() {
	const searchSend = document.querySelector(".main-block-search__btn");

	function formValid() {
		const itemInpt = document.querySelectorAll(".main-block__input");

		if (itemInpt) {
			itemInpt.forEach(inpt => {
				inpt.addEventListener("input", function () {
					if (inpt.value.length) {
						searchSend.removeAttribute("disabled");
					} else {
						searchSend.setAttribute("disabled", "disabled");
					}
				});
			});
		}
	}
	formValid()

	function mainSwitch() {
		const optionsSwitch = document.querySelector('.main-block-show__checkbox');
		const optionsContent = document.querySelector(".main-block-options");

		if (optionsSwitch && optionsContent) {
			optionsSwitch.addEventListener('change', function () {
				if (optionsSwitch.checked) {
					optionsContent.style.display = "flex";
					document.querySelector(".main-block-options__body").append(searchSend);
				} else {
					optionsContent.style.display = "none";
					document.querySelector(".main-block-search__inner").append(searchSend);
				}
			});
		}
	}
	mainSwitch()

	function mainForm() {
		const form = document.getElementById("main-block__form");

		if (form) {
			form.addEventListener("submit", function (e) {
				document.querySelector(".info-block").style.display = "none";
				document.querySelector(".catalog").style.display = "block";

				e.preventDefault();
			});
		}
	}
	mainForm()

	function mySelect() {
		const itemSelect = document.querySelectorAll("[data-select]");

		if (itemSelect) {
			function showSelect() {
				itemSelect.forEach(select => {
					select.addEventListener("click", function (e) {
						const elementTarget = e.target;

						if (elementTarget.closest(".select__btn")) {
							elementTarget.closest(".select").querySelector(".select__inner").classList.toggle("_active");
							elementTarget.closest(".select").querySelector(".select__btn").classList.toggle("_active");
						}
					});

					function selected() {
						const listItem = document.querySelectorAll(".options-select__item");

						if (listItem) {
							listItem.forEach(item => {
								item.addEventListener("click", function () {
									if (!item.classList.contains("_active")) {
										this.classList.add("_active");

										document.querySelector(".options-select__selected").append(this.cloneNode(true));
										document.querySelector(".options-select__selected .options-select__item").className = "options-select__item options-select__item_remove";

										function removeSelected() {
											const removeBtn = document.querySelectorAll(".options-select__item_remove");

											removeBtn.forEach(remove => {
												remove.addEventListener("click", function () {
													this.remove();
												});
											});
										}
										removeSelected()
									} else {
										this.classList.remove("_active");
										document.querySelector(".options-select__selected .options-select__item").remove();
									}

									if (document.querySelector(".options-select__selected").length > 1) {
										document.querySelector(".options-select__selected-text").style.display = "none";
									} else {
										document.querySelector(".options-select__selected-text").style.display = "block";
									}
								});
							});
						}
					}
					selected()
				});
			}
			showSelect()
		}
	}
	mySelect()

}
actionsMainBlock()
