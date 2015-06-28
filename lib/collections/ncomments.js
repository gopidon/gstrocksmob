/**
 * Created by gopi on 1/8/15.
 */
NComments = new Mongo.Collection('ncomments');

NComments.helpers({
    author: function () {
        return Meteor.users.findOne({_id: this.userId});
    }
});

NComments.attachSchema(new SimpleSchema({
    body: {
        type: String,
        autoform: {
            rows: 6,
            'label-type': 'placeholder',
            placeholder: 'Add your comment…'
        }
    },
    userId: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                return Meteor.userId();
            } else {
                this.unset();
            }
        }
    },
    npostId: {
        type: String
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else {
                this.unset();
            }
        }
    }
}));
