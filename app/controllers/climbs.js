'use strict';

const Climbs = {
  home: {
    handler: function(request, h) {
      return h.view('home', { title: 'Add a Climb' });
    }
  },
  report: {
    handler: function(request, h) {
      return h.view('report', {
        title: 'Donations to Date',
        climbs: this.climbs
      });
    }
  },
  addClimb: {
    handler: function(request, h) {
      const data = request.payload;
      this.climbs.push(data);
      return h.redirect('/report');
    }
  }
};

module.exports = Climbs;
