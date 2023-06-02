describe('articles', () => {
    beforeEach('sign in', () => {
        cy.appSignIn()
    })
    it('should create an article', () => {
        cy.intercept('POST', 'https://api.realworld.io/api/articles/').as('newArticle')

        const article = {
            title: 'Title',
            description: 'Description',
            body: 'Body',
            tag: '#newarticle'
        }
        cy.deleteArticle(article)

        cy.get('a').contains(' New Article ').click()
        cy.get('[formcontrolname="title"]').type(article.title)
        cy.get('[formcontrolname="description"]').type(article.description)
        cy.get('[formcontrolname="body"]').type(article.body)
        cy.get('[placeholder*="tags"]').type(article.tag)
        cy.get('form').contains('Publish Article').click()

        cy.wait('@newArticle')
        cy.get('@newArticle').then(xhr => {
            console.log(xhr)
            expect(xhr.response.statusCode).to.equal(200)
            expect(xhr.response.body.article.body).to.equal('Body')
            expect(xhr.response.body.article.description).to.equal('Description')
        })
    })
    // it('should create an article', () => {
    //     // cy.intercept('POST', 'https://api.realworld.io/api/articles', (req) => {
    //     //     req.body.article.title = "A cool title here"
    //     //     req.body.article.description = "This is a description"
    //     //     req.body.article.body = "An awesomene article body"
    //     // }).as('newArticle')

    //     cy.intercept('POST', 'https://api.realworld.io/api/articles', (req) => {
    //         req.reply(res => {
    //             expect(res.body.article.description).to.equal('Description')
    //             res.body.article.description = "An awesome description here"
    //         })
    //         // req.body.article.title = "A cool title here"
    //         // req.body.article.description = "This is a description"
    //         // req.body.article.body = "An awesomeness article body"
    //     }).as('newArticle')

    //     cy.get('a').contains(' New Article ').click()
    //     cy.get('[formcontrolname="title"]').type('Title')
    //     cy.get('[formcontrolname="description"]').type('Description')
    //     cy.get('[formcontrolname="body"]').type('Body')
    //     cy.get('[placeholder*="tags"]').type('#newarticle')
    //     cy.get('form').contains('Publish Article').click()

    //     cy.wait('@newArticle')
    //     cy.get('@newArticle').then(xhr => {
    //         console.log(xhr)
    //         expect(xhr.response.statusCode).to.equal(200)
    //         expect(xhr.response.body.article.description).to.equal('An awesome description here')
    //     })
    // })
})