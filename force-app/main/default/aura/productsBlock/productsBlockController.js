({
    init : function(cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Opportunity Product Name', fieldName: 'Name', type: 'text'},
            {label: 'Total Amount', fieldName: 'TotalAmount', type: 'currency'},
        ]);

        let getProductAction = cmp.get("c.createProduct");
        getProductAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Product", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getProductAction);

        let getListAction = cmp.get("c.createListProducts");
        getListAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Products", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(getListAction);
    },
    
    handleSaveProduct : function(cmp, event, helper) {
        let product = cmp.get("v.Product");
        let products = cmp.get("v.Products");
        console.log(product);

        products.push(product);
        cmp.set("v.Products", products);

        let getProductAction = cmp.get("c.createProduct");
        getProductAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Product", response.getReturnValue());
                console.log('asdf');
            }
            else {
                console.log("Failed with state: " + state);
            }
        });

        $A.enqueueAction(getProductAction);
    }
})
