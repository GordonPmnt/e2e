Feature: Deactivate a shop

  Scenario Outline: Fandom admin deactivates the shop
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Shop Information" page
    Then I should be able to deactivate the shop
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |