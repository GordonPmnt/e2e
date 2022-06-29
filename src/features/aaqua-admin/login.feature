Feature: Login test

  Scenario: Moderator can login and see the list of Jobs
    When I am logged in the "ADMINISTRATION" app as user "<user>"
    Then user can view the list of Jobs

    Examples:
      | user                     |
      | MOD_INTERNAL_MODERATOR_1 |
      | MOD_EXTERNAL_MODERATOR_1 |

  Scenario: Regular user cannot login
    When I am logged in the "ADMINISTRATION" app as user "MOD_MEMBER_1"
    Then user cannot view the list of Jobs
