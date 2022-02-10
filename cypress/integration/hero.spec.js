///<reference types="cypress" />

describe('Suite de Teste Hero', () => {
    it('Realizar Cadastro de Ongs', () => {
        cy.visit('/')
        cy.contains('Não tenho cadastro').click()
        cy.get('h1').should('have.text','Cadastro')
        cy.get('[data-cy="name"]').type('Ajudando o próximo')
        cy.get('[data-cy="email"]').type('teste@ap.com.br')
        cy.get('[data-cy="whatsapp"]').type('51999999999')
        cy.get('[data-cy="city"]').type('Porto Alegre')
        cy.get('[data-cy="uf"]').type('RS')
        cy.intercept('POST','http://localhost:3333/ongs').as('ongs')
        cy.contains('Cadastrar').click()
        cy.wait('@ongs').then(xhr =>{
            expect(xhr.request.body.city).to.eq('Porto Alegre')
            expect(xhr.request.body.name).to.eq('Ajudando o próximo')
            expect(xhr.request.body.email).to.eq('teste@ap.com.br')
            expect(xhr.request.body.whatsapp).to.eq('51999999999')
            expect(xhr.response.body.id).is.not.null
        })
    });
});