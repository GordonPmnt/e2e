Feature: Appeal entity as creator

  Background:
    Given a "POST" has been created by "MOD_MEMBER_1"

  Scenario: Appeal post as a creator
    Given the created "POST" has been reported to "AAQUA" with reason "HARASSMENT_HATE" by member "MOD_MEMBER_2"
    And entity is hidden by "MOD_INTERNAL_MODERATOR_1" with the violationType "CHILD"
    And entity is appealed by "MOD_MEMBER_1"
    When I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    Then I should see that "POST" is appealed by "CREATOR"
    And I should see that the "CREATOR" appeal notes are present

  Scenario: Appeal comment as a reporter
    Given a "COMMENT" has been created by "MOD_MEMBER_1"
    And the created "COMMENT" has been reported to "AAQUA" with reason "HARASSMENT_HATE" by member "MOD_MEMBER_2"
    And entity is kept by "MOD_INTERNAL_MODERATOR_1"
    And entity is appealed by "MOD_MEMBER_2"
    When I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    Then I should see that "COMMENT" is appealed by "REPORTER"
    And I should see that the "REPORTER" appeal notes are present
