/**
 * Created by gopi on 6/24/15.
 */
AutoForm.hooks({
    'ncomment-create-form': {
        onSuccess: function (operation, result, template) {
            var insertDoc = (AutoForm.getFormValues('ncomment-create-form')).insertDoc;
            if(insertDoc){
                NPosts.update({_id: insertDoc.npostId}, {$inc: {numberOfComments: 1}});
                createCommentNotification(result, "NPost"); //Pass NComment Id
            }
            IonModal.close();
        }
    }
});
