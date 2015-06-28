Template.signIn.events({
  'click [data-action=sign-in-facebook]': function (event, template) {
    Meteor.loginWithFacebook({}, function (error) {
      if (error) {
        alert(error);
      } else {
        IonModal.close();
      }
    });
  },
  'click [data-action=sign-in-google]': function (event, template) {
    Meteor.loginWithGoogle({}, function (error) {
      if (error) {
        alert(error);
      } else {
        IonModal.close();
      }
    });
  }
});
