/**
 * Created by gopi on 6/24/15.
 */
AutoForm.hooks({
    'dcomment-create-form': {
        onSuccess: function (operation, result, template) {
            var insertDoc = (AutoForm.getFormValues('dcomment-create-form')).insertDoc;
            if(insertDoc){
                DPosts.update({_id: insertDoc.dpostId}, {$inc: {numberOfComments: 1}});
            }
            IonModal.close();
        }
    }
});
