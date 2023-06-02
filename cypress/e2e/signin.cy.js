import { username } from "../support/helpers"

describe('login', () => {
  beforeEach('sign in', () => {
    cy.appSignIn()
  })
  it('should log in', () => {
    cy.get('.navbar-nav')
      .find('a[href*="/profile"]')
      .should('contain', username())
    cy.log('Hooray we logged in!')
  })
  it('should log out', { retries: 2 }, () => {
    let text = ' Or click here to logout. '
    cy.contains('Settings')
      .click()
    cy.contains(text)
      .click()
    cy.get('.navbar-nav')
      .find('a[href="/login"]')
      .should('contain', 'Sign in')
  })
})
