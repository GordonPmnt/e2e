Feature: AI detection of the offensive content

  Scenario Outline: "<entity_type>" with offensive text is detected by AI
    Given a "<entity_type>" has been created by "<creator>" with text "You are retarded"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    And an offensive content been detected by AI
    When I navigate to the reported entity detail
    Then I see AI reports for "Harassment/Hate"
    Examples:
      | entity_type  | creator      |
      | EVENT        | MOD_ADMIN    |
      | POLL         | MOD_MEMBER_1 |
      | POST         | MOD_MEMBER_1 |
      | POST_COMMENT | MOD_MEMBER_1 |

  Scenario Outline: "<entity_type>" with offensive image is detected by AI
    Given the image "moderation_offensive_content.jpg" has been uploaded by "<creator>"
    And a "<entity_type>" has been created by "<creator>" with image
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    And an offensive content been detected by AI
    When I navigate to the reported entity detail
    Then I see AI reports for "Violent or Gory"
    Examples:
      | entity_type  | creator      |
      | EVENT        | MOD_ADMIN    |
      | POST         | MOD_MEMBER_1 |
      | POST_COMMENT | MOD_MEMBER_1 |
