/**
 * Created by gopi on 6/21/15.
 */
requireLogin = function()
{
    if (! Meteor.user()) {
        if (Meteor.loggingIn())
        {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('accessDenied');
        }
    }
    else {
        this.next();
    }
};

requireAdmin = function() {
    var loggedInUser = Meteor.user();
    if (!loggedInUser) {
        if (Meteor.loggingIn())
        {
            this.render(this.loadingTemplate);
        }
        else {
            this.render('accessDenied');
        }
    } else {
        if (Roles.userIsInRole(loggedInUser, 'admin')) {
            this.next()
        }
        else{
            this.render('accessDenied');
        }

    }
};

isUserAdmin = function(){
    var loggedInUser = Meteor.user();
    if (Roles.userIsInRole(loggedInUser, 'admin')) {
        return true;
    }
    else{
        return false;
    }
};

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

/* Start News Related */

Router.route('/', {
    name: 'home'
});

Router.route('/newsView/:_id', {
    name: 'newsView'
});

/* End News Related */

/* Start Discuss Related */

Router.route('/discussList', {
    name: 'discussList'
});

Router.route('/discussView/:_id', {
    name: 'discussView'
});

/* End Discuss Related */

/* Start User Related */

Router.route('/users/:_id', {
    name: 'userView'
});

Router.route('/profile', {
    name: 'profile'
});

/* End User Related */


/*Start Notifications Related */

Router.route('/notifications', {
    name: 'notifications'
});

/* End Notifications Related */