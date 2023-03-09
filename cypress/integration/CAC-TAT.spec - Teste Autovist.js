/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('https://autovist.com.br/login/')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Autovist')
    })

    it.only('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#id_email').type(Cypress.env('user_name'))
        cy.get('#id_senha').type(Cypress.env('user_password'))
        cy.get('#logar').click()

    })
  })
  