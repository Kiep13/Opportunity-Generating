@IsTest
public with sharing class AccountResearchTest {

    private static String TEST_ACCOUNT_NAME = 'Test name';

    private static String INVALID_NAME = 'Actual account name doesn\'t equal to expected';
    private static String INVALID_AMOUNT = 'Actual account\'s amount doesn\'t equal to expected';

    @IsTest
    static void initAccountsTest(){
        List<Account> accounts = AccountResearch.initAccounts();

        System.assertEquals(0, accounts.size(), INVALID_AMOUNT);        

        List<Account> accountsDatabase = [SELECT Id FROM Account];

        System.assertEquals(0, accountsDatabase.size(), INVALID_AMOUNT);
    }

    @IsTest
    static void findAccountsByNameTest() {
        Account account = new Account(Name = TEST_ACCOUNT_NAME);
        insert account;

        Id[] fixedSearchResults= new Id[1];
        fixedSearchResults[0] = account.Id;
        Test.setFixedSearchResults(fixedSearchResults);

        List<Account> accounts = AccountResearch.findAccountsByName(TEST_ACCOUNT_NAME);

        System.assertEquals(1, accounts.size(), INVALID_AMOUNT);
    }

}
