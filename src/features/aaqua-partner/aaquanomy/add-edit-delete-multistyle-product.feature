Feature: Add, edit and delete a multi style product

  Scenario Outline: Community admin adds a multi style product
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Products" page
    And I add a multi style product
    Then I see the saved multi style product
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |

  Scenario Outline: Community admin edits a multi style product
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Products" page
    And I edit a multi style product
    Then I see the edited multi style product
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |

  Scenario Outline: Community admin deletes some styles from a multi style product
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    When I am on the "<community>" "Shop" "Products" page
    And I delete some styles
    Then I do not see the deleted styles on the styles table
    And I delete the product
    And I log out

    Examples:
      | community            |
      | Internal Shop Fandom |