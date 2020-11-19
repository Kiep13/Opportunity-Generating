public with sharing class ContactResearch {
    @AuraEnabled
    public static List<Contact>  createContactsList(){
        return new List<Contact>();
    }

    @AuraEnabled
    public static List<Contact> findContacts(String term) {
        List<Contact> contacts = new List<Contact>();
        if (term.length() > 0) {
            List<List<SObject>> results = [FIND :term IN NAME FIELDS RETURNING Contact(Id, FirstName, LastName ORDER BY LastName, FirstName)];
            contacts = (List<Contact>) results[0];
        }
        return contacts;
    }

    @AuraEnabled
    public static List<OpportunityContactRole> createOpportuntuContactRoles() {
        return new List<OpportunityContactRole>();
    }

    @AuraEnabled 
    public static List<String> getRolesList() {
        List<String> picklist= new List<String>();
		Schema.DescribeFieldResult field = OpportunityContactRole.Role.getDescribe();
		List<Schema.PicklistEntry> valuesSets = field.getPicklistValues();
		for( Schema.PicklistEntry valueSet : valuesSets){
			picklist.add(valueSet.getLabel());
		}     
		return picklist;
    }
}
