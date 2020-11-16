({
    initColumns : function(cmp) {
        var actions = [
            { label: 'Delete', name: 'delete' }
        ];

        cmp.set('v.columns', [
            {label: 'Opportunity Product Name', fieldName: 'Name', type: 'text'},
            {label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency'},
            {label: 'Quantity', fieldName: 'Quantity', type: 'number'},
            { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'right' } }
        ]); 
    },

    initProduct : function(cmp) {
        let getProductAction = cmp.get("c.createProduct");
        getProductAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Product", response.getReturnValue());
            }
        });
        $A.enqueueAction(getProductAction);
    },

    initListProducts : function(cmp) {
        let getListAction = cmp.get("c.createListProducts");
        getListAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Products", response.getReturnValue());
            }
        });
        $A.enqueueAction(getListAction);
    },

    initPricebookEntries : function(cmp) {
        let getEntriesAction = cmp.get("c.getPricebookEntries");
        getEntriesAction.setCallback(this, function(response) {
            let state = response.getState();

            if (state === "SUCCESS") {
                cmp.set("v.Entries", response.getReturnValue());
            }
        });
        $A.enqueueAction(getEntriesAction);
    },

    addProduct : function(cmp) {
        let product = cmp.get("v.Product");
        let products = cmp.get("v.Products");
        cmp.set("v.isEmpty", false);

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
    },

    deleteProduct : function(cmp, event) {
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
