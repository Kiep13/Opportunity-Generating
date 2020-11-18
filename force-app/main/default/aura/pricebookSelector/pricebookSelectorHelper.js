({
    initBooks : function(cmp) {
        let getBooksAction = cmp.get("c.getPricebooks");
        getBooksAction.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.Books", response.getReturnValue());
                cmp.set("v.selectedBookId", response.getReturnValue()[0].Id);
            }
        });
        $A.enqueueAction(getBooksAction);
    },
})
