({
    initColumns : function(cmp) {
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Action', type: 'button',typeAttributes: {
                    label: 'Choose',
                    name: 'chooseAccount'
                }
            }
        ]);
    },

    initAccountsList : function(cmp) {
        let initAccountsAction = cmp.get("c.initAccounts");
        initAccountsAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.accounts", response.getReturnValue());
            }
        });
        $A.enqueueAction(initAccountsAction);
    }, 

    makeFindAccountRequest : function(cmp) {
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
                this.showToast("Success", "Accounts was found");
            } else {
                this.showToast("Error", "Error during attempt to find accounts");
            }
        });
        $A.enqueueAction(action);
    },

    showToast : function(title, message) {
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message
        });
        toastEvent.fire();
    },

    goToNextSection : function(cmp) {
        var navigate = cmp.get('v.navigateFlow');
        navigate('NEXT');
    }
})