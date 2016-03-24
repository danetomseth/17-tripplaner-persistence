'use strict';


$(function(){

  var $optionsPanel = $('#options-panel');


  $.get('/api/restaurants', function (restArr) {
    restArr.forEach(makeOption, $optionsPanel.find('#restaurant-choices'));
      //restaurants.push(rest.name);
  })
  .fail( console.error.bind(console));

   $.get('/api/hotels', function (hotelsArr) {
    hotelsArr.forEach(makeOption, $optionsPanel.find('#hotel-choices'));
      //restaurants.push(rest.name);
  })
  .fail( console.error.bind(console));

  $.get('/api/activities', function (activitiesArr) {
    activitiesArr.forEach(makeOption, $optionsPanel.find('#activity-choices'));
      //restaurants.push(rest.name);
  })
  .fail( console.error.bind(console));


  // make a single `option` tag & associate it with an attraction object
  function makeOption (databaseAttraction) {
    databaseAttraction.type = this.data('type');
    var clientAttraction = attractionsModule.create(databaseAttraction);
    var $option = $('<option></option>') // makes a new option tag
      .text(clientAttraction.name) // with this inner text
      .data({ obj: clientAttraction}); // associates the attraction object with this option
    this.append($option); // add the option to this select
  }

  // what to do when the `+` button next to a `select` is clicked
  $optionsPanel.on('click', 'button[data-action="add"]', function () {
    var attraction = $(this).siblings('select').find(':selected').data().obj;
    daysModule.addToCurrent(attraction);
  });

});
