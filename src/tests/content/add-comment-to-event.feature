Feature: Comment addition to Event

  Capability of a community administrator to add a comment to events

  Background:
    Given I created an event without comments as user "CAT_ADMIN"
    And I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Activities" page

  Scenario: Add a comment to an event
    When I visit the event's detail page
    And I add a comment to the event
    Then I should see the comment in the event's detail page