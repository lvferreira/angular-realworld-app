describe('feed', () => {
    beforeEach('sign in', () => {
        cy.appSignIn()
    })
    it('should validate global feed likes count', () => {
        cy.intercept('GET', 'https://api.realworld.io/api/articles/feed*', { "articles": [], "articlesCount": 0 })
        cy.intercept('GET', 'https://api.realworld.io/api/articles*', { fixture: 'articles.json' })

        cy.contains('Global Feed').click()
        // cy.wait(5)
        cy.get('app-article-list button')
            .should('be.visible')
            .then(likes => {
                expect(likes[0]).to.contain(' 1 ')
                expect(likes[1]).to.contain(' 5 ')
            })

        cy.fixture('articles').then(file => {
            const id = file.articles[1].slug
            file.articles[1].favoritesCount = 6
            cy.log(id)
            cy.log(file.articles[1].favoritesCount)

            cy.intercept('POST', 'https://api.realworld.io/api/articles/' + id + '/favorite', file)
        })
        cy.get('app-article-list button').eq(1).click().should('contain', '6')
    })
    it('should delete new article from global feed', () => {
        cy.get('@token')
            .then(token => {
                const payload = {
                    "article": {
                        "tagList": [
                            "#newarticle"
                        ],
                        "title": "A cool title over here",
                        "description": "An awesome description over here",
                        "body": "A body of description right here"
                    }
                }

                cy.request({
                    url: 'https://api.realworld.io/api/articles/',
                    headers: {
                        'Authorization': 'Token ' + token
                    },
                    method: 'POST',
                    body: payload
                }).then(response => {
                    expect(response.status).to.equal(200)
                })

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
                        expect(body.articles[0].title).not.to.equal(payload.article.title)
                    })
            })
    })
})