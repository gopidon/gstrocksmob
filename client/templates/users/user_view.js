Template.userView.created = function () {
  this.autorun(function () {
    this.subscription = Meteor.subscribe('user', Router.current().params._id);
  }.bind(this));
};

Template.userView.onRendered(function(){
  this.autorun(function () {
    if (!this.subscription.ready()) {
      IonLoading.show({duration: ION_LOADING_DURATION});
    } else {
      IonLoading.hide();
    }
  }.bind(this));
});

Template.userView.helpers({
  user: function () {
    return Meteor.users.findOne({_id: Router.current().params._id});
  }
});
