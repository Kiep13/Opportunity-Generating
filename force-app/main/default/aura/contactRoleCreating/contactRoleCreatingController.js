({
    init : function(cmp, event, helper) {
        helper.initColumns(cmp);
        helper.initRoles(cmp);
    },

    editContactRole : function(cmp, event, helper) {
        const row = event.getParam('row');

        let rows = cmp.get("v.displayesContactsRoles");
        const rowIndex = rows.indexOf(row);
        row.rowIndex = rowIndex;

        cmp.set("v.editContactRole", row);
        cmp.set("v.isEdit", true);

        console.log(cmp.get("v.editContactRole"));
    },

    changePrimaryState: function(cmp, event, helper) {
        const editContactRole = cmp.get("v.editContactRole");
        editContactRole.IsPrimary = !editContactRole.IsPrimary;
        cmp.set("v.editContactRole", editContactRole);
    },

    updateContactRole : function(cmp, event, helper) {
        const editContactRole = cmp.get("v.editContactRole");
        const rowIndex = editContactRole.rowIndex;

        console.log(editContactRole.IsPrimary);

        let contactsRoles = cmp.get("v.contactsRoles");
        contactsRoles[rowIndex].Role = editContactRole.Role;
        contactsRoles[rowIndex].IsPrimary = editContactRole.IsPrimary;
        cmp.set("v.contactsRoles", contactsRoles);

        let displayesContactsRoles = cmp.get("v.displayesContactsRoles");
        displayesContactsRoles[rowIndex].Role = editContactRole.Role;
        displayesContactsRoles[rowIndex].IsPrimary = editContactRole.IsPrimary;
        cmp.set("v.displayesContactsRoles", displayesContactsRoles);

        cmp.set("v.isEdit", false);
    },
})
