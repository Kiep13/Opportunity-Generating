({
    init : function(cmp, event, helper) {
        var availableActions = cmp.get('v.availableActions');
        for (var i = 0; i < availableActions.length; i++) {
           if (availableActions[i] == "FINISH") {
             cmp.set("v.canFinish", true);
           } else if (availableActions[i] == "NEXT") {
             cmp.set("v.canNext", true);
           }
        }
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
 
        console.log('1');

        action.setCallback(this, function(res) {
            if (action.getState() === "SUCCESS") {
                console.log('2');

                cmp.set("v.record", res.getReturnValue());

                console.log(cmp.get("v.record"));

                cmp.set("v.noFound", false);
                helper.showToast("Success", "Account was found");
            } else {
                console.log('3');
                helper.showToast("Error", "Error dering attempt to find account");
            }
            cmp.set("v.processing", false);
            console.log(res);
            console.log('4');
        });
        $A.enqueueAction(action);
    },

    onCancelPressed: function(cmp, event, helper) {
        var actionClicked = event.getSource().getLocalId();
        var navigate = cmp.get('v.navigateFlow');
        navigate(actionClicked);
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