@IsTest
public with sharing class AccountResearchTest {

    private static String TEST_ACCOUNT_NAME = 'Test name';

    private static String INVALID_NAME = 'Actual ccount name doesn\'t equal to expected';

    @TestSetup
    static void makeData(){
        Account account = new Account(Name = TEST_ACCOUNT_NAME);
        insert account;
    }

    @IsTest
    static void findAccountByNameTest() {
        Account account = null;

        account = AccountResearch.findAccountByName(TEST_ACCOUNT_NAME);

        System.assertEquals(TEST_ACCOUNT_NAME, account.Name, INVALID_NAME);
    }

}
