Feature: Double moderation fail for an entity
  Background:
    Given a "POST" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "HARASSMENT_HATE"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    And I review the job and keep it visible
    And I log out

  Scenario: Internal moderator sees alert message for double moderation
    Given I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_2"
    When  I navigate to the reported entity detail
    Then I see an alert message
