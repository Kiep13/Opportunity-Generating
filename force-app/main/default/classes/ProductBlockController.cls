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
    public static List<Pricebook2> getPricebooks() {
        return [SELECT Id, Name FROM Pricebook2];
    }

    @AuraEnabled
    public static List<PricebookEntry> getPricebookEntries(String pricebookId) {
        return [SELECT Id, Name FROM PricebookEntry WHERE Pricebook2Id = :pricebookId];
    }
}
