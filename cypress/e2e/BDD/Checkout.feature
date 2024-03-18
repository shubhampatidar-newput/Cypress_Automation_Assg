Feature: Checkout flow on SauceDemo

    I want to login on Saucedemo and validate checkout flow

    Scenario: Login to SauceDemo
    Given I open the Login Page on SauceDemo
    When I enter Valid Credentials and login
    And Select and Item and click on Add to Cart
    And Enter user details and click on checkout
    Then Item should be checkout successfully