Feature: Event creation

  Capability of a community administrator to create events

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Create Activity" page

  Scenario: Create an event
    When I fill in the event creation form
    Then the event is created