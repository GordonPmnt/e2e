Feature: Community navigation

  Testing navigation between fandoms

  Background:
    Given I am logged in the "WEB" app as user "CAT_ADMIN"
    Given I navigate to "E2E Web CAT" community

 # Scenario: Navigation from fandom to fandom information
  #  When I navigate to the "Community Settings" - "Community information" page
  #  Then I am redirected to the "Community information" page
  #  And I see "E2E Web CAT" information in the main area

  Scenario: Navigation from any page to home page using Aaqua logo
    When I click on Aaqua logo in the header
    Then I am redirected to the "Communities" page


  Scenario: Navigation from fandom to fandom posts page
    When I navigate to the "Content Management" - "Posts" page
    Then I am redirected to the "Pages" page