/// <reference types="Cypress" />
import APIPage from '../Pages/APIPage.js'

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

    it('Create User using POST API Call and validate using get API after creation', () => {
        let x = Math.random() * 100;
        var name = 'Shubham'
        var email = x + '@gmail'
        var location = 'USA'
        apiPageObj.createUser(accessToken, name, email, location).then((res) => {
            //validting name while user creation
            expect(res.name).to.eq(name)
            apiPageObj.getUserDetailsById(accessToken, res.id).then((res) => {
                //validating name after user creating using GET api with ID
                expect(res.name).to.eq(name)
            })
        })
    })

    it('Update user using PUT call', () => {
        var job = 'zion resident'
        var name = 'morpheus'
        apiPageObj.updateUser(name, job).then((res) => {
            expect(res.name).to.eq(name)
            expect(res.job).to.eq(job)
        })
    })

    it('Delete user after creating', () => {
        //Deleted Record and validated API status in API Page
        apiPageObj.deleteUser()
    })

})
