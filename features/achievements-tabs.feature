Feature: Achievements timeline tabs
  The About Us page's achievements timeline is an accessible tabs widget
  (WAI-ARIA tabs pattern).

  Background:
    Given I am on the "/InnerCityClubFootballAboutUs.html" page

  Scenario: The 2003 tab is selected by default
    Then the "2003" tab should be selected
    And the "2003" achievements panel should be visible
    And the "2021" achievements panel should be hidden

  Scenario: Clicking a tab switches the visible panel
    When I click the "2021" tab
    Then the "2021" tab should be selected
    And the "2003" tab should not be selected
    And the "2021" achievements panel should be visible
    And the "2003" achievements panel should be hidden

  Scenario: Arrow keys move focus and selection between tabs
    Given the "2003" tab is focused
    When I press "ArrowRight"
    Then the "2004" tab should be focused
    And the "2004" tab should be selected
    And the "2004" achievements panel should be visible

  Scenario: The End key jumps to the last tab
    Given the "2003" tab is focused
    When I press "End"
    Then the "2021" tab should be focused
    And the "2021" achievements panel should be visible
