@IsTest
public with sharing class ContactReserachTest {
    private static String TEST_NAME = 'Test';

    private static String INVALID_LIST_SIZE = 'Actual length of list doesn\'t equal to expected';
    private static String INVALID_NAME = 'Actual Contact\'s Last Name doesn\'t eqial to expected';
    private static String INVALID_PICKLIST_LENGTH = 'Expected that picklist will not be null';

    @TestSetup
    public static void makeData(){
        Contact contact = new Contact(
            FirstName = TEST_NAME,
            LastName = TEST_NAME
        );

        insert contact;
    }

    @IsTest
    public static void createContactsListTest() {
        List<Contact> contacts = ContactResearch.createContactsList();
        System.assertEquals(0, contacts.size(), INVALID_LIST_SIZE);
    }

    @IsTest
    public static void findContactsTest() {
        List<Contact> contacts = ContactResearch.findContacts('Test');
        System.assertEquals(1, contacts.size(), INVALID_LIST_SIZE);
        System.assertEquals(TEST_NAME, contacts[0].LastName, INVALID_NAME);
    }

    @IsTest
    public static void findContactsTestEmpty() {
        List<Contact> contacts = ContactResearch.findContacts('');
        System.assertEquals(0, contacts.size(), INVALID_LIST_SIZE);
    }

    @IsTest
    public static void createOpportunityContactRoles() {
        List<OpportunityContactRole> contactsRoles = ContactResearch.createOpportunityContactRoles();
        System.assertEquals(0, contactsRoles.size(), INVALID_LIST_SIZE);
    }

    @IsTest
    public static void getRolesListTest() {
        List<String> picklist= ContactResearch.getRolesList();
		System.assert(picklist.size() > 0, INVALID_PICKLIST_LENGTH);
    }
}
