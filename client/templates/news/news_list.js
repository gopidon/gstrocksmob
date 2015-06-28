/**
 * Created by gopi on 6/23/15.
 */
Template.newsList.onCreated(function () {
    Session.setDefault('nlimit', PAGING_LIMIT);
    this.autorun(function () {
        this.subscription = Meteor.subscribe('nposts', Session.get('nlimit'));
    }.bind(this));
});

Template.newsList.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show({duration: ION_LOADING_DURATION});
        } else {
            IonLoading.hide();
        }
    }.bind(this));

    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementNLimit(PAGING_LIMIT);
        }
    });
};

Template.newsList.helpers({
    nposts: function () {
        return NPosts.find({},{sort:{createdAt: -1}, limit: Session.get('nlimit')});
    },
    showMore: function(){
        return NPosts.find().count() === Session.get("nlimit");
    }
});

Template.newsList.events({
    'click .give-me-more': function(evt) {
        incrementNLimit(PAGING_LIMIT);
    }
});

incrementNLimit = function(inc) {
    var newLimit = Session.get('nlimit') + inc;
    Session.set('nlimit', newLimit);
}