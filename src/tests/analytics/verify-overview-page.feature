Feature: Verify analytics overview page

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"
    And I am on the "Analytics Squad" "Analytics" "Overview" page

  @Smoke
  Scenario: Analytics member verifies the Analytics - Overview page
    Then I can see the community overview status details and graphs

  @Smoke
  Scenario: Total metrics are displayed on the Overview page
    Then I can see that Total Members and Total Posts metrics have correct values

  Scenario Outline: Select a predefined period "<period>"
    Given I select "<period>" period from the period dropdown
    Then the label on the graphs have the correct period "<label>"

    Examples:
      | period       | label        |
      | last 7 days  | over 7 days  |
      | last 30 days | over 30 days |
      | last 60 days | over 60 days |

  @Smoke
  Scenario: Select a custom period
    Given I select "custom" period from the period dropdown
    And the datepicker pop-up is displayed
    When I select "01" and "10" days from the calendar
    Then the label on the graphs have the correct period "over 10 days"

  Scenario Outline: "<name>" delta cards functionality
    Given I apply a custom period of "9" days starting from "02/01/2022"
    Then the "<name>" delta card has "<title>" title, "<value>" value and "<comparison_value>" "<comparison>" comparison

    Examples:
      | name    | title   | value | comparison_value | comparison |
      | members | Joiners | 2     | 2                | more       |
      | posts   | Posts   | 11    | 11               | more       |

  Scenario Outline: Tooltip on "<name>" chart
    Given I hover on the "<name>" chart
    Then I see a tooltip displayed on the "<name>" chart

    Examples:
      | name              |
      | members-evolution |
      | posts-evolution   |