/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Teste,teste,Teste, teste,Teste, teste,Teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,Teste, teste,'
        
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Camilo')
        cy.get('#email').type('leonardo100camilo@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Leonardo')
        cy.get('#lastName').type('Camilo')
        cy.get('#email').type('leonardo100camilo@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Camilo')
    cy.get('#email').type('leonardo100camilo@gmail.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName').type('Leonardo')
    .should('have.value', 'Leonardo')
    .clear()
    .should('have.value','')
    cy.get('#lastName').type('Camilo')
    .should('have.value', 'Camilo')
    .clear()
    .should('have.value','')
    cy.get('#email').type('leonardo100camilo@gmail.com')
    .should('have.value', 'leonardo100camilo@gmail.com')
    .clear()
    .should('have.value','')
    cy.get('#phone').type('11999999999')
    .should('have.value', '11999999999')
    .clear()
    .should('have.value','')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function(){
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})
  