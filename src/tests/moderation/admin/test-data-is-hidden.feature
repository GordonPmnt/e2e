Feature: Test data is hidden

  Scenario Outline: A reported POST in a test community is not visible by "<administrator>"
    Given a "POST" is created, visible and reported to AAQUA
    And the created moderation job is visible to "MOD_INTERNAL_MODERATOR_1"
    When I am logged in the "ADMINISTRATION" app as user "<administrator>"
    Then I can not see the reported job

    Examples:
      | administrator      |
      | EXTERNAL_MODERATOR |
      | INTERNAL_MODERATOR |
