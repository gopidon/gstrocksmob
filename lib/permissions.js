/**
 * Created by gopi on 11/27/14.
 */

isLoggedIn = function(){
    if (! Meteor.user()) {
        return false;
    }
    else {
        return true;
    }
}

isUserAdmin = function(){
    var loggedInUser = Meteor.user();
    if (!loggedInUser) {
        return false;
    }
    else{
        if (Roles.userIsInRole(loggedInUser, 'admin')) {
            return true;
        }
        else{
            return false;
        }
    }
}

ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
}

NPosts.allow({
    'insert': function(userId, doc) {
        return userId;
    },
    'update': function(userId, doc, fields, modifier) {
        return userId === doc.userId;
    },
    'remove': function(userId, doc) {
        return false;
    }
});

NComments.allow({
    'insert': function(userId, doc) {
        return userId;
    },
    'update': function(userId, doc, fields, modifier) {
        return userId === doc.userId;
    },
    'remove': function(userId, doc) {
        return false;
    }
});

DPosts.allow({
    'insert': function(userId, doc) {
        return userId;
    },
    'update': function(userId, doc, fields, modifier) {
        return userId === doc.userId;
    },
    'remove': function(userId, doc) {
        return false;
    }
});

DComments.allow({
    'insert': function(userId, doc) {
        return userId;
    },
    'update': function(userId, doc, fields, modifier) {
        return userId === doc.userId;
    },
    'remove': function(userId, doc) {
        return false;
    }
});

