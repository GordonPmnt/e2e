Feature: Reviewed job goes to history
  Background:
    Given a "POST" has been created by "MOD_MEMBER_1"
    And the created "POST" has been reported to "AAQUA" with reason "HARASSMENT_HATE" by member "MOD_MEMBER_2"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    And I review the job and hide it with the violationType "CHILD"

  Scenario: Internal moderator sees reviewd job in history page
    When I navigate to the history page
    Then I see the reviewed entity with "Child Safety"

