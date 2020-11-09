@IsTest
public with sharing class ProductBlockControllerTest {

    private static String INVALID_PRODUCT = 'Expected product to not be null';
    private static String INVALID_AMOUNT = 'Expected get 0 products';
    private static String INVALID_PRICEBOOK = 'Expected pricebook to not be null';

    @IsTest
    static void createProductTest() {
        OpportunityLineItem product = ProductBlockController.createProduct();

        System.assertNotEquals(null, product, INVALID_PRODUCT);

        List<OpportunityLineItem> products = [SELECT Id FROM OpportunityLineItem];

        System.assertEquals(0, products.size(), INVALID_AMOUNT);
    }

    @IsTest
    static void createListProductsTest() {
        List<OpportunityLineItem> products = ProductBlockController.createListProducts();

        System.assertEquals(0, products.size(), INVALID_AMOUNT);        

        List<OpportunityLineItem> productsDatabase = [SELECT Id FROM OpportunityLineItem];

        System.assertEquals(0, productsDatabase.size(), INVALID_AMOUNT);
    }

    @IsTest
    static void getPricebookEntryTest() {
        try {
            PricebookEntry pricebook = ProductBlockController.getPricebookEntry();
        } catch (Exception e) {
            System.assertEquals('System.QueryException', e.getTypeName(),
                    'Expected exception with type System.QueryException, but got ' + e.getTypeName());
        }
    }
}
