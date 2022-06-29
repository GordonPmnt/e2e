Feature: Proactive moderation

  Scenario Outline: Internal moderator looks for "<entity_type>" and proactively decides to take an action on it
    Given a "<entity_type>" has been created by "MOD_MEMBER_1"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    When I look for the non reported entity
    And I proactively review the job and hide it with the violationType CHILD
    Then the entity is "hidden" for member "MOD_MEMBER_1" in "community, highlight, event" feeds

    Examples:
      | entity_type |
      | POST        |
      | EVENT       |
      | POLL        |