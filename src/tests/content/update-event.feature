Feature: Event update

  Capability of a community administrator to update events

  Background:
    And I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Activities" page

  Scenario: Update an event
    When I update the title of the event
    Then the event is updated
