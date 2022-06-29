
Feature: Verify reported reasons for a reported entity

	Scenario Outline: Internal moderator verifies the reported reason of a reported "<entity_type>"
		Given a "<entity_type>" created by "<creator>" has been reported by "MOD_MEMBER_2" to "<moderator_level>" with reason "<reported_reason>"
		And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
		When I filter jobs by "<entity_type>" type
		And I filter jobs by "<reported_reason>" reason
		Then I should see the reported entity with "<reported_reason_badge>"
		And I review the job and keep it visible

		Examples:
			| entity_type | creator      | moderator_level | reported_reason | reported_reason_badge |
			| POST        | MOD_MEMBER_1 | AAQUA           | HARASSMENT_HATE | Harassment/Hate       |
			| POLL        | MOD_MEMBER_1 | AAQUA           | HARASSMENT_HATE | Harassment/Hate       |
			| EVENT       | MOD_ADMIN    | AAQUA           | HARASSMENT_HATE | Harassment/Hate       |


	Scenario Outline: Internal moderator verifies the reported reason of a reported comment
		Given a "<entity_type>" created by "<creator>" has been reported by "MOD_MEMBER_2" to "<moderator_level>" with reason "<reported_reason>"
		And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
		And I filter jobs by "COMMENT" type
		And I filter jobs by "<reported_reason>" reason
		Then I should see the reported entity with "<reported_reason_badge>"
		And I review the job and keep it visible

		Examples:
			| entity_type  | creator      | moderator_level | reported_reason | reported_reason_badge |
			| POST_COMMENT | MOD_MEMBER_1 | AAQUA           | HARASSMENT_HATE | Harassment/Hate       |