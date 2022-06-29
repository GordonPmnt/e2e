Feature: Comment addition to Poll

  Capability of a community administrator to add a comment to polls

  Background:
    Given I created a poll without comments as user "CAT_ADMIN"
    And I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Activities" page

  Scenario: Add a comment to a poll
    When I visit the poll's detail page
    And I add a comment to the poll
    Then I should see the comment in the poll's detail page