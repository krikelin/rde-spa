var lockouts = new Meteor.Collection('Lockouts');

function setSection(id) {
  var d = document.querySelectorAll('.section');
  console.log(d.length);
  for(var i = 0; i < d.length; i++) {
    console.log(d[i]);
    if(d[i].getAttribute('id') == id) {
      d[i].style.display = 'block';
    } else {
      d[i].style.display = 'none';
    }
  }
  var items = document.querySelectorAll('.navbar li');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if(item.dataset['item'] == id) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }  
  }
}
var LerosRoutes = Backbone.Router.extend({
  routes: {
    '' : 'home',
    '*lockouts' : 'lockouts'
  },
  home: function () {
    setSection('home');
  },
  lockouts: function () {
    setSection('lockouts');
  }
});
var routers = new LerosRoutes();
Meteor.startup(function () {
  Backbone.history.start();

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
  });
});

