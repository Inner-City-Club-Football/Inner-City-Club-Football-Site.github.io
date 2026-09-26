Feature: COVID-19 team accordion
  The COVID-19 team contacts are presented as an accessible accordion, where
  each item can be expanded independently of the others.

  Background:
    Given I am on the "/InnerCityClubFootballCOVID19.html" page

  Scenario: Panels start collapsed
    Then the "acc-officer" accordion panel should be hidden
    And the first accordion trigger should be collapsed

  Scenario: Clicking a trigger reveals only its own panel
    When I click the "acc-officer" accordion trigger
    Then the "acc-officer" accordion panel should be visible
    And the "acc-officer" accordion panel should contain "Rizwan Deasi"
    And the "acc-liaison" accordion panel should be hidden

  Scenario: Multiple accordion panels can be open at the same time
    When I click the "acc-officer" accordion trigger
    And I click the "acc-liaison" accordion trigger
    Then the "acc-officer" accordion panel should be visible
    And the "acc-liaison" accordion panel should be visible

  Scenario: Clicking an open trigger collapses it again
    When I click the "acc-officer" accordion trigger
    Then the "acc-officer" accordion panel should be visible
    When I click the "acc-officer" accordion trigger
    Then the "acc-officer" accordion panel should be hidden
    And the "acc-officer" accordion trigger should be collapsed
