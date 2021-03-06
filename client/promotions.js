var promotions = new Meteor.Collection('Promotions');
Template.promotions.submissions = function () {
    return promotions.find({promotionDate: null}, { sort: {submissionDate: 1}});
};
Template.promotions.promotions = function () {
    return promotions.find({promotionDate: {$ne: null}}, { sort: {submissionDate: 1}});
};
Template.promotions.events({
  'click .delete' : function (e, t) {
    var id = e.target.id;
    Meteor.call('removePromotion', {
      id: id
    });      
  },
  'click .delete-p' : function (e, t) {
    var id = e.target.id;
    Meteor.call('removePromotion', {
      id: id
    });      
  },
  'click .secure' : function (e, t) {
    var id = e.target.id;
    Meteor.call('securePromotion', {
      id: id
    });      
  },
  'click #submit' : function (e, t) {
    Meteor.call('submitPromotion', { 
      submissionDate: new Date(),
      name: t.find('#name').value,
      description: t.find('#description').value,
      price: parseFloat(t.find('#price').value)
    });      
  }
});

Meteor.startup(function () {
  Meteor.subscribe('Promotions');
});
