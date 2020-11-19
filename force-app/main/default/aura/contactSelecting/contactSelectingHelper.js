({
    initColumns : function(cmp) {
        cmp.set('v.columns', [
            {label: 'First Name', fieldName: 'FirstName', type: 'text'},
            {label: 'Last Name', fieldName: 'LastName', type: 'text'},
            {label: 'Title', fieldName: 'Title', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'text'},
            {label: 'Email', fieldName: 'Email', type: 'text'},
            {label: 'Action', type: 'button',typeAttributes: {
                    label: 'Choose',
                    name: 'chooseContact'
                }
            }
        ]);

        cmp.set('v.selectedColumns', [
            {label: 'First Name', fieldName: 'FirstName', type: 'text'},
            {label: 'Last Name', fieldName: 'LastName', type: 'text'},
            {label: 'Title', fieldName: 'Title', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'text'},
            {label: 'Email', fieldName: 'Email', type: 'text'},
            {label: 'Action', type: 'button',typeAttributes: {
                    label: 'Delete',
                    name: 'deleteContact'
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
        const term = cmp.get("v.searchTerm");

        if(term.length == 0) {
            return;
        }

        const action = cmp.get("c.findContacts");
        action.setParams({ term: term });
        
        action.setCallback(this, function(response) {
            if (action.getState() === "SUCCESS") {
                cmp.set("v.Contacts", response.getReturnValue());

                const isEmpty = response.getReturnValue().length == 0;
                cmp.set("v.isEmptyContacts", isEmpty);

                const message = isEmpty ? "Can\'t find such contacts" : "Contacts was found";
                this.showToast("Success", message);
            } else {
                this.showToast("Error", "Error during attempt to find contacts");
            }
        });
        $A.enqueueAction(action);
    },

    addToSelected : function (cmp, event) {
        const row = event.getParam("row");

        const selectedContacts = cmp.get("v.selectedContacts");

        const contacts = selectedContacts.filter((contact) => {
            return contact.Id == row.Id;
        });

        if(contacts.length == 0) {
            selectedContacts.push(row);

            cmp.set("v.selectedContacts", selectedContacts);
            cmp.set("v.isEmptySelected", false);
        }
    }, 

    deleteContact: function(cmp, event) {
        const row = event.getParam('row');

        const rows = cmp.get("v.selectedContacts");
        const rowIndex = rows.indexOf(row);
        rows.splice(rowIndex, 1);
        cmp.set("v.selectedContacts", rows);
    
        if(rows.length == 0) {
            cmp.set("v.isEmptySelected", true);  
        }
    },

    showToast : function(title, message) {
        const toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message
        });
        toastEvent.fire();
    },
})
