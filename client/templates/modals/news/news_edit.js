/**
 * Created by gopi on 6/22/15.
 */
AutoForm.hooks({
    'nposts-edit-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            IonKeyboard.close();
            //Router.go('home', {_id: result});
        }
    }
});


Template.newsEdit.helpers({
    npost: function () {
        var template = Template.instance();
        return NPosts.findOne({_id: template.data.id});
    }
});
