Meteor.users.before.insert(function (userId, doc) {
  doc.profile.votedNPosts = [];
  doc.profile.votedDPosts = [];
});

Meteor.users.after.insert(function (userId, doc) {
  if(Meteor.isServer){
    var service = doc.services;
    if(service){
      if(service.facebook){
        if(service.facebook.email == 'gopi_don@rediffmail.com'){
          Roles.addUsersToRoles(doc, ['admin']);
        }
      }
    }
  }
});



Meteor.users.helpers({
  votedNPosts: function () {
    return NPosts.find({_id: {$in: this.profile.votedNPosts}});
  },
  votedDPosts: function () {
    return DPosts.find({_id: {$in: this.profile.votedDPosts}});
  }
});


