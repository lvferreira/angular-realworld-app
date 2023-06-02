/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('appSignIn', () => {
    const user = {
        "user": {
            "email": Cypress.env("email"),
            "password": Cypress.env("password")
        }
    }
    cy.request('POST', Cypress.env('apiUrl') + '/api/users/login', user)
        .its('body')
        .then(body => {
            const token = body.user.token
            cy.wrap(token).as('token')
            cy.visit('/', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('jwtToken', token)
                }
            })
        })
})

Cypress.Commands.add('appSignUp', () => {
    cy.visit('/register')
    cy.get('[placeholder="Username"]').type('leo.ferreira')
    cy.get('[placeholder="Email"]').type('leo.ferreira@mail.io')
    cy.get('[placeholder="Password"]').type('Wasd@1234')
    cy.get('form').submit()
})

Cypress.Commands.add('deleteArticle', (article) => {
    cy.get('@token')
        .then(token => {
            cy.contains('Global Feed').click()
            cy.get('.article-preview').first().click()
            cy.get('.article-meta button').contains(' Delete Article ').click()

            cy.request({
                url: Cypress.env('apiUrl') + '/api/articles?limit=10&offset=0',
                headers: {
                    'Authorization': 'Token' + token
                },
                method: 'GET'
            }).its('body')
                .then(body => {
                    // console.log(body)
                    expect(body.articles[0].title).not.to.equal(article.title)
                })
        })
})