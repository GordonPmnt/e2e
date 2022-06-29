Feature: Escalate a moderation job to the ESCALATIONS queue

  Scenario Outline: Escalate a "<entity_type>"
    Given a "<entity_type>" created by "<creator>" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "HARASSMENT_HATE"
    And I am logged in the "ADMINISTRATION" app as user "MOD_EXTERNAL_MODERATOR_1"
    When I escalate the reported entity to ESCALATIONS
    Then the reported entity should be visible in the ESCALATIONS queue

    Examples:
      | entity_type   | creator      |
      | POST          | MOD_MEMBER_1 |
      | POLL          | MOD_MEMBER_1 |
      | EVENT         | MOD_ADMIN    |
      | POST_COMMENT  | MOD_MEMBER_1 |
      | POLL_COMMENT  | MOD_MEMBER_1 |
      | EVENT_COMMENT | MOD_ADMIN    |
