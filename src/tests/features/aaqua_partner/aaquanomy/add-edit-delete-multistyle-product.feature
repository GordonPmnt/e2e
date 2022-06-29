Feature: Add, edit and delete a multi style product

  Background:
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    And I am on the "Internal Shop Fandom" "Shop" "Products" page

  Scenario: Community admin adds a multi style product
    When I add a multi style product
    Then I see the saved multi style product
    And I log out

  Scenario: Community admin edits a multi style product
    When I edit a multi style product
    Then I see the edited multi style product
    And I log out

  Scenario: Community admin deletes some styles from a multi style product
    When I delete some styles
    Then I do not see the deleted styles on the styles table
    And I delete the product
    And I log out
