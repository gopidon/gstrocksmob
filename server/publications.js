/**
 * Created by gopi on 6/21/15.
 */

/* Start NPosts */

Meteor.publish('nposts', function(limit) {
    check(limit, Number);
    return NPosts.find({},{sort:{createdAt: -1},limit: limit});
});


Meteor.publishComposite('npost', function(_id) {
    check(_id, String);
    return {
        find: function() {
            return NPosts.find({_id: _id});
        },
        children: [
            {
                find: function(npost) {
                    return Meteor.users.find({_id: npost.userId});
                }
            },
            {
                find: function(npost) {
                    return Meteor.users.find({_id: npost.voterIds});
                }
            },
            {
                find: function(npost) {
                    return NComments.find({npostId: npost._id});
                },
                children: [
                    {
                        find: function(ncomment) {
                            return Meteor.users.find({_id: ncomment.userId});
                        }
                    }
                ]
            }
        ]
    };
});

/* End NPosts */


/* Start DPosts */


Meteor.publish('dposts', function(limit) {
    check(limit, Number);
    return DPosts.find({},{sort:{createdAt: -1},limit: limit});
});


Meteor.publishComposite('dpost', function(_id) {
    check(_id, String);
    return {
        find: function() {
            return DPosts.find({_id: _id});
        },
        children: [
            {
                find: function(dpost) {
                    return Meteor.users.find({_id: dpost.userId});
                }
            },
            {
                find: function(dpost) {
                    return Meteor.users.find({_id: dpost.voterIds});
                }
            },
            {
                find: function(dpost) {
                    return DComments.find({dpostId: dpost._id});
                },
                children: [
                    {
                        find: function(dcomment) {
                            return Meteor.users.find({_id: dcomment.userId});
                        }
                    }
                ]
            }
        ]
    };
});



/* End DPosts */


/* Start Users */

Meteor.publishComposite('user', function(_id) {
    if(_id){
        check(_id, String);
    }
    else{
        check(_id, null);
    }
    return {
        find: function() {
            return Meteor.users.find({_id: _id});
        },
        children: [
            {
                find: function(user) {
                    return NPosts.find({_id: {$in: user.profile.votedNPosts}});
                }
            },
            {
                find: function(user) {
                    return DPosts.find({_id: {$in: user.profile.votedDPosts}});
                }
            }
        ]
    };
});

/* End Users */