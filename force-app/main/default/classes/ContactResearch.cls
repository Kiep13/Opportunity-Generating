public with sharing class ContactResearch {
    @AuraEnabled
    public static List<Contact>  createContactsList(){
        return new List<Contact>();
    }

    @AuraEnabled
    public static List<Contact> findContacts(String term) {
        List<Contact> contacts = new List<Contact>();
        if (term.length() > 0) {
            String searchTerm = '%' + term + '%';
            contacts = [SELECT FirstName, LastName, Title, Phone, Email
                    FROM Contact
                    WHERE FirstName LIKE  :searchTerm OR LastName LIKE :searchTerm];
        }
        return contacts;
    }

    @AuraEnabled(Cacheable=False)
    public static List<OpportunityContactRole> createOpportunityContactRoles() {
        return new List<OpportunityContactRole>();
    }

    @AuraEnabled(Cacheable=False)
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
