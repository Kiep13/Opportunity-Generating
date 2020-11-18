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
        Pricebook2 standardBook = [SELECT Id FROM Pricebook2 WHERE IsStandard = true];
        return [SELECT Id, Name FROM PricebookEntry WHERE Pricebook2Id = :standardBook.Id];
    }
}
