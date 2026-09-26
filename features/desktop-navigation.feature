Feature: Desktop navigation
  On wide viewports, the full navigation is always visible and the "About"
  menu behaves as an accessible dropdown.

  Background:
    Given I am using a desktop-sized viewport
    And I am on the "/index.html" page

  Scenario: The hamburger toggle is hidden and the full nav is shown
    Then the "nav-toggle" button should be hidden
    And the "primary-nav" navigation should be visible

  Scenario: The About dropdown opens on click and closes on Escape
    Then the "about-menu" dropdown should be hidden
    When I click the "About" dropdown toggle
    Then the "about-menu" dropdown should be visible
    And the "About" dropdown toggle should be expanded
    When I press "Escape"
    Then the "about-menu" dropdown should be hidden
    And the "About" dropdown toggle should be collapsed

  Scenario: The About dropdown closes when clicking outside it
    When I click the "About" dropdown toggle
    Then the "about-menu" dropdown should be visible
    When I click outside the navigation
    Then the "about-menu" dropdown should be hidden

  Scenario: The current page is marked with aria-current
    Given I am on the "/InnerCityClubFootballContactUs.html" page
    Then the nav link marked as current should read "Contact Us"
