/**
 * Created by gopi on 7/2/15.
 */
Notifications = new Mongo.Collection('notifications');


/* Permissions */

Notifications.allow({
    update: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
            fieldNames.length === 1 && fieldNames[0] === 'read';
} });