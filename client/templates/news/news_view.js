/**
 * Created by gopi on 6/23/15.
 */
Template.newsView.onCreated(function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('npost', Router.current().params._id);
    }.bind(this));
});

Template.newsView.onRendered(function(){
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show({duration: ION_LOADING_DURATION});
        } else {
            IonLoading.hide();
        }
    }.bind(this));
});

Template.newsView.helpers({
    npost: function () {
        return NPosts.findOne({_id: Router.current().params._id});
    },
    ncomments: function () {
        return NComments.find({npostId: Router.current().params._id}, {sort: {createdAt: -1}});
    }
});

Template.newsView.events({
    'click [data-action=new-comment]': function (event, template) {
        if (Meteor.user()) {
            IonModal.open('nCommentCreate', {npostId: this._id});
        } else {
            IonModal.open('signIn');
        }
    }
});