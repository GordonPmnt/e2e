Feature: Onboarding Campaign update

Capability of a community administrator to update onboarding campaigns

Background:
  And I am logged in the "WEB" app as user "CAT_ADMIN"
  And I am on the "E2E Web CAT" "Campaigns" "Onboarding" page

Scenario: Update an onboarding campaign
  When I update the description of the campaign
  Then the campaign is updated
