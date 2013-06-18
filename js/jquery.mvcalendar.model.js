(function ($) {
  var pluginName = 'calendar';
  var extensionMethods = {
        /*
         * retrieve the id of the element
         * this is some context within the existing plugin
         */
    showId: function(){
        return this.element[0].id;
        //console.log('hi');
    }
  };

  $.extend(true, $.fn[pluginName], extensionMethods);


})(jQuery);

