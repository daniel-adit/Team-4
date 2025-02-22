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
    //cy.get('.panel > .header > :nth-child(3) > a').click()
    lumaPage.createAccount()
    lumaPage.inputFirstname('Wayne')
    lumaPage.inputLastname('Rooney')
    cy.get('#email_address').type(randomUser())
    lumaPage.inputPassword_1('Budi1234')
    lumaPage.inputPassword_2('Budi1234')
    //cy.get('#form-validate > .actions-toolbar > div.primary > .action > span').click()
    lumaPage.confirmButton()
    cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text',"Welcome")
    cy.get('.message-success > div').should('contain.text','Thank you')
  })

  it('All fields empty', () => {
    cy.fixture('message').then((message) => {
      const notif = message
    //cy.get('.panel > .header > :nth-child(3) > a').click()
    lumaPage.createAccount()
    //cy.get('#form-validate > .actions-toolbar > div.primary > .action > span').click()
    lumaPage.confirmButton()
    cy.verifyContain('#firstname-error', notif.error)
    cy.verifyContain('#lastname-error', notif.error)
    cy.verifyContain('#email_address-error', notif.error)
    cy.get('#password-strength-meter-label').should('contain.text', 'Password')
    cy.verifyContain('#password-error', notif.error)
    cy.verifyContain('#password-confirmation-error', notif.error)
    })
  })

  it('Invalid email format', () => {
    //cy.get('.panel > .header > :nth-child(3) > a').click()
    lumaPage.createAccount()
    lumaPage.inputFirstname('Wayne')
    lumaPage.inputLastname('Rooney')
    cy.get('#email_address').type('budixyz')
    lumaPage.inputPassword_1('Budi1234')
    lumaPage.inputPassword_2('Budi1234')
    //cy.get('#form-validate > .actions-toolbar > div.primary > .action > span').click()
    lumaPage.confirmButton()
    cy.get('#email_address-error').should('contain.text','valid')
  })

})