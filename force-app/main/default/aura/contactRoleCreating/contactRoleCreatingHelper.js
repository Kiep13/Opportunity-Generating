({

    initColumns : function(cmp) {
        cmp.set('v.columns', [
            {label: 'Contact', fieldName: 'Name', type: 'text'},
            {label: 'Role', fieldName: 'Role', type: 'text'},
            {label: 'IsPrimary', fieldName: 'IsPrimary', type: 'boolean'},
            {label: 'Action', type: 'button',typeAttributes: {
                    label: 'Edit',
                    name: 'editContactRole'
                }
            }
        ]);
    },

    initRoles : function(cmp) {
        let getRolesAction = cmp.get("c.getRolesList");
        getRolesAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.roles", response.getReturnValue());

                this.initСontactsRoles(cmp);
            }
        });
        $A.enqueueAction(getRolesAction);
    },

    initСontactsRoles : function(cmp) {
        let createListAction = cmp.get("c.createOpportuntuContactRoles");
        createListAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.contactsRoles", response.getReturnValue());

                const roles = cmp.get("v.roles");
                const defaultRole = roles[0];

                let contactRoles = [];
                let displayedContactRoles = [];

                const contacts = cmp.get("v.contacts");
                contacts.forEach((contact) =>{
                    contactRoles.push({
                        ContactId: contact.Id,
                        Role: defaultRole,
                        IsPrimary: false
                    });

                    displayedContactRoles.push({
                        Name: contact.FirstName + " " + contact.LastName,
                        Role: defaultRole,
                        IsPrimary: false
                    })
                });

                cmp.set("v.contactsRoles", contactRoles);
                cmp.set("v.displayesContactsRoles", displayedContactRoles);
                cmp.set("v.isEmpty", contactRoles.length == 0);
            }
        });
        $A.enqueueAction(createListAction);
    },
})
