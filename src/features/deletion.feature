# Ignored as this is a "development" test, used to development/check the test data clean-up function hooks.
@ignore
Feature: Deletion of created test data

  Scenario:
    Given a "<entity_type>" created by "<creator>" has been reported by "MOD_MEMBER_2" to "COMMUNITY" with reason "HARASSMENT_HATE"

    Examples:
      | entity_type | creator      |
      | EVENT       | MOD_ADMIN    |
      | POLL        | MOD_MEMBER_1 |
      | POST        | MOD_MEMBER_1 |

  Scenario:
    Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"

    Examples:
      | entity_type   | creator      | reporter     | moderator_level | reason          |
      | POST_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
      | POLL_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
      | EVENT_COMMENT | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
