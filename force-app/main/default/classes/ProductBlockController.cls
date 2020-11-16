public with sharing class ProductBlockController {
    @AuraEnabled
    public static OpportunityLineItem createProduct() {
        return new OpportunityLineItem();
    }

    @AuraEnabled
    public static List<OpportunityLineItem> createListProducts() {
        return new List<OpportunityLineItem>();
    }

    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntries() {
        return [SELECT Id, Name FROM PricebookEntry];
    }
}
