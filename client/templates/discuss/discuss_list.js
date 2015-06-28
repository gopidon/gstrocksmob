/**
 * Created by gopi on 6/23/15.
 */
Template.discussList.onCreated(function () {
    Session.setDefault('dlimit', PAGING_LIMIT);
    this.autorun(function () {
        this.subscription = Meteor.subscribe('dposts', Session.get('dlimit'));
    }.bind(this));
});

Template.discussList.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show({duration: ION_LOADING_DURATION});
        } else {
            IonLoading.hide();
        }
    }.bind(this));

    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementDLimit(PAGING_LIMIT);
        }
    });
};

Template.discussList.helpers({
    dposts: function () {
        return DPosts.find({},{sort:{createdAt: -1}, limit: Session.get('dlimit')});
    },
    showMore: function(){
        return DPosts.find().count() === Session.get("dlimit");
    }
});

Template.discussList.events({
    'click .give-me-more': function(evt) {
        incrementDLimit(PAGING_LIMIT);
    }
});


incrementDLimit = function(inc) {
    var newLimit = Session.get('dlimit') + inc;
    Session.set('dlimit', newLimit);
}