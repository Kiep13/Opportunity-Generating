({    
    redirect : function(cmp, event, helper) {
    var record = cmp.get("v.recordId");
    
    var redirect = $A.get("e.force:navigateToSObject");
    redirect.setParams({
       "recordId": record
    });

    redirect.fire();
 }})