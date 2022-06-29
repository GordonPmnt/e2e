Feature: Add, edit and delete a single product

  Background:
    Given I am logged in the "WEB" app as user "SHOP_ADMIN"
    And I am on the "Internal Shop Fandom" "Shop" "Products" page

  Scenario: Community admin adds a single product
    When I add a single product
    Then I see the saved single style product
    And I log out

  Scenario: Community admin edits a single product
    When I edit a single product
    Then I see the edited single style product
    And I log out

  Scenario: Community admin deletes a single product
    When I delete a single product
    Then I do not see the single product on the products listing page
    And I log out