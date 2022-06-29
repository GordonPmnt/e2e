Feature: Appeal entity as creator

  Scenario: Appeal post as a creator
    Given a "POST" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "HARASSMENT_HATE"
    And entity is hidden by "MOD_INTERNAL_MODERATOR_1" with the violationType "CHILD"
    And entity is appealed by "MOD_MEMBER_1"
    When I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    Then I should see that "POST" is appealed by "CREATOR"
    And I should see that the "CREATOR" appeal notes are present

  Scenario: Appeal comment as a reporter
    Given a "POST_COMMENT" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "HARASSMENT_HATE"
    And entity is kept by "MOD_INTERNAL_MODERATOR_1"
    And entity is appealed by "MOD_MEMBER_2"
    When I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    Then I should see that "COMMENT" is appealed by "REPORTER"
    And I should see that the "REPORTER" appeal notes are present
