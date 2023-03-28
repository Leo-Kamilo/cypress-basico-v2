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
    cy.get('#phone-checkbox').check()
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
    cy.get('#phone')
      .type('11999999999')
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
    cy.get('.success')
      .should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', function(){
    cy.get('#product') 
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', function(){
    cy.get('#product') 
    .select('mentoria')
    .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', function(){
    cy.get('#product') 
    .select(1)
    .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function(){
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', function(){
    cy.get('input[type="radio"]')
    .should('have.length',3)
    .each(function($radio){
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', function(){
    cy.get('input[type="checkbox"]')
     .check()
     .should('be.checked')
     .last().uncheck()
     .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })  

  it('seleciona um arquivo simulando um drag-and-drop',function() {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
    .should(function($input) {
      expect($input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias',function(){
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })  
})
  