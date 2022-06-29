Feature: Activities list

  List activities of a specific community

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"

  Scenario: List activities
    Given I am on the "E2E Web CAT" "Content Management" "Activities" page
    Then I see events and polls on the page

  Scenario: Pagination
    Given I am on the "E2E Web CAT" "Content Management" "Activities" page
    And I see the pagination buttons in the bottom of the page
    Then I can navigate to the next page
    And I can navigate to the previous page

  Scenario Outline: Pinning an activity "<activity_type>"
    Given I am on the "E2E Web CAT" "Content Management" "Activities" page
    And I created an unpinned "<activity_type>" as user "CAT_ADMIN"
    When I pin the "<activity_type>"
    Then the "<activity_type>" is pinned

    Examples:
      | activity_type |
      | event         |
      | poll          |

  Scenario Outline: Unpinning an activity "<activity_type>"
    Given I am on the "E2E Web CAT" "Content Management" "Activities" page
    And I created a pinned "<activity_type>" as user "CAT_ADMIN"
    When I unpin the "<activity_type>"
    Then the "<activity_type>" is unpinned

    Examples:
      | activity_type |
      | event         |
      | poll          |