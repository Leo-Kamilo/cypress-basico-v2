/// <reference types="Cypress" />

describe('Teste Sistema Autovist', function() {
    beforeEach(function(){
        cy.visit('https://autovist.com.br/login/')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Autovist')
    })

    it.only('preenche os campos e faz login', function(){
        cy.get('#id_email').type(Cypress.env('user_name'))
        cy.get('#id_senha').type(Cypress.env('user_password'))
        cy.wait(3000)
        cy.get('#logar').click()
    })
  })
  