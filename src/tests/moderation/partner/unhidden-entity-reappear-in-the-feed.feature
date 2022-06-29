Feature: Unhidden entity re-appears in the feeds

	@slow
	Scenario Outline: unhidden "<entity_type>" is visible in the feed
		Given a "<entity_type>" created by "<creator>" has been reported by "<reporter>" to "<moderator_level>" with reason "<reason>"
		And I am logged in the "WEB" app as user "MOD_ADMIN"
		And I review the job and hide it with the violationType "CHILD"
		And the entity is "hidden" for member "<reporter>" in "community, highlight, event" feeds
		And the entity is "hidden" for creator "<creator>" in "profile, event" feeds
		When I update the moderation decision by making it appear again
		Then the entity is "visible" for member "<reporter>" in "community, highlight, event" feeds
		And the entity is "visible" for creator "<creator>" in "profile, event" feeds

		Examples:
			| entity_type | creator      | reporter     | moderator_level | reason          |
			| POST        | MOD_MEMBER_2 | MOD_MEMBER_1 | COMMUNITY       | HARASSMENT_HATE |
