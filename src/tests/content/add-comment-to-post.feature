Feature: Comment addition to Post

  Capability of a community administrator to add a comment to posts

  Background:
    Given I created a post without comments as user "CAT_ADMIN"
    And I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Posts" page

  Scenario: Add a comment to a post
    When I visit the post's detail page
    And I add a comment to the post
    Then I should see the comment in the post's detail page