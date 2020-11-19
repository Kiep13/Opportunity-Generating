({
    init : function(cmp, event, helper) {
        helper.initColumns(cmp);
        helper.initСontacts(cmp);
    },

    submitSearch : function(cmp, event, helper) {
        helper.makeContactRequest(cmp);
    },

    chooseContact : function(cmp, event, helper) {
        var row = event.getParam('row');

        let selectedContacts = cmp.get("v.selectedContacts");

        let contacts = selectedContacts.filter((contact) => {
            contact.Id == row.Id
        });

        if(contacts.length == 0) {
            selectedContacts.push({
                Id: row.Id,
                FirstName: row.FirstName,
                LastName: row.LastName
            });

            cmp.set("v.selectedContacts", selectedContacts);
            cmp.set("v.isEmptySelected", false);
        }
    },

    deleteContact : function(cmp, event, helper) {
        var row = event.getParam('row');

        let rows = cmp.get("v.selectedContacts");
        const rowIndex = rows.indexOf(row);
        rows.splice(rowIndex, 1);
        cmp.set("v.selectedContacts", rows);
    
        if(rows.length == 0) {
            cmp.set("v.isEmptySelected", true);  
        }
    }
})
