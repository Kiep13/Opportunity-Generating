public with sharing class AccountResearch {
    @AuraEnabled
    public static List<Account> initAccounts() {
        return new List<Account>();
    }

    @AuraEnabled
    public static List<Account> findAccountsByName(String name) {
        List<Account> accounts = new List<Account>();
        if (name.length() > 0) {
            List<List<SObject>> searchResults = [
                FIND :name
                RETURNING Account(Id, Name ORDER BY Name)
            ];
            accounts = searchResults[0];
        }
        return accounts;
    }
}