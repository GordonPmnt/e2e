Feature: Verify analytics posts page

  Scenario Outline: Analytics member verifies the Analytics - Posts page
    Given I am logged in the "WEB" app as user "<user>"
    When I am on the "<community>" "Analytics" "Posts" page
    Then I can see the community posts status details and graphs

    Examples:
      | user          | community  |
      | ANALYTICS_ONE | Aaquatopia |
