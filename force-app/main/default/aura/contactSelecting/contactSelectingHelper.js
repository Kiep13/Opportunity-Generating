({
    initColumns : function(cmp) {
        cmp.set('v.columns', [
            {label: 'First Name', fieldName: 'FirstName', type: 'text'},
            {label: 'Last Name', fieldName: 'LastName', type: 'text'},
            {label: 'Action', type: 'button',typeAttributes: {
                    label: 'Choose',
                    name: 'chooseContact'
                }
            }
        ]);
    },

    initСontacts : function(cmp) {
        let createContactsAction = cmp.get("c.createContactsList");
        createContactsAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Contacts", response.getReturnValue());
                cmp.set("v.selectedContacts", response.getReturnValue());
            }
        });
        $A.enqueueAction(createContactsAction);
    },
    
    makeContactRequest : function(cmp) {
        let term = cmp.get("v.searchTerm");

        if(term.size == 0) {
            return;
        }

        let action = cmp.get("c.findContacts");
        action.setParams({ 
           term: term
        });
        
        action.setCallback(this, function(response) {
            if (action.getState() === "SUCCESS") {
                cmp.set("v.Contacts", response.getReturnValue());
                cmp.set("v.isEmptyContacts", response.getReturnValue().length == 0);

                this.showToast("Success", "Contacts was found");
            } else {
                this.showToast("Error", "Error during attempt to find contacts");
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
})
