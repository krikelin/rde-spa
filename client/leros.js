var lockouts = new Meteor.Collection('Lockouts');
Meteor.startup(function () {
    page('/test', function () {
    });
    Accounts.ui.config({
passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
  Meteor.subscribe('Lockouts');
  });
  Template.lockouts.lockouts = function () {
      return lockouts.find({}, { sort: {startDate: 1}});
  };
  Template.lockouts.events({
      'click .delete' : function (e, t) {
        var id = e.target.id;
        Meteor.call('removeLockout', {
          id: id
        });      
      },
      'click #submit' : function (e, t) {
        Meteor.call('addLockout', { 
          startDate: t.find('#startDate').value,
          endDate: t.find('#endDate').value
        });      
      }
  });
