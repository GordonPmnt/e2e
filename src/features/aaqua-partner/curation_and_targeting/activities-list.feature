Feature: Activities list

  List activities of a specific community

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Activities" page

  Scenario: List activities
    Given I see events and polls on the page

  Scenario: Pagination
    Given I see the pagination buttons in the bottom of the page
    Then I can navigate to the next page
    And I can navigate to the previous page

  Scenario Outline: Pinning an activity
    Given I created an unpinned "<activity_type>" as user "CAT_ADMIN"
    When I pin the "<activity_type>"
    Then the "<activity_type>" is pinned

    Examples:
      | activity_type |
      | event         |
      | poll          |

  Scenario Outline: Unpinning an activity
    Given I created a pinned "<activity_type>" as user "CAT_ADMIN"
    When I unpin the "<activity_type>"
    Then the "<activity_type>" is unpinned

    Examples:
      | activity_type |
      | event         |
      | poll          |
