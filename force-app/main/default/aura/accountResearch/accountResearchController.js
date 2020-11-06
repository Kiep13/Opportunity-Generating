({
    init : function(cmp, event, helper) {
        var availableActions = cmp.get('v.availableActions');
     },

    submitAccountName : function(cmp, event, helper) {
        cmp.set("v.processing", true);

        let name = cmp.get("v.accountName");

        let action = cmp.get("c.findAccountByName");
        action.setParams({ 
           name: name
        });

        console.log(cmp.get("v.processing"));
        console.log(cmp.get("v.accountName"));
        
        action.setCallback(this, function(res) {
            if (action.getState() === "SUCCESS") {
                cmp.set("v.record", res.getReturnValue());

                console.log(cmp.get("v.record"));

                cmp.set("v.noFound", false);
                helper.showToast("Success", "Account was found");
            } else {
                helper.showToast("Error", "Error dering attempt to find account");
            }
            cmp.set("v.processing", false);
        });
        $A.enqueueAction(action);
    },
    
    onCreatePressed: function(cmp, event, helper) {
        var navigate = cmp.get('v.navigateFlow');
        navigate('NEXT');
    },

    onConfirmPressed: function(cmp, event, helper) {
        cmp.set("v.greeting", 'viluka'); 
        cmp.set("v.Account", cmp.get("v.record")); 

        var navigate = cmp.get('v.navigateFlow');
        navigate('NEXT');
    }
})