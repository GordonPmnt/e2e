Feature: Add, edit and delete a single product

  Scenario Outline: Community admin adds a single product
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Products" page
    And I add a single product
    Then I see the saved single style product
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |

  Scenario Outline: Community admin edits a single product
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Products" page
    And I edit a single product
    Then I see the edited single style product
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |

  Scenario Outline: Community admin deletes a single product
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Products" page
    And I delete a single product
    Then I do not see the single product on the products listing page
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |