(function ($, window, document) {

  // Globals
  var pluginName = 'calendar',
    pl = null,
    d = new Date();

  month_array = [
    'Jan  ',
    'Feb  ',
    'March',
    'April',
    'May  ',
    'June ',
    'July ',
    'Aug  ',
    'Sep  ',
    'Oct  ',
    'Nov  ',
    'Dec  '
  ];

  month_days = [
    '31', // jan
    '28', // feb
    '31', // mar
    '30', // apr
    '31', // may
    '30', // june
    '31', // july
    '31', // aug
    '30', // sept
    '31', // oct
    '30', // nov
    '31' // dec
  ];


  $.widget("bwtw.calendar", {
    options: {
      year: d.getFullYear(),
      today: d.getDate(),
      month: d.getMonth(),
      current_year: d.getFullYear(),
      tipsy_gravity: 's',
      show_future: false,
      show_one_month: false,
      scroll_to_date: true,
      scroll_speed: 800,
      group_week: true
    },

    data: {
    
    },

    _create: function () {
      this.refresh();

      // Previous / Next Year on click events
      $(document).on('click', '#year-arrows > .next', $.proxy(function (e) {
        if ($(e.currentTarget).hasClass('disabled') === false){
           this._year_next();
        }
      }, this));

      $(document).on('click', '#year-arrows > .prev', $.proxy(function (e) {
        this._year_prev();
      }, this));

      // Previous / Next Month on click events
      $(document).on('click', '#month-arrows > .next', $.proxy(function (e) {
        if ($(e.currentTarget).hasClass('disabled') === false){
          this._month_next();
        }
      }, this));

      $(document).on('click', '#month-arrows > .prev', $.proxy(function (e) {
        this._month_prev();
      }, this));

    },
    _setOption: function (key, value) {
      if (key === "value") {
        value = this._constrain(value);
      }
      this._super(key, value);
    },
    _setOptions: function (options) {
      this._super(options);
      this.refresh();
    },
    refresh: function () {

      // Pass in any year you damn like.
      var the_year = parseInt(this.options.year, '');

      // First, clear the element
      $(this.element).empty();

      // Append parent div to the element
      $(this.element).append('<div id=\"calendar\"></div>');

      // Set reference for calendar DOM object
      var $_calendar = $('#calendar');
      // Navigation year-arrows
      $_calendar.append('<div id=\"year-arrows\"></div>');

      // DOM object reference for year-arrows
      $_yeararrows = $('#year-arrows');
      $_yeararrows.append('<div class=\"prev\"></div>');
      $_yeararrows.append('<div class=\"next\"></div>');
      if (this.options.show_future === false && the_year >= d.getFullYear()){
        $_yeararrows.children().last().addClass("disabled");
      }

      // Let's append the year
      $.each(the_year.toString().split(''), function (i, o) {
        $_calendar.append('<div class=\"year\">' + o + '</div>');
      });

      $_calendar.append('<div class=\"year\">&nbsp;</div>');

      // Add a clear for the floated elements
      $_calendar.append('<div class=\"clear\"></div>');

      // Loop over the month arrays, loop over the characters in teh string, and apply to divs.

      // Create a scrollto marker
      $_calendar.append("<div id='" + month_name + "'></div>");

      var from_month, to_month;

      if (this.options.show_one_month === true) {
        // Navigation month-arrows
        $_calendar.append('<div id=\"month-arrows\"></div>');
        // DOM object reference for month-arrows
        $_montharrows = $('#month-arrows');
        $_montharrows.append('<div class=\"prev\"></div>');
        $_montharrows.append('<div class=\"next\"></div>');

        to_month = from_month = this.options.month;
      

        if (this.options.show_future === false && the_year >= d.getFullYear() && this.options.month === d.getMonth()){
          $_montharrows.children().last().addClass("disabled");
        }

      } else {
        from_month = 0;
        to_month = 11;
        if (this.options.show_future === false && the_year >= d.getFullYear()){
          to_month = d.getMonth();
        }
      }
      

      for (the_month = from_month; the_month <= to_month; the_month++) {
        var month_name = month_array[the_month];
        // Create a scrollto marker
        $_calendar.append("<div id='" + month_name + "'></div>");
        $.each(month_name.split(''), function (i, o) {
          // Looping over characters, apply them to divs
          $_calendar.append('<div class=\"label title\">' + o + '</div>');
        });

        // Add a clear for the floated elements
        $_calendar.append('<div class=\"clear\"></div>');

        // Check for leap year
        if (month_name === 'February') {
          if (this._isLeap(the_year)) {
            month_days[the_month] = 29;
          } else {
            month_days[the_month] = 28;
          }
        }

        for (j = 1; j <= parseInt(month_days[the_month], ''); j++) {

          // Check for today
          var today = '';
          if (the_month === d.getMonth() && the_year === d.getFullYear()) {
            if (j === this.options.today) {
              today = 'today';
            }
          }

          // Check if future
          var future = '';
          if (this.options.show_future === false && j - 1 >= d.getDate() && the_month >= d.getMonth() && the_year >= d.getFullYear()) {
            future = 'future';
          }

          // Check if weekend
          var dt = new Date(the_year, the_month + 1, j);
          var weekend = '';
          if (dt.getDay() === 6 || dt.getDay() === 0) {
            weekend = 'weekend';
          }

          // Check if start of month needs padded or end of week needs a new line
          if (this.options.group_week) {
            var day = dt.getDay();
            if (j === 1) {
              var pads = (day === 0 ? 6 : day - 1);

              for (p = 1; p <= pads; p++) {
                $_calendar.append("<a class='label day blank " + (p > 5 ? 'weekend' : '') + "'> &nbsp; </a>");
              }
            }

            // If Monday, include new line
            if (day === 1 && j > 1) {
              $_calendar.append('<div class=\"clear\"></div>');
            }
          }

          // Looping over numbers, apply them to divs
          $_calendar.append("<a href='#' data-date='" + 
                              dt.toString('MM-dd-yyyy') + 
                              "' class='label day " + 
                              today + " " + weekend + " " + 
                              future + "'>" + j + '</a>');
          
        }

        // Add a clear for the floated elements
        $_calendar.append('<div class=\"clear\"></div>');

      }

      // Loop over the elements and add data and events.
      for (k = 0; k < $('.label').length; k++) {
        var el = $($('.label')[k]);
        // Set titles for tipsy once in DOM
        if (el.hasClass('future') === false){
          el.attr('original-title', this._returnFormattedDate(el.attr('data-date')));
        }
        
        if (!(el.hasClass('disabled') || el.hasClass('title') || el.hasClass('blank') ))
        {
          el.on('click', $.proxy( function (e) {
            e.preventDefault(); // prevent page scrolling

            if (!($(e.currentTarget).hasClass('future')))
            {
              var d = $(e.currentTarget).attr('data-date').split("/");
              var dObj = {};
              dObj.day = d[1];
              dObj.month = d[0];
              dObj.year = d[2];
              this._trigger(':dateclicked', e, {date: dObj, target: e.currentTarget});
            }

          }, this)); // on click
        }
      }



      // Scroll to month
      if (the_year === this.options.current_year && this.options.scroll_to_date) {
        var el = $(this.element).css('overflow-y') === 'scroll' ? this.element : window;
        $(el).scrollTo($('#' + month_array[this.options.month]), this.options.scroll_speed);
      }

      // Tipsy
      $('.label').tipsy({
        gravity: this.options.tipsy_gravity
      });
      
    },

    _returnFormattedDate: function (value) {
      var returned_date;
      var d = new Date(value);
      var da = d.getDay();

      if (da === 1) {
        returned_date = 'Monday';
      } else if (da === 2) {
        returned_date = 'Tuesday';
      } else if (da === 3) {
        returned_date = 'Wednesday';
      } else if (da === 4) {
        returned_date = 'Thursday';
      } else if (da === 5) {
        returned_date = 'Friday';
      } else if (da === 6) {
        returned_date = 'Saturday';
      } else if (da === 0) {
        returned_date = 'Sunday';
      }

      return returned_date;
    },

    _isLeap: function (year) {
      var leap = 0;
      leap = new Date(year, 1, 29).getMonth() == 1;
      return leap;
    },


    // Update calendar to show previous month
    _month_next: function() {

      var m = parseInt(this.options.month) + 1;
      var y = this.options.year;
      if (m == 12) {
        m = 0; 
        y++;
      }

      this._setOptions ({
                          'year': y,
                          'month': m,
                          'scroll_to_date': false
                       });
    },

                 
    // Update calendar to show next month
    _month_prev: function() {

      var m = parseInt(this.options.month) - 1;
      var y = this.options.year; 
      if (m == -1){
        m = 11;
        y--;
      }

      this._setOptions ({
                          'year': y,
                          'month': m,
                          'scroll_to_date': false
                       });
    },


    // Update calendar to show next year
    _year_next: function() {
      var y = parseInt(this.options.year) + 1;
      var m = this.options.month; 
      if (this.options.show_future === false 
          && this.options.year < d.getFullYear() 
          && this.options.month > d.getMonth())
        m = d.getMonth();

      this._setOptions ({
                          'year': y,
                          'month': m,
                          'scroll_to_date': false
                       });
            
    },

    // Update calendar to show previous year
    _year_prev: function() {

      this._setOptions ({
                          'year': parseInt(this.options.year) - 1   
                        });

    },



    _destroy: function () {
      this.element
        .text("");
    }
  });


  

})(jQuery, window, document);
