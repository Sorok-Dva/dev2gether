Feature: Registration
  In order to use Dev2Gether
  As a user
  I want to be able to register

  Scenario: 'Standard Registration'
    Given I am not currently logged in
    When I am on the signup page
    Then I should see "Sign Up"
    And I fill in "Name (required)" with "Sorok Dva"
    And I fill in "Email (required)" with "sorok@dva.com"
    And I fill in "Password (required)" with "password"
    And I fill in "Password confirmation" with "password"
    And I press "Register"
    Then I should see "Sign Up - Confirm Your Account"
    Then I should be on the registration thank you page
    Then "sorok@dva.com" should receive an email
    When I open the email
    Then I should see "Confirm my account" in the email body
    When I follow "Confirm my account" in the email
    Then I should be on the welcome page
    And I should see "Welcome to Dev2Gether"
