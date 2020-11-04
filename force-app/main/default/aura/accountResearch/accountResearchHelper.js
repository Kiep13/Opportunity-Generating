({
    helperMethod : function() {

    },

    showToast : function(title, message) {
        console.log(6);
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message
        });
        toastEvent.fire();
    }
})