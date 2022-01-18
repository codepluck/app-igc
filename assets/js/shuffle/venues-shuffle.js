'use strict';

var Shuffle = window.Shuffle;

var VenueShuffle = function (element) {
    this.guestCount = Array.from(document.querySelectorAll('.filter-count input'));
    this.style = Array.from(document.querySelectorAll('.filter-style input'));
    this.locations = Array.from(document.querySelectorAll('.filter-location input'));
    this.events = Array.from(document.querySelectorAll('.filter-events input'));
    this.pref = Array.from(document.querySelectorAll('.filter-pref input'));
    this.element = element;
    this.shuffle = new Shuffle(element, {
        easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)', // easeOutQuart
        sizer: '.the-sizer',
    });

    this.filters = {
        guestCount: [],
        style: [],
        locations: [],
        events: [],
        pref: [],
    };
    this.elements = [
        this.guestCount,
        this.style,
        this.locations,
        this.events,
        this.pref,
    ];
    this._bindEventListeners();
    this.resetFilter();
};

/**
 * Bind event listeners for when the filters change.
 */
VenueShuffle.prototype._bindEventListeners = function () {
    this._onguestCountChange = this._handleGuestCountChange.bind(this);
    this._onstyleChange = this._handleStyleChange.bind(this);
    this._onlocationsChange = this._handleLocationsChange.bind(this);
    this._oneventsChange = this._handleEventsChange.bind(this);
    this._oneventsPref = this._handleEventsPrefChange.bind(this);

    this.guestCount.forEach(function (input) {
        input.addEventListener('change', this._onguestCountChange);
    }, this);


    this.style.forEach(function (input) {
        input.addEventListener('change', this._onstyleChange);
    }, this);


    this.locations.forEach(function (input) {
        input.addEventListener('change', this._onlocationsChange);
    }, this);

    this.events.forEach(function (input) {
        input.addEventListener('change', this._oneventsChange);
    }, this);

    this.pref.forEach(function (input) {
        input.addEventListener('change', this._oneventsPref);
    }, this);
};

/**
 * Get the values of each `active` button.
 * @return {Array.<string>}
 */
VenueShuffle.prototype._getCurrentGuestCountFilters = function () {
    return this.guestCount.filter(function (button) {
        return button.checked;
    }).map(function (button) {
        return button.value;
    });
};

VenueShuffle.prototype._handleGuestCountChange = function (event) {
    var element = event.currentTarget;
    // only 1 can be selected.
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    } else {
        this.guestCount.forEach(function (el) {
            el.classList.remove('active');
        });

        element.classList.add('active');
    }
    this.filters.guestCount = this._getCurrentGuestCountFilters();
    this.filter();
}



/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
VenueShuffle.prototype._getCurrentLocationFilters = function () {
    return this.locations.filter(function (input) {
        return input.checked;
    }).map(function (input) {
        return input.value;
    });
};

/**
 * A location input check state changed, update the current filters and filte.r
 */
VenueShuffle.prototype._handleLocationsChange = function (event) {
    this.filters.locations = this._getCurrentLocationFilters();
    this.filter();

}


/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
VenueShuffle.prototype._getCurrentStyleFilters = function () {
    return this.style.filter(function (input) {
        return input.checked;
    }).map(function (input) {
        return input.value;
    });
};

/**
 * A style input check state changed, update the current filters and filte.r
 */
VenueShuffle.prototype._handleStyleChange = function (event) {
    this.filters.style = this._getCurrentStyleFilters();
    this.filter();

}



/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
VenueShuffle.prototype._getCurrentEventsFilters = function () {
    return this.events.filter(function (input) {
        return input.checked;
    }).map(function (input) {
        return input.value;
    });
};

/**
 * A event input check state changed, update the current filters and filte.r
 */
VenueShuffle.prototype._handleEventsChange = function () {
    this.filters.events = this._getCurrentEventsFilters();
    this.filter();
};




/**
 * Get the values of each checked input.
 * @return {Array.<string>}
 */
VenueShuffle.prototype._getCurrentPrefFilters = function () {
    return this.pref.filter(function (input) {
        return input.checked;
    }).map(function (input) {
        return input.value;
    });
};

/**
 * A event input check state changed, update the current filters and filte.r
 */
VenueShuffle.prototype._handleEventsPrefChange = function () {
    this.filters.pref = this._getCurrentPrefFilters();
    this.filter();
};



/**
 * Filter shuffle based on the current state of filters.
 */
VenueShuffle.prototype.filter = function () {
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
VenueShuffle.prototype.hasActiveFilters = function () {
    return Object.keys(this.filters).some(function (key) {
        return this.filters[key].length > 0;
    }, this);
};

/**
 * Determine whether an element passes the current filters.
 * @param {Element} element Element to test.
 * @return {boolean} Whether it satisfies all current filters.
 */
VenueShuffle.prototype.itemPassesFilters = function (element) {
    var guests = this.filters.guestCount;
    var styles = this.filters.style;
    var locations = this.filters.locations;
    var events = this.filters.events;
    var prefs = this.filters.pref;

    var guest = element.getAttribute('data-guest');
    var style = element.getAttribute('data-style');
    var location = element.getAttribute('data-location');
    var event = element.getAttribute('data-event');
    var pref = element.getAttribute('data-pref');

    // If there are active search-item filters and this prefs is not in that array.
    if (prefs.length > 0 && !prefs.includes(pref)) {
        return false;
    }


    // If there are active search-item filters and this style is not in that array.
    if (styles.length > 0 && !styles.includes(style)) {
        return false;
    }


    // If there are active search-item filters and this event is not in that array.
    if (events.length > 0 && !events.includes(event)) {
        return false;
    }

    // If there are active search-item filters and this location is not in that array.
    if (locations.length > 0 && !locations.includes(location)) {
        return false;
    }

    // If there are active guest filters and this guest is not in that array.
    if (guests.length > 0 && !guests.includes(guest)) {
        return false;
    }
    return true;
};


/**
 * Reset the list
 * @param {*} el 
 */
VenueShuffle.prototype.resetFilter = function (el) {
    let element = document.getElementById("clear-filter");
    let that = this;
    element.addEventListener('click', function () {
        Object.values(that.elements).map(function (element, index) {
            Object.values(element).map((el) => {
                if (el.checked) {
                    return el.checked = false;
                }
            })
        });
        that.shuffle.filter(Shuffle.ALL_ITEMS);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    window.venueShuffle = new VenueShuffle(document.querySelector('.js-shuffle'));
});
