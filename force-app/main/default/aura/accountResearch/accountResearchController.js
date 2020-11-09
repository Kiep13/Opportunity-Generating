({
    init : function(cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Action', type: 'button',typeAttributes: {
                    label: 'Choose',
                    name: 'chooseAccount'
                }
            }
        ]);

        let initAccountsAction = cmp.get("c.initAccounts");
        initAccountsAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.accounts", response.getReturnValue());
            }
        });
        $A.enqueueAction(initAccountsAction);
    },

    submitAccountName : function(cmp, event, helper) {
        let name = cmp.get("v.accountName");

        let action = cmp.get("c.findAccountsByName");
        action.setParams({ 
           name: name
        });
        
        action.setCallback(this, function(response) {
            if (action.getState() === "SUCCESS") {
                console.log(response.getReturnValue());
                cmp.set("v.accounts", response.getReturnValue());

                cmp.set("v.isEmpty", response.getReturnValue().size > 0);

                cmp.set("v.noFound", false);
                helper.showToast("Success", "Accounts was found");
            } else {
                helper.showToast("Error", "Error during attempt to find accounts");
            }
        });
        $A.enqueueAction(action);
    },
    
    onCreatePressed: function(cmp, event, helper) {
        var navigate = cmp.get('v.navigateFlow');
        navigate('NEXT');
    },

    onConfirmPressed: function(cmp, event, helper) {
        var navigate = cmp.get('v.navigateFlow');
        navigate('NEXT');
    }, 

    chooseAccount: function(cmp, event, helper){
        var row = event.getParam('row');
        cmp.set("v.Account", row); 
        var navigate = cmp.get('v.navigateFlow');
        navigate('NEXT');
    },
})