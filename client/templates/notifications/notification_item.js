/**
 * Created by gopi on 5/18/15.
 */

Template.notificationItem.helpers({
    postPath: function() {
        if(this.type == "NPost"){
            return "newsPost";
        }
        else if (this.type == "DPost"){
            return "discussPost"
        }
    },
    isNPost: function(){
        if(this.type == "NPost"){
            return true;
        }
        else{
            return false;
        }
    }

});

Template.notificationItem.events({
    'click a': function(evt, template) {
        evt.preventDefault();
        Notifications.update(template.data._id, {$set: {read: true}});
        Router.go(evt.target.href);
    }
});