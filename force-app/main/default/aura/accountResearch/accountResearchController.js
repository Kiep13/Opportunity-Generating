({
    init : function(cmp, event, helper) {
        helper.initColumns(cmp);
        helper.initAccountsList(cmp);
    },

    submitAccountName : function(cmp, event, helper) {
        helper.makeFindAccountRequest(cmp);
    },
    
    onCreatePressed: function(cmp, event, helper) {
        cmp.set("v.Account", null); 
        helper.goToNextSection(cmp);
    },

    chooseAccount: function(cmp, event, helper){
        var row = event.getParam('row');
        cmp.set("v.Account", row); 
        helper.goToNextSection(cmp);
    },
})