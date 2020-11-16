({
    init : function(cmp, event, helper) {
        helper.initColumns(cmp);
        helper.initProduct(cmp);
        helper.initListProducts(cmp);
        helper.initPricebookEntries(cmp);
    },
    
    handleSaveProduct : function(cmp, event, helper) {
        const allValid = cmp.find('field').reduce(function (validSoFar, inputCmp) {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);

        if (!allValid) {
            return;
        }

        helper.addProduct(cmp);
    },

    handleRowAction: function (cmp, event, helper) {
        helper.deleteProduct(cmp, event);
    }
})
