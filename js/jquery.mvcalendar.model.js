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
      $.Model('Journeys', {
        findAll: 'GET /calendar.json',
        findOne: 'GET /calendar/{id}.json',
        create: 'POST /journeys.json',
        update: 'PUT /journeys/{id}.json',
        destroy: 'DELETE /journeys/{id}.json'
      }, {/*user defined functions*/});

      /*Journeys.findAll(*/
        //{
          //year: 'blah',
          //month: 'blah'
        /*}, this._fillCalendar );*/


      this.element.bind('calendar:dateclicked', this._dateClickCallback);

    },

    _fillCalendar: function(journeys){
      $.each(journeys, function(journey) {

      });
    },

    _dateClickCallback: function(e, date){
      console.log('hi');
      //this._trigger(':dateclicked:modelretrieved', e, date, 'blah');
    },

    create: function(data){

    },

    retrieve: function(id){
              
    },

    update: function(id, data){
    
    },
    
    destroy: function(id){
             
    }

  };

  $.extend(true, $.bwtw.calendar.prototype, calendarModel);


})(jQuery);



//$('#main-container').calendar("update", id, data)
