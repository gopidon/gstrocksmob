/**
 * Created by gopi on 6/21/15.
 */
Template.layout.rendered = function () {
    Session.set('currentTab', 'home');
};

Template.layout.helpers({
    notificationCount: function(){
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});