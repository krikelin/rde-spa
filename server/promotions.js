var promotions = new Meteor.Collection('Promotions');

// #Permissions
promotions.allow({
  insert: function (userId, doc) {
    console.log("FG");
    return (userId && doc.owner = userId);
  },
  update: function (userId, docs, fields, modifier) {
    return userId;
  },
  remove: function (userId, docs) {
    return userId;
  }
});
  

console.log(this.userId);
// Publish lockouts
Meteor.publish('Promotions', function () {
  console.log('user id: 2' + this.userId);
  return promotions.find({owner: this.userId}, {sort: {submissionDate: -1, promotionDate: -1}});
});

Meteor.methods({
  'removePromotion': function (data) {
    promotions.remove({_id: data.id, owner: this.userId});  
  },
  'securePromotion': function(data) {
    console.log("Securing promotion " + data);
    promotions.update({code: data.code}, {$set: {promotionDate: new Date()}});
  },
  'rejectPromotion': function (data) {
    promotions.update({code: data.code}, {$set: {rejectedDate: new Date()}});
  },
  'submitPromotion': function (data) {
    console.log(data);
    console.log('user id: ' + this.userId);
    promotions.insert({
      name: data.name,
      description: data.description,
      price: data.price,
      submissionDate: data.submissionDate,
      promotionDate: data.promotionDate,
      rejectedDate: null,
      owner: this.userId,
      code: data.code
    });
  }
});
