@IsTest
public with sharing class ProductBlockControllerTest {

    private static String TEST_NAME = 'Test name';

    private static String INVALID_PRODUCT = 'Expected product to not be null';
    private static String INVALID_AMOUNT = 'Expected get 0 products';
    private static String INVALID_PRICEBOOK = 'Expected pricebook to not be null';

    @TestSetup
    static void makeData(){
        Pricebook2 pricebook = new Pricebook2(
            Name = TEST_NAME
        );
        
        insert pricebook;
    }

    @IsTest
    public static void createProductTest() {
        OpportunityLineItem product = ProductBlockController.createProduct();

        System.assertNotEquals(null, product, INVALID_PRODUCT);

        List<OpportunityLineItem> products = [SELECT Id FROM OpportunityLineItem];

        System.assertEquals(0, products.size(), INVALID_AMOUNT);
    }

    @IsTest
    public  static void createListProductsTest() {
        List<OpportunityLineItem> products = ProductBlockController.createListProducts();

        System.assertEquals(0, products.size(), INVALID_AMOUNT);        

        List<OpportunityLineItem> productsDatabase = [SELECT Id FROM OpportunityLineItem];

        System.assertEquals(0, productsDatabase.size(), INVALID_AMOUNT);
    }

    @IsTest
    public static void getPricebooksTest() {
        List<Pricebook2> pricebooks = ProductBlockController.getPricebooks();
        System.assertEquals(1, pricebooks.size(), INVALID_AMOUNT);
    }


    @IsTest
    public static void getPricebookEntryTest() {
        try {
            List<PricebookEntry> items = ProductBlockController.getPricebookEntries(Test.getStandardPricebookId());
        } catch (Exception e) {
            System.assertEquals('System.QueryException', e.getTypeName(),
                    'Expected exception with type System.QueryException, but got ' + e.getTypeName());
        }
    }
}
