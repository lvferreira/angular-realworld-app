describe('tags', () => {

    beforeEach('sign in', () => {
        cy.intercept({ method: 'GET', path: 'tags' }, { fixture: 'tags.json' })
        cy.appSignIn()
    })
    it('should display popular tags', () => {
        cy.log('Hooray we logged in!')
        cy.get('.tag-list')
            .should('contain', 'cypress')
            .and('contain', 'javascript')
            .and('contain', 'test')
    })
})