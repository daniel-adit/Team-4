import lumaPage from "../../support/page-object/lumaPage"

describe('Create an Account', () => {

  function randomUser(){
    const randomString = Math.random().toString(26).substring(2,10)
    const randomEmail = randomString + '@mail.com'
    return randomEmail
  }
  let namauser = randomUser()

  beforeEach(() => {
    cy.visit('')
  })
  
  it('Create an account success', () => {
    cy.get('.panel > .header > :nth-child(3) > a').click()
    cy.get('#firstname').type('Wayne')
    cy.get('#lastname').type('Rooney')
    cy.get('#email_address').type(randomUser())
    cy.get('#password').type('Budi1234')
    cy.get('#password-confirmation').type('Budi1234')
    cy.get('#form-validate > .actions-toolbar > div.primary > .action > span').click()
    cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text',"Welcome")
    cy.get('.message-success > div').should('contain.text','Thank you')
  })
})