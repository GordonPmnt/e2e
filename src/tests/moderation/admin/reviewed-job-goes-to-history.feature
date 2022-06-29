Feature: Reviewed job goes to history
  Scenario: Internal moderator sees reviewed job in history page
    Given a "POST" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "HARASSMENT_HATE"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    And I review the job and hide it with the violationType "CHILD"
    When I navigate to the history page
    Then I see the reviewed entity with "Child Safety"

