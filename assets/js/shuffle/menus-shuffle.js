'use strict';

var Shuffle = window.Shuffle;

var MenuShuffle = function (element) {
    this.menus = Array.from(document.querySelectorAll('.filter-menus li'));
    this.shuffle = new Shuffle(element, {
        easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
        sizer: '.the-sizer',
    });

    this.filters = {
        menus: [],
    };
    this._bindEventListeners();
};

/**
 * Bind event listeners for when the filters change.
 */
MenuShuffle.prototype._bindEventListeners = function () {
    this._onmenuChange = this._handleMenusChange.bind(this);
    this.menus.forEach(function (input) {
        input.addEventListener('click', this._onmenuChange);
    }, this);
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
MenuShuffle.prototype._getCurrentMenusFilters = function () {
    return this.menus.filter(function (button) {
        return button.classList.contains('active');
    }).map(function (button) {
        return button.getAttribute('data-value');
    });
};


/**
 * Handle member change function
 * @param {*} event 
 */
MenuShuffle.prototype._handleMenusChange = function (event) {
    var element = event.currentTarget;
    // only 1 can be selected.
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        this.menus.forEach(function (btn) {
            btn.classList.remove('active');
        });

        element.classList.add('active');
    }
    this.filters.menus = this._getCurrentMenusFilters();
    this.filter();
}



/**
 * Filter shuffle based on the current state of filters.
 */
MenuShuffle.prototype.filter = function () {
    if (this.hasActiveFilters()) {
        this.shuffle.filter(this.itemPassesFilters.bind(this));
    } else {
        this.shuffle.filter(Shuffle.ALL_ITEMS);
    }
};

/**
 * If any of the arrays in the `filters` property have a length of more than zero,
 * that means there is an active filter.
 * @return {boolean}
 */
MenuShuffle.prototype.hasActiveFilters = function () {
    return Object.keys(this.filters).some(function (key) {
        return this.filters[key].length > 0;
    }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
MenuShuffle.prototype.itemPassesFilters = function (element) {
    var menus = this.filters.menus;
    var menu = element.getAttribute('data-menu');
    // If there are active search-item filters and this prefs is not in that array.
    if (menus.length > 0 && !menus.includes(menu)) {
        return false;
    }
    return true;
};


document.addEventListener('DOMContentLoaded', function () {
    window.demo = new MenuShuffle(document.querySelector('.js-shuffle'));
});
