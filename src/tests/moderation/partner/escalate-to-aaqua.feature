Feature: Escalate a moderation job to the AAQUA queue

	Scenario Outline: Escalate a "<entity_type>"
		Given a "<entity_type>" created by "<creator>" has been reported by "MOD_MEMBER_2" to "COMMUNITY" with reason "HARASSMENT_HATE"
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		And I navigate to "E2E Web Moderation 3" community
		When I escalate the reported entity moderation job to AAQUA
		Then the reported entity should be visible in the AAQUA queue

		Examples:
			| entity_type   | creator      |
			| EVENT         | MOD_ADMIN    |
			| EVENT_COMMENT | MOD_ADMIN    |
			| POLL          | MOD_MEMBER_1 |
			| POLL_COMMENT  | MOD_MEMBER_1 |
			| POST          | MOD_MEMBER_1 |
			| POST_COMMENT  | MOD_MEMBER_1 |
