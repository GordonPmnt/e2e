Feature: Verify analytics shares page

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"
    And I am on the "Analytics Squad" "Analytics" "Shares" page

  @Smoke
  Scenario: Analytics member verifies the Analytics - Shares page
    Then I can see the community shares status details and graphs
