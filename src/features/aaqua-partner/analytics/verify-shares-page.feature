Feature: Verify analytics shares page

  Scenario Outline: Analytics member verifies the Analytics - Shares page
    Given I am logged in the "WEB" app as user "<user>"
    When I am on the "<community>" "Analytics" "Shares" page
    Then I can see the community shares status details and graphs

    Examples:
      | user          | community  |
      | ANALYTICS_ONE | Aaquatopia |
