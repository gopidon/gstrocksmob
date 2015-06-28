/**
 * Created by gopi on 6/22/15.
 */
AutoForm.hooks({
    'nposts-create-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            IonKeyboard.close();
            //Router.go('home', {_id: result});
        }
    }
});


Template.newsCreate.rendered = function(){
    if (!Meteor.loggingIn() && !Meteor.user()) {
        IonModal.close();
        IonModal.open('signIn');
    }
}
