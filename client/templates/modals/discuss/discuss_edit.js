/**
 * Created by gopi on 6/22/15.
 */
AutoForm.hooks({
    'dposts-edit-form': {
        onSuccess: function (operation, result, template) {
            IonModal.close();
            IonKeyboard.close();
            //Router.go('home', {_id: result});
        }
    }
});


Template.discussEdit.helpers({
    dpost: function () {
        var template = Template.instance();
        return DPosts.findOne({_id: template.data.id});
    }
});
