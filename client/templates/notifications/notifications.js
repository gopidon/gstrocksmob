/**
 * Created by gopi on 5/18/15.
 */

Template.notifications.onCreated(function () {

});

Template.notifications.rendered = function () {

};


Template.notifications.helpers({
    notifications: function() {
        return Notifications.find({userId: Meteor.userId(), read: false});
    },
    notificationCount: function(){
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});
