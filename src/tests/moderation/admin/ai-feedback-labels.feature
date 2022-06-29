Feature: Labelling content units

	Scenario Outline: Display AI labels on pictures from a "<entity_type>"
		Given the image "moderation_nudity.png" has been uploaded by "<creator>"
		And a "<entity_type>" has been created by "<creator>" with image
		And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
		And an offensive content been detected by AI
		When I navigate to the reported entity detail
		Then I see the ai label "ANSA" close to the inadequate content

		Examples:
			| entity_type | creator      |
			| POST        | MOD_MEMBER_1 |
			| EVENT       | MOD_ADMIN    |


	Scenario Outline: Display AI labels on text blocks from a "<entity_type>"
		Given a "<entity_type>" has been created by "<creator>" with text "You are retarded"
		And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
		And an offensive content been detected by AI
		When I navigate to the reported entity detail
		Then I see the ai label "Harassment/Hate" close to the inadequate content

		Examples:
			| entity_type | creator      |
			| POST        | MOD_MEMBER_1 |
			| EVENT       | MOD_ADMIN    |
			| POLL        | MOD_MEMBER_1 |
