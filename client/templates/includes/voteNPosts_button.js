Template.voteNPostsButton.events({
  'click': function (event, template) {
    event.preventDefault();

    if (!Meteor.user()) {
      IonModal.open('signIn');
      return;
    }

    Meteor.call('voteNPost', this._id);
  }
});

Template.voteNPostsButton.helpers({
  hasVotedClass: function () {
    if (!Meteor.user()) {
      return;
    }
    if(_(Meteor.user().profile.votedProductIds).contains(this._id)) {
      return 'has-voted';
    }
  }
});
