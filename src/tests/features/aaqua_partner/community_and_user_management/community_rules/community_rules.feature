@team-fnu
Feature: Community rules

  Background:
    Given I am logged in the "WEB" app as user "FNU_ONE"
    And I am on the "FNU_HIDDEN_WEB_1" "Community Settings" "Community Rules" page

  Scenario: Community rules overview
    Then I see the rules information message
    And I see all default community rules

  Scenario: Add new community rule
    When I add new community rule with title "rule_title" and content "rule_content"
    Then I can see the title "rule_title" and content "rule_content" on the rules page for rule "5"

  Scenario: Edit existing community rule
    When I edit the community rule "0" with title "rule_title" and content "rule_content"
    Then I can see the title "rule_title" and content "rule_content" on the rules page for rule "0"

  Scenario: Delete existing community rule
    When I delete the community rule "0"
    Then I can't see the deleted rule "0" anymore
