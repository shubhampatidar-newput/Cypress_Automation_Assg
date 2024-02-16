/// <reference types="Cypress" />
import APIPage from './Pages/APIPage.js'

describe('API Testing', () => {
    const apiPageObj = new APIPage()
    var accessToken
    before('generate Access Token before', () => {
        //POST API Call
        apiPageObj.generateAccessToken().then((res) => {
            accessToken = res
            cy.log(res)
        })
    })

    it('GET API Call', () => {
        apiPageObj.getAllUsersDetails(accessToken).then((res) => {
            cy.log(res.name)
        })
    })

    it('Create User using POST API Call', () => {
        let x = Math.random() * 100;
        var name = 'Shubham'
        var email = x + '@gmail'
        var location = 'USA'
        var nameToUpdate = 'Patidar'
        apiPageObj.createUser(accessToken, name, email, location).then((res) => {
            cy.log(res.id)
            apiPageObj.updateUser(accessToken, res.id, nameToUpdate, email, location).then((res) => {
                cy.log(res.name)
            })
        })
    })

})
