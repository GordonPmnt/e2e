Feature: Hidden entity is not visible in the feeds

  @slow
  Scenario Outline: Hidden "<entity_type>" is not visible
    Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
    And the entity is "visible" for member "<reporter>" in "community, highlight, event" feeds
    And the entity is "visible" for creator "<creator>" in "profile, event" feeds
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    When I review the job and hide it with the violationType "CHILD"
    Then the entity is "hidden" for member "<reporter>" in "community, highlight, event" feeds
    And the entity is "hidden" for creator "<creator>" in "profile, event" feeds

    Examples:
      | entity_type | creator      | reporter     | moderator_level | reason          |
      | POST        | MOD_MEMBER_1 | MOD_MEMBER_2 | AAQUA           | HARASSMENT_HATE |
      | POLL        | MOD_ADMIN    | MOD_MEMBER_2 | AAQUA           | HARASSMENT_HATE |
      | EVENT       | MOD_ADMIN    | MOD_MEMBER_2 | AAQUA           | HARASSMENT_HATE |
