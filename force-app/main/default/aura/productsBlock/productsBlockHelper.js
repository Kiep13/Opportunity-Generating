({
    initColumns : function(cmp) {
        var actions = [
            { label: 'Delete', name: 'delete' }
        ];

        cmp.set('v.columns', [
            {label: 'Product Name', fieldName: 'Name', type: 'text'},
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

        cmp.set("v.displayProducts", []);
    },

    initPricebookEntries : function(cmp) {
        let getEntriesAction = cmp.get("c.getPricebookEntries");
        getEntriesAction.setCallback(this, function(response) {
            let state = response.getState();

            if (state === "SUCCESS") {
                cmp.set("v.Entries", response.getReturnValue());
                cmp.set("v.selectedEntryId", (response.getReturnValue())[0].Id)
            }
        });
        $A.enqueueAction(getEntriesAction);
    },

    addProduct : function(cmp) {
        const product = cmp.get("v.Product");
        const products = cmp.get("v.Products");
        const displayProducts = cmp.get("v.displayProducts");
        cmp.set("v.isEmpty", false);

        const selectedEntryId = cmp.get("v.selectedEntryId");
        const entries = cmp.get("v.Entries");
        const entry = entries.filter((entry) => {
            return entry.Id == selectedEntryId
        })[0];

        product.PricebookEntryId = entry.Id;
        products.push(product);
        cmp.set("v.Products", products);

        displayProducts.push({
            Name: entry.Name,
            UnitPrice: product.UnitPrice,
            Quantity: product.Quantity
        });
        cmp.set("v.displayProducts", displayProducts);

        let getProductAction = cmp.get("c.createProduct");
        getProductAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Product", response.getReturnValue());
                cmp.set("v.selectedEntryId", entries[0].Id);
            }
        });

        $A.enqueueAction(getProductAction);
    },

    deleteProduct : function(cmp, event) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case "delete": {
                let rows = cmp.get("v.displayProducts");
                const rowIndex = rows.indexOf(row);
                rows.splice(rowIndex, 1);
                cmp.set("v.displayProducts", rows);

                let products = cmp.get('v.Products');
                products.splice(rowIndex, 1);
                cmp.get("v.Products", products);

                if(rows.length == 0) {
                    cmp.set("v.isEmpty", true);  
                }
            } break;
        }
    }
})
