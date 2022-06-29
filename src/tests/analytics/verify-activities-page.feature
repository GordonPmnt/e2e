Feature: Verify analytics activities page

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"
    And I am on the "Analytics Squad" "Analytics" "Activities" page

  @Smoke
  Scenario: Analytics member verifies the Analytics - Activities page
    Then I can see the community activities status details and graphs
