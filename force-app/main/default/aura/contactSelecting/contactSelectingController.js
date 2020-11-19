({
    init : function(cmp, event, helper) {
        helper.initColumns(cmp);
        helper.initСontacts(cmp);
    },

    submitSearch : function(cmp, event, helper) {
        helper.makeContactRequest(cmp);
    },

    chooseContact : function(cmp, event, helper) {
        helper.addToSelected(cmp, event);
    },

    deleteContact : function(cmp, event, helper) {
        helper.deleteContact(cmp, event);
    }
})
