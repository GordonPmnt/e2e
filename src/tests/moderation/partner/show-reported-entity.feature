Feature: Show reported entity

	Scenario Outline: reported "<entity_type>" is visible on the job page
		Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		And I navigate to "E2E Web Moderation 3" community
		When I navigate to the content moderation jobs page
		Then I should see the reported entity with "<reported_reason_badge>"

		Examples:
			| entity_type   | creator      | reporter     | moderator_level | reason          | reported_reason_badge |
			| POST          | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE | Harassment/Hate       |
			| POLL          | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE | Harassment/Hate       |
			| EVENT         | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE | Harassment/Hate       |
			| POST_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE | Harassment/Hate       |
			| POLL_COMMENT  | MOD_MEMBER_1 | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE | Harassment/Hate       |
			| EVENT_COMMENT | MOD_ADMIN    | MOD_MEMBER_2 | COMMUNITY       | HARASSMENT_HATE | Harassment/Hate       |

