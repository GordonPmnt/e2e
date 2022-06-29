Feature: Verify analytics members page

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"
    And I am on the "Analytics Squad" "Analytics" "Members" page

  Scenario: Analytics member verifies the Analytics - Member page
    Then I can see the community members status details and graphs

    Examples:
      | user          | community  |
      | ANALYTICS_ONE | Aaquatopia |

  Scenario: User guide banner is displayed on the Members page
    Then I can see a user guide banner on the page