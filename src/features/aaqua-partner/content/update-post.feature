Feature: Post update

Capability of a community administrator to update posts

Background:
  Given I created a post as user "CAT_ADMIN"
  And I am logged in the "WEB" app as user "CAT_ADMIN"
  And I am on the "E2E Web CAT" "Content Management" "Posts" page

Scenario: Update a post
  When I update the title of the post
  Then the post is updated
