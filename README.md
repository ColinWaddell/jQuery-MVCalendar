# jQuery MVCalendar

I'm re-writting John Patrick Given's jQuery-Verbose-Calendar so it sits inside a backbone mvc framework, adding some extra functionality along the way.

_This project isn't worth forking... yet. It's barely been started._

# Credits

The plug-in makes use of jQuery-Verbose-Calendar (https://github.com/iamjpg/jQuery-Verbose-Calendar) Tipsy (http://onehackoranother.com) and jQuery.ScrollTo (http://flesler.blogspot.com/2007/10/jqueryscrollto.html).

Each is included as a submodule so be sure to use _git clone --recursive https://github.com/ColinWaddell/jQuery-MVCalendar.git_


# Implementation

    $(document).ready(function() {
    	$("#calendar-container").calendar({
			tipsy_gravity: 's', // How do you want to anchor the tipsy notification? (n / s / e / w)
			click_callback: function(date) {
                console.log(date);
            }, // Callback to return the clicked date object
			year: "2012", // Optional start year, defaults to current year - pass in a year - Integer or String
			scroll_to_date: false // Scroll to the current day?
		});
	});
        

# License (MIT)

Copyright (C) 2013 John Patrick Given, Colin Waddell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

