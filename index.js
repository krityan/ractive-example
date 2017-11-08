// declaring the core-list component without intialising it
Ractive.components.corelist = Ractive.extend({
  // what html to use as a template
  template: '#core-list',

  // data properties of the component, simple get/set properties accessed by using this.get and this.set functions
  data: function() {
    return {
      headerItems: ["1", "2", "3"],
      displayItems: []
    }
  }
});


// declaring the basetile-list component without intialising it
Ractive.components.basetilelist = Ractive.extend({
  // what html to use as a template
  template: '#basetile-list',

  // data properties of the component, simple get/set properties accessed by using this.get and this.set functions
  data: function() {
    return {
      stuff: {}
    }
  },

  // computed properties of the component, get in the same way as data properties but are set when one of their dependencies updates
  // in this case the only dependency is 'stuff.stuffList'
  computed: {
    displayStuffs: function () {
      var stuff = this.get('stuff.stuffList');

      return {
        items: stuff
      }
    }
  }
});

// declaring the basetile-list component without intialising it
Ractive.components.configlist = Ractive.extend({
  // what html to use as a template
  template: '#config-list',

  // data properties of the component, simple get/set properties accessed by using this.get and this.set functions
  data: function() {
    return {
      stuff: []
    }
  },

  // what to do when the component is intialised
  oninit: function() {

    // when the spliceList event is fired from this component only, add *. before the name of the event to also catch child components' events
    this.on('spliceList', function() {
      // splice the data property with the name 'stuff'
      this.splice('stuff', 0, 1);
    })
  }
});

// this creates an instance of the core-tile component and intialises it with some data
var ractive = new Ractive({
  // where to render the component
  target: '#target',
  // what html to use as a template
  template: '#core-tile',
  
  // data properties of the component, simple get/set properties accessed by using this.get and this.set functions
  data: function() {
  	return {
      stuff: {
        stuffList: ["A", "B", "C"]
      }
  	}
  },
  
  // a collection of partials that can be set dynamically
  partials: {
    tilePartial: ""
  },
  
  // what to do when the component is intialised
  oninit: function() {

    // when the eventToFire event is fired from this component or a child component it is caught here
  	this.on('*.eventToFire', function()  {
  		console.log('eventFired');
    });
    
    // sets the partial called tilePartial to something new and rerenders that partial in the DOM
    this.resetPartial('tilePartial', '<basetilelist stuff="{{stuff}}"/>');
  }
});

