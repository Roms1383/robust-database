Feature: API find
  In order to use expose the API
  As a developer
  I want to be able to query find
  Scenario Outline: API find
    Given I want to test endpoint <endpoint>
    When I call <endpoint>
    Then I should get all occurences

    Examples:
      | endpoint |
      | at       |
      | company  |