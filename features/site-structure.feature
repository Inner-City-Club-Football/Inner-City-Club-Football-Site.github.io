Feature: Page structure
  Every page on the site should load with correct, accessible basic structure.

  Scenario Outline: A page loads with one heading, a title, and a skip link
    Given I am on the "<path>" page
    Then the page title should match "<title>"
    And the page should have exactly 1 "h1" element
    And the skip link should point to "#main"
    And the "main#main" element should be visible

    Examples:
      | path                                      | title       |
      | /index.html                               | ICCF Leicester |
      | /InnerCityClubFootballAboutUs.html         | About Us    |
      | /InnerCityClubFootballContactUs.html       | Contact Us  |
      | /InnerCityClubFootballPolicies.html        | Policies    |
      | /InnerCityClubFootballSafeguarding.html    | Safeguarding |
      | /InnerCityClubFootballCOVID19.html         | COVID-19    |
