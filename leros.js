var lockouts = new Meteor.Collection('Lockouts');
if (Meteor.isClient) {
  Meteor.startup(function () {
    page('/test', function () {
    });
    Accounts.ui.config({
passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

  });
  Template.lockouts.lockouts = function () {
      return lockouts.find({}, { sort: {startDate: 1}});
  };
  Template.lockouts.events({
      'click #submit' : function (e, t) {
        Meteor.call('addLockout', { 
          startDate: t.find('#startDate').value,
          endDate: t.find('#endDate').value
        });      
      }
  });
  

  
}

if (Meteor.isServer) {
  Meteor.methods({
    'addLockout': function (data) {
      console.log(data);
      
    }
  });
  Meteor.startup(function () {
    
    // code to run on server at startup
  });
}
