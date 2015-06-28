/**
 * Created by gopi on 11/4/14.
 */
NPosts = new Mongo.Collection('nposts');

NPosts.before.insert(function (userId, doc) {
    doc.createdAt = new Date();
});

NPosts.helpers({
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

NPosts.attachSchema(new SimpleSchema({
    url: {
        type: String,
        autoform: {
            'label-type': 'placeholder',
            placeholder: 'News URL'
        },
        max: 200
    },
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
