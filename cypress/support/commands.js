Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Camilo')
    cy.get('#email').type('leonardo100camilo@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})