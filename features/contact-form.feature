Feature: Contact form submission
  The Contact Us page posts directly to the underlying Google Form's response
  endpoint. These scenarios intercept that request so running the suite never
  writes real rows into the club's Google Sheet.

  Background:
    Given I am on the "/InnerCityClubFootballContactUs.html" page
    And submissions to the Google Form endpoint are intercepted

  Scenario: Submitting the form sends the correct fields to the Google Form
    When I fill in the contact form with valid details
    And I submit the contact form
    Then the status message should eventually contain "Thanks"
    And the submitted Google Form fields should match the details I entered

  Scenario: A successful submission hides the form and shows a success message
    When I fill in the contact form with valid details
    And I submit the contact form
    Then the status message should have the "success" style
    And the contact form should be hidden

  Scenario: Submitting with empty required fields does not send a request
    When I submit the contact form
    Then no request should have been sent to the Google Form endpoint
    And the contact form should still be visible

  Scenario: A failed request shows an error and re-enables the submit button
    Given the Google Form endpoint will fail to respond
    When I fill in the contact form with valid details
    And I submit the contact form
    Then the status message should have the "error" style
    And the submit button should read "Send message"
    And the submit button should be enabled
