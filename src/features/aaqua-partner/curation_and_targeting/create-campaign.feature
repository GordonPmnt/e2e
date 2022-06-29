Feature: Campaign creation

Capability of a community administrator to create campaigns

Background:
  Given I am logged in the "WEB" app as user "CAT_ADMIN"
  And I am on the "E2E Web CAT" "Campaigns" "Create Campaign" page

Scenario Outline: Create a campaign
  When I fill in the "<campaign_type>" campaign creation form
  Then the campaign is created

  Examples:
    | campaign_type |
    | announcement  |
    | onboarding    |