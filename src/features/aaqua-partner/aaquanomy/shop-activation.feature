Feature: Activate a shop

  Scenario Outline: Community admin activates the shop
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Shop Information" page
    Then I should be able to fill in the shop details
    And I should be able to activate the shop
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |