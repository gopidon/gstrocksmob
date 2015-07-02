/**
 * Created by gopi on 11/4/14.
 */
DPosts = new Mongo.Collection('dposts');

DPosts.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

DPosts.helpers({
    datePosted: function () {
        return moment(this.createdAt).format('DD-MMM-YYYY');
    },
    author: function () {
        return Meteor.users.findOne({_id: this.userId});
    },
    voters: function () {
        return Meteor.users.find({_id: {$in: this.voterIds}});
    }
});

DPosts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        autoform: {
            'label-type': 'placeholder',
            placeholder: 'Title'
        },
        max: 400
    },
    content: {
        type: String,
        autoform: {
            'label-type': 'placeholder',
            placeholder: 'Content'
        },
        max: 2000
    },
    userId: {
        type: String,
        autoValue: function () {
            if (this.isSet) {
                return;
            }
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    },
    voterIds: {
        type: [String],
        optional: true,
        defaultValue: []
    },
    numberOfVotes: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    numberOfComments: {
        type: Number,
        optional: true,
        defaultValue: 0
    },
    createdAt: {
        type: Date
    }
}));

/* Methods */

if(Meteor.isServer){
    Meteor.methods({
        'voteDPost': function (_id) {
            check(_id, String);
            if (!Meteor.user()) {
                return;
            }

            if (_(Meteor.user().profile.votedDPosts).include(_id)) {
                return;
            }

            DPosts.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
            Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedDPosts': _id}});
        }
    });
}

/* Permissions */

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
