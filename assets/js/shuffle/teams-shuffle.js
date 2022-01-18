'use strict';

var Shuffle = window.Shuffle;

var TeamShuffle = function (element) {
    this.members = Array.from(document.querySelectorAll('.filter-members li'));
    this.shuffle = new Shuffle(element, {
        easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
        sizer: '.the-sizer',
    });

    this.filters = {
        members: [],
    };
    this._bindEventListeners();
    this.__reset()
};
/**
 * Reset All
 */
TeamShuffle.prototype.__reset = function () {
    let element = document.querySelector('.filter-members li.all-members');
    let that = this;
    element.addEventListener('click', function () {
        that.shuffle.filter(Shuffle.ALL_ITEMS);
    });
};


/**
 * Bind event listeners for when the filters change.
 */
TeamShuffle.prototype._bindEventListeners = function () {
    this._onmemberChange = this._handleMembersChange.bind(this);
    this.members.forEach(function (input) {
        input.addEventListener('click', this._onmemberChange);
    }, this);
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
TeamShuffle.prototype._getCurrentMemberFilters = function () {
    return this.members.filter(function (button) {
        return button.classList.contains('active');
    }).map(function (button) {
        return button.getAttribute('data-value');
    });
};


/**
 * Handle member change function
 * @param {*} event 
 */
TeamShuffle.prototype._handleMembersChange = function (event) {
    var element = event.currentTarget;
    let value = element.getAttribute('data-value');

    // only 1 can be selected.
    if (element.classList.contains('active') && value !== 'all') {
        element.classList.remove('active');
    } else {
        this.members.forEach(function (btn) {
            btn.classList.remove('active');
        });
        element.classList.add('active');
    }
    this.filters.members = this._getCurrentMemberFilters();
    this.filter();
}



/**
 * Filter shuffle based on the current state of filters.
 */
TeamShuffle.prototype.filter = function () {
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
TeamShuffle.prototype.hasActiveFilters = function () {
    return Object.keys(this.filters).some(function (key) {
        return this.filters[key].length > 0;
    }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
TeamShuffle.prototype.itemPassesFilters = function (element) {
    var members = this.filters.members;
    var member = element.getAttribute('data-category');
    // If there are active search-item filters and this prefs is not in that array.
    if (members.length > 0 && !members.includes(member)) {
        return false;
    }
    return true;
};


document.addEventListener('DOMContentLoaded', function () {
    window.teamShuffle = new TeamShuffle(document.querySelector('.js-shuffle'));
});
