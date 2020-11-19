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
        const getRolesAction = cmp.get("c.getRolesList");
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
        const createListAction = cmp.get("c.createOpportuntuContactRoles");
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

    editContactRole : function(cmp, event) {
        const row = event.getParam('row');

        const rows = cmp.get("v.displayesContactsRoles");
        const rowIndex = rows.indexOf(row);
        row.rowIndex = rowIndex;

        cmp.set("v.editContactRole", row);
        cmp.set("v.editTitle", "Select Role for " + row.Name);
        cmp.set("v.isEdit", true);

        console.log(cmp.get("v.editContactRole"));
    },

    updateContactRole : function(cmp) {
        const editContactRole = cmp.get("v.editContactRole");
        const rowIndex = editContactRole.rowIndex;

        console.log(editContactRole.IsPrimary);

        let contactsRoles = cmp.get("v.contactsRoles");
        let displayesContactsRoles = cmp.get("v.displayesContactsRoles");

        contactsRoles[rowIndex].Role = editContactRole.Role;
        displayesContactsRoles[rowIndex].Role = editContactRole.Role;

        if(editContactRole.IsPrimary == true) {
            contactsRoles = contactsRoles.map((contactRole, index) => {
                contactRole.IsPrimary = rowIndex == index;
                return contactRole;
            });

            displayesContactsRoles = displayesContactsRoles.map((contactRole, index) => {
                contactRole.IsPrimary = rowIndex == index;
                return contactRole;
            });
        }

        contactsRoles[rowIndex].IsPrimary = editContactRole.IsPrimary;
        displayesContactsRoles[rowIndex].IsPrimary = editContactRole.IsPrimary;

        cmp.set("v.contactsRoles", contactsRoles);
        cmp.set("v.displayesContactsRoles", displayesContactsRoles);

        this.closeEditForm(cmp);
    },

    closeEditForm : function(cmp) {
        cmp.set("v.isEdit", false);
    },
})
