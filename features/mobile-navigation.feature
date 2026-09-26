Feature: Mobile navigation
  On narrow viewports, the navigation collapses behind a hamburger toggle.

  Background:
    Given I am using a mobile-sized viewport
    And I am on the "/index.html" page

  Scenario: The nav is collapsed behind a hamburger toggle
    Then the "nav-toggle" button should be visible
    And the "primary-nav" navigation should be hidden

  Scenario: The hamburger opens and closes the menu
    When I click the mobile menu toggle
    Then the "primary-nav" navigation should be visible
    And the mobile menu toggle should be expanded
    When I click the mobile menu toggle
    Then the "primary-nav" navigation should be hidden
    And the mobile menu toggle should be collapsed

  Scenario: Clicking a nav link closes the mobile menu
    When I click the mobile menu toggle
    And I click the "Contact Us" nav link
    Then I should be on the "InnerCityClubFootballContactUs.html" page
