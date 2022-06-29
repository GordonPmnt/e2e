@team-analytics
Feature: Analytics > Dashboard url validation

  Background:
    Given I am logged in the "WEB" app as user "ANALYTICS_ONE"

  Scenario: Url contains unexpected characters in timestamps
    When I add non integer from & to to the url query
    Then I see "Invalid query: Period must be an integer. Fallback to default period (Last 30 days)"

  Scenario: Url contains timestamps where end date falls before start date
    When I add a from that is after the to to the url query
    Then I see "Invalid query: Start of period range cannot be after end of period range. Fallback to default period (Last 30 days)"

  Scenario: Url contains valid timestamp but invalid timezone
    When I add an invalid timezone (Foo/Bar) to the url query
    Then I see "Invalid query: Foo/Bar is not a supported time zone. Fall back to local time zone."

  Scenario: Url contains timezone that doesn’t match local timezone
    When I add a timezone that is different than mine in the url query
    Then I see "Dashboard not displayed in local timezone. Timezone used: Asia/Singapore."

  Scenario: Url contains predefined range that is not 7, 30 or 60 days
    When I add a 19 days range
    Then I see "Invalid query: Dashboard only supports predefined period ranges of 7, 30 and 60 days. Fallback to default period (Last 30 days)."