/**
 * Created by gopi on 7/2/15.
 */
Notifications = new Mongo.Collection('notifications');


Notifications.helpers({
    commentAuthor: function () {
        return Meteor.users.findOne({_id: this.commentUserId});
    },
    path: function(){
        return "/hello";
    }
});


/* Permissions */

Notifications.allow({
    'insert': function(userId, doc) {
        return userId;
    },
    update: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
} });


/* Methods */

createCommentNotification = function(commentId, type) {
    check(commentId, String);
    check(type, String);
    var post;
    var comment;
    if(type == "NPost"){
        comment = NComments.findOne(commentId);
        post = NPosts.findOne(comment.npostId);

    }
    else if(type == "DPost"){
        comment = DComments.findOne(commentId);
        post = DPosts.findOne(comment.dpostId);
    }

    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            type: type,
            commentId: comment._id,
            commentUserId: comment.userId,
            read: false
        }); }
};