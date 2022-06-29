Feature: Poll creation

  Capability of a community administrator to create polls

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Create Activity" page

  Scenario: Create a poll
    When I fill in the poll creation form
    Then the poll is created