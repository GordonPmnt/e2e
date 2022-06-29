Feature: Verify analytics posts page

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"
    And I am on the "Analytics Squad" "Analytics" "Posts" page

  @Smoke
  Scenario: Analytics member verifies the Analytics - Posts page
    Then I can see the community posts status details and graphs