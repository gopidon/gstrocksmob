/**
 * Created by gopi on 5/18/15.
 */

Template.notifications.onCreated(function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('notifications', Meteor.userId());
    }.bind(this));
});

Template.notifications.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show({duration: ION_LOADING_DURATION});
        } else {
            IonLoading.hide();
        }
    }.bind(this));
    if (!Meteor.loggingIn() && !Meteor.user()) {
        IonModal.open('signIn');
    }
};


Template.notifications.helpers({
    notifications: function() {
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationCount: function(){
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});

Template.notificationItem.helpers({
    notificationPostPath: function() {
        if(this.type == "NPost"){
            return Router.routes.newsView.path({_id: this.postId});
        }
        else if (this.type == "DPost"){
            return Router.routes.discussView.path({_id: this.postId});
        }
    }

});

Template.notificationItem.events({
    'click a': function() {
        Notifications.update(this._id, {$set: {read: true}});
    }
});