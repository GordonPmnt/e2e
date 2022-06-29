Feature: Posts list

  List posts of a specific community

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Posts" page

  Scenario: List posts
    Given I see posts on the page

  Scenario: Pinning a post
    Given I created an unpinned "post" as user "CAT_ADMIN"
    When I pin the "post"
    Then the "post" is pinned

  Scenario: Unpinning a post
    Given I created a pinned "post" as user "CAT_ADMIN"
    When I unpin the "post"
    Then the "post" is unpinned
