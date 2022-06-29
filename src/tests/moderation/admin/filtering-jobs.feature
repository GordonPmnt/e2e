Feature: Jobs filtering

  Scenario: Filtering by entity type
    Given a "POST" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "SELF_HARM"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    When I filter jobs by "POST" type
    Then I should see only "POST" entities

  Scenario: Filter by report reason
    Given a "POST" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "HARASSMENT_HATE"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    When I filter jobs by "HARASSMENT_HATE" reason
    Then I should see only entities with "HARASSMENT_HATE" reason

  Scenario: Filter by entity type and report reason
    Given a "POST" created by "MOD_MEMBER_1" has been reported by "MOD_MEMBER_2" to "AAQUA" with reason "ANSA"
    And I am logged in the "ADMINISTRATION" app as user "MOD_INTERNAL_MODERATOR_1"
    When I filter jobs by "POST" type
    And I filter jobs by "ANSA" reason
    Then I should see only "POST" entities
    And I should see only entities with "ANSA" reason
