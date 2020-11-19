({
    init : function(cmp, event, helper) {
        helper.initColumns(cmp);
        helper.initRoles(cmp);
    },

    editContactRole : function(cmp, event, helper) {
        helper.editContactRole(cmp, event);
    },

    updateContactRole : function(cmp, event, helper) {
        helper.updateContactRole(cmp);
    },

    closeEditForm : function(cmp, event, helper) {
        helper.closeEditForm(cmp);
    },
})
