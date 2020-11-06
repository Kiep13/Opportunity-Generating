({
    init : function(cmp, event, helper) {
        var actions = [
            { label: 'Delete', name: 'delete' }
        ];

        cmp.set('v.columns', [
            {label: 'Opportunity Product Name', fieldName: 'Name', type: 'text'},
            {label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency'},
            {label: 'Quantity', fieldName: 'Quantity', type: 'number'},
            { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'right' } }
        ]);

        let getProductAction = cmp.get("c.createProduct");
        getProductAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Product", response.getReturnValue());
            }
        });
        $A.enqueueAction(getProductAction);

        let getListAction = cmp.get("c.createListProducts");
        getListAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Products", response.getReturnValue());
            }
        });
        $A.enqueueAction(getListAction);
    },
    
    handleSaveProduct : function(cmp, event, helper) {
        const allValid = cmp.find('field').reduce(function (validSoFar, inputCmp) {
            inputCmp.reportValidity();
            return validSoFar && inputCmp.checkValidity();
        }, true);

        if (!allValid) {
            return;
        }

        let product = cmp.get("v.Product");
        let products = cmp.get("v.Products");
        cmp.set("v.isEmpty", false);

        let getPriceBookAction = cmp.get("c.getPricebookEntry");
        getPriceBookAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {

                product.PricebookEntryId = response.getReturnValue().Id;
                console.log(response.getReturnValue().Id);

                products.push(product);
                cmp.set("v.Products", products);

                let getProductAction = cmp.get("c.createProduct");
                getProductAction.setCallback(this, function(response) {
                    let state = response.getState();
                    if (state === "SUCCESS") {
                        cmp.set("v.Product", response.getReturnValue());
                    }
                });

                $A.enqueueAction(getProductAction);

            }
        });

        $A.enqueueAction(getPriceBookAction);
    },

    handleRowAction: function (cmp, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'delete': {
                var rows = cmp.get('v.Products');
                var rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                cmp.set('v.Products', rows);

                if(rows.length == 0) {
                    cmp.set("v.isEmpty", true);  
                }
            } break;
        }
    }
})
