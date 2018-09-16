Feature: In order to use the application
  As a register user
  I want to be able to login

  @login
  Scenario: valid Login

    Given I am a valid registered user
    And I navigate to login page
    When I login to system
    Then I 'should be' logged in

  @login
  Scenario: Invalid Login

    Given I am an invalid user
    And I navigate to spree portal
    When I login to system
    Then I 'should not be' logged in
