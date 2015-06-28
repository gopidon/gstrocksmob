/**
 * Created by gopi on 6/23/15.
 */
Template.discussView.onCreated(function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('dpost', Router.current().params._id);
    }.bind(this));
});

Template.discussView.onRendered(function(){
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show({duration: ION_LOADING_DURATION});
        } else {
            IonLoading.hide();
        }
    }.bind(this));
});

Template.discussView.helpers({
    dpost: function () {
        return DPosts.findOne({_id: Router.current().params._id});
    },
    dcomments: function () {
        return DComments.find({dpostId: Router.current().params._id}, {sort: {createdAt: -1}});
    }
});

Template.discussView.events({
    'click [data-action=new-comment]': function (event, template) {
        if (Meteor.user()) {
            IonModal.open('dCommentCreate', {dpostId: this._id});
        } else {
            IonModal.open('signIn');
        }
    }
});