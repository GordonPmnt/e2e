Feature: Post creation

  Capability of a community administrator to create posts

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"
    And I am on the "E2E Web CAT" "Content Management" "Create Post" page

  Scenario: Create a post
    When I fill in the post creation form
    Then the post is created