Feature: Moderate a reported comment

	Scenario Outline: keep "<entity_type>" visible
		Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		And I navigate to "E2E Web Moderation 3" community
		When I review the job in the partner site and keep it visible
		Then the comment is "visible" for member "<reporter>"

		Examples:
			| entity_type   | creator      | reporter     | moderator_level | reason          |
			| POST_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| POLL_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| EVENT_COMMENT | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |

	Scenario Outline: hide "<entity_type>"
		Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		And I navigate to "E2E Web Moderation 3" community
		When I review the job and hide it with the violationType "CHILD"
		Then the comment is "hidden" for member "<reporter>"

		Examples:
			| entity_type   | creator      | reporter     | moderator_level | reason          |
			| POST_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| POLL_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| EVENT_COMMENT | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
