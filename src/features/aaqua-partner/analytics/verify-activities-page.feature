Feature: Verify analytics activities page

  Scenario Outline: Analytics member verifies the Analytics - Activities page
    Given I am logged in the "WEB" app as user "<user>"
    When I am on the "<community>" "Analytics" "Activities" page
    Then I can see the community activities status details and graphs

    Examples:
      | user          | community  |
      | ANALYTICS_ONE | Aaquatopia |
