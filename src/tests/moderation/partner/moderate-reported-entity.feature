Feature: Moderate a reported entity


	@slow
	Scenario Outline: keep "<entity_type>" visible
		Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		And I navigate to "E2E Web Moderation 3" community
		When I review the job in the partner site and keep it visible
		Then the entity is "visible" for member "<reporter>" in "community, highlight, event" feeds
		And the entity is "visible" for creator "<creator>" in "profile, event" feeds

		Examples:
			| entity_type | creator      | reporter     | moderator_level | reason          |
			| POST        | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| POLL        | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| EVENT       | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |


	@slow
	Scenario Outline: hide "<entity_type>"
		Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
		And the entity is "visible" for member "<reporter>" in "community, highlight, event" feeds
		And the entity is "visible" for creator "<creator>" in "profile, event" feeds
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		When I review the job and hide it with the violationType "CHILD"
		Then the entity is "hidden" for member "<reporter>" in "community, highlight, event" feeds
		And the entity is "hidden" for creator "<creator>" in "profile, event" feeds
		Examples:
			| entity_type | creator      | reporter     | moderator_level | reason          |
			| POST        | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| POLL        | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
			| EVENT       | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE |
