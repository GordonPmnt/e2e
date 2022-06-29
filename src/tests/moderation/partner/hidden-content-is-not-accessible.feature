Feature: Content hidden by moderation is not accessible

  Scenario Outline: A "<entity_type>" hidden by moderation is not accessible
    Given a "<entity_type>" is created, visible and reported to the community
    When I review the entity and hide it
    Then the entity is not accessible anymore

    Examples:
      | entity_type   |
      | EVENT         |
      | EVENT_COMMENT |
      | POLL          |
      | POLL_COMMENT  |
      | POST          |
      | POST_COMMENT  |
