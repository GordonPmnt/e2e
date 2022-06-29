Feature: Verify analytics members page

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"
    And I am on the "Analytics Squad" "Analytics" "Members" page

  Scenario: Analytics member verifies the Analytics - Member page
    Then I can see the community members status details and graphs

  @Smoke
  Scenario: User guide banner is displayed on the Members page
    Then I can see a user guide banner on the page

  @Smoke
  Scenario: Reputation score distribution chart data is available
    Then I can see the reputation score distribution chart with data

  @Smoke
  Scenario: Total metrics are displayed on the Members page
    Then I can see that Total Members metric has correct value

  @Smoke
  Scenario Outline: "<name>" delta cards functionality
    Given I apply a custom period of "2" days starting from "12/06/2021"
    Then the "<name>" delta card has "<title>" title, "<value>" value and "<comparison_value>" "<comparison>" comparison

    Examples:
      | name      | title   | value | comparison_value | comparison |
      | members   | Joiners | 1     | 1                | more       |
      | dashboard | Leavers | 1     | 1                | more       |

  Scenario Outline: Tooltip on "<name>" chart
    Given I hover on the "<name>" chart
    Then I see a tooltip displayed on the "<name>" chart

    Examples:
      | name               |
      | members-evolution  |
      | joiners-vs-leavers |
