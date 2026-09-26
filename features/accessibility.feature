Feature: Accessibility audit
  Every page should pass an automated WCAG 2.1 A/AA audit (axe-core), scoped
  to our own markup — third-party embeds (Google Maps/Forms, the Facebook
  page plugin) are outside our control and outside this conformance claim.

  Scenario Outline: A page has no detectable WCAG 2.1 A/AA violations
    Given I am on the "<path>" page
    Then an automated accessibility scan should report no violations

    Examples:
      | path                                      |
      | /index.html                               |
      | /InnerCityClubFootballAboutUs.html         |
      | /InnerCityClubFootballContactUs.html       |
      | /InnerCityClubFootballPolicies.html        |
      | /InnerCityClubFootballSafeguarding.html    |
      | /InnerCityClubFootballCOVID19.html         |
