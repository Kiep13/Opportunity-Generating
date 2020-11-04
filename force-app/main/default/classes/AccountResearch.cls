public with sharing class AccountResearch {
    @AuraEnabled
    public static Account findAccountByName(String name) {
        return [SELECT Id, Name FROM Account WHERE Name = :name LIMIT 1];
    }
}