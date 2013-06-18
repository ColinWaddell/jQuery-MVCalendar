/* 
  jQuery MVCalendar
  https://github.com/ColinWaddell/jQuery-MVCalendar        

  MIT License
          
  Copyright (C) 2013 John Patrick Given, Colin Waddell

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
  documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
  permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
  COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($, window, document) {

  // Globals
  var pluginName = 'calendar',
    pl = null,
    d = new Date();

  // Defaults
  defaults = {
    d: d,
    year: d.getFullYear(),
    today: d.getDate(),
    month: d.getMonth(),
    current_year: d.getFullYear(),
    tipsy_gravity: 's',
    show_future: true,
    show_one_month: true,
    scroll_to_date: true,
    scroll_speed: 800,
    group_week: true 
  };

  month_array = [
    'January',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sept',
    'October',
    'Nov',
    'Dec'
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

  // Main Plugin Object

  function Calendar(element, options) {
    pl = this;
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;

    // Begin
    this.init();
  }

  // Init
  Calendar.prototype.init = function () {

    // Call print - who knows, maybe more will be added to the init function...
    this.render();
  }

  Calendar.prototype.render = function () {

    // Pass in any year you damn like.
    var the_year = parseInt(pl.options.year);

    // First, clear the element
    $(this.element).empty();

    $('.label').css({
      display: 'none'
    });

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
    if (pl.options.show_future === false && the_year >= d.getFullYear())
      $_yeararrows.children().last().addClass("disabled");

    // Let's append the year
    $.each(the_year.toString().split(''), function (i, o) {
      $_calendar.append('<div class=\"year\">' + o + '</div>');
    });

    // Add a clear for the floated elements
    $_calendar.append('<div class=\"clear\"></div>');

    // Loop over the month arrays, loop over the characters in teh string, and apply to divs.

    // Create a scrollto marker
    $_calendar.append("<div id='" + month_name + "'></div>");

    var from_month, to_month;

    if (pl.options.show_one_month === true)
    {
      // Navigation month-arrows
      $_calendar.append('<div id=\"month-arrows\"></div>');
      // DOM object reference for month-arrows
      $_montharrows = $('#month-arrows');
      $_montharrows.append('<div class=\"prev\"></div>');
      $_montharrows.append('<div class=\"next\"></div>');

      to_month = from_month = pl.options.month;


      if (pl.options.show_future === false && the_year >= d.getFullYear() && the_month === d.getMonth())
        $_montharrows.children().last().addClass("disabled");
    } 
    else {
      from_month = 0;
      to_month = 11;
      if (pl.options.show_future === false && the_year >= d.getFullYear())
        to_month = d.getMonth();
    }
    

    for( the_month = from_month; the_month <= to_month; the_month++){
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
        if (pl.isLeap(the_year)) {
          month_days[the_month] = 29;
        } else {
          month_days[the_month] = 28;
        }
      }

      for (j = 1; j <= parseInt(month_days[the_month]); j++) {

        // Check for today
        var today = '';
        if (the_month === d.getMonth() && the_year === d.getFullYear()) {
          if (j === pl.options.today) {
            today = 'today';
          }
        }
        
        // Check if future
        var future = '';
        if (pl.options.show_future === false && j-1 >= d.getDate() && the_month >= d.getMonth() && the_year >= d.getFullYear()) {
            future = 'future';
        }

        // Check if weekend
        var dt = new Date(the_year, the_month+1, j);
        var weekend = '';
        if (dt.getDay() == 6 || dt.getDay() == 0) {
          weekend = 'weekend';
        }

        // Check if start of month needs padded or end of week needs a new line
        if (pl.options.group_week)
        {
          var day = dt.getDay();
          if (j==1)
          {
            var pads = ( day == 0 ? 6 : day - 1 );
          
            for ( p=1; p<=pads; p++ )
            { 
              $_calendar.append("<a class='label day blank " + ( p>5 ? 'weekend' : '' ) + "'> &nbsp; </a>");
            }
          }

          // If Monday, include new line
          if ( day==1 && j>1 )
          {
            $_calendar.append('<div class=\"clear\"></div>');
          }
        }

        // Looping over numbers, apply them to divs
        $_calendar.append("<a href='#' data-date='" + dt.toString('MM-dd-yyyy') + "' class='label day " + today + " " + weekend + " " + future + "'>" + j + '</a>');
      }
    
      // Add a clear for the floated elements
      $_calendar.append('<div class=\"clear\"></div>');

    }

    // Loop over the elements and show them one by one.
    for (k = 0; k < $('.label').length; k++) {
      (function (j) {
        setTimeout(function () {

          // Fade the labels in
          $($('.label')[j]).fadeIn('fast', function () {

            // Set titles for tipsy once in DOM
            if ($(this).hasClass('future') === false)
              $(this).attr('original-title', pl.returnFormattedDate($(this).attr('data-date')));

            if ($(this).hasClass('disabled'))  
              $(this).on('click', function () {
                if (typeof pl.options.click_callback == 'function') {
                  var d = $(this).attr('data-date').split("/");
                  var dObj = {}
                  dObj.day = d[1];
                  dObj.month = d[0];
                  dObj.year = d[2];
                  pl.options.click_callback.call(this, dObj);
                }
              });
          });

        }, (k * 3));
      })(k);
    }

    // Scroll to month
    if (the_year === pl.options.current_year && pl.options.scroll_to_date) {
      var print_finished = false;
      var print_check = setInterval(function () {
        print_finished = true;
        $.each($(".label"), function () {
          if ($(this).css("display") === "none") {
            print_finished = false;
          }
        });
        if (print_finished) {
          clearInterval(print_check);
          
          var el = $(pl.element).css('overflow-y') === 'scroll' ? pl.element : window ; 
          $(el).scrollTo($('#' + month_array[pl.options.month]), pl.options.scroll_speed); 
        }
      }, 200);
    }

    // Tipsy
    $('.label').tipsy({
      gravity: pl.options.tipsy_gravity
    });
  }

  // Previous / Next Year on click events
  $(document).on('click', '#year-arrows > .next', function (e) {
    if ($(e.currentTarget).hasClass('disabled') === false)
    {
      pl.options.year = parseInt(pl.options.year) + 1;
      if (pl.options.show_future === false && pl.options.year == d.getFullYear() && pl.options.month > d.getMonth())
        pl.options.month = d.getMonth();

      pl.render();
    }
  });

  $(document).on('click', '#year-arrows > .prev', function () {
    pl.options.year = parseInt(pl.options.year) - 1;

    pl.render();
  });


  // Previous / Next Month on click events
  $(document).on('click', '#month-arrows > .next', function (e) {
    if ($(e.currentTarget).hasClass('disabled') === false)
    {
      pl.options.month = parseInt(pl.options.month) + 1;
      if (pl.options.month == 12) {
        pl.options.month = 0; 
        pl.options.year = parseInt(pl.options.year) + 1;
      }

      pl.render();
    }
  });

  $(document).on('click', '#month-arrows > .prev', function () {
    pl.options.month = parseInt(pl.options.month) - 1;
    if (pl.options.month == -1){
      pl.options.month = 11;
      pl.options.year = parseInt(pl.options.year) - 1;
    }

    pl.render();
  });


  // Simple JS function to check if leap year
  Calendar.prototype.isLeap = function (year) {
    var leap = 0;
    leap = new Date(year, 1, 29).getMonth() == 1;
    return leap;
  }

  // Method to return full date
  Calendar.prototype.returnFormattedDate = function (date) {
    var returned_date;
    var d = new Date(date);
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
  }

  // Plugin Instantiation
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Calendar(this, options));
      }
    });
  }

})(jQuery, window, document);
