var promotions = new Meteor.Collection('Promotions');

console.log(this.userId);
// Publish lockouts
Meteor.publish('Promotions', function () {
  console.log('user id: 2' + this.userId);
  return promotions.find({owner: this.userId});
});


Meteor.methods({
  'removePromotion': function (data) {
    promotions.remove({_id: data.id, owner: this.userId});  
  },
  'securePromotion': function(data) {
    promotions.update({_id: data.id, owner: this.userId}, {$set: {promotionDate: new Date()}});
  },
  'submitPromotion': function (data) {
    console.log(data);
    console.log('user id: ' + this.userId);
    promotions.insert({
      name: data.name,
      description: data.description,
      price: data.price,
      submissionDate: new Date(),
      promotionDate: null,
      owner: this.userId
    });
  }
});

// #Permissions
promotions.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, docs, fields, modifier) {
    return true;
  },
  remove: function (userId, docs) {
    return true;
  }
});
  
