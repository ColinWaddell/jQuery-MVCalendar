(function ($) {
  /**
   *  Namespace: the namespace the plugin is located under
   *  pluginName: the name of the plugin
   */
  var calendarModel = {
    /*
     * retrieve the id of the element
     * this is some context within the existing plugin
     */
    model: {


    },

    // Called after main plugin has completed _create
    _init: function () {
      $.Model('Todo', {
        findAll: 'GET /todos.json',
        findOne: 'GET /todos/{id}.json',
        create: 'POST /todos.json',
        update: 'PUT /todos/{id}.json',
        destroy: 'DELETE /todos/{id}.json'
      }, {});
    }

  };

  $.extend(true, $.bwtw.calendar.prototype, calendarModel);


})(jQuery);
