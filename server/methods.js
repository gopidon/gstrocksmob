/**
 * Created by gopi on 6/26/15.
 */
Meteor.methods({
    'voteNPost': function (_id) {
        check(_id, String);
        if (!Meteor.user()) {
            return;
        }

        if (_(Meteor.user().profile.votedNPosts).include(_id)) {
            return;
        }

        NPosts.update({_id: _id}, {$inc: {numberOfVotes: 1}, $addToSet: {voterIds: this.userId}});
        Meteor.users.update({_id: this.userId}, {$addToSet: {'profile.votedNPosts': _id}});
    },

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