/// <reference types="Cypress" />
import APIPage from '../Pages/APIPage.js'

describe('API Testing', () => {
    const apiPageObj = new APIPage()

    it('GET API Call', () => {
        apiPageObj.getAllUsersDetails().then((res) => {
            cy.log(res[0].id)
        })
    })

    it('Create User using POST API Call and validate using get API after creation', () => {
        let x = Math.random() * 100;
        var name = 'Apple Model' + x
        var year = x
        var price = '200'
        apiPageObj.createUser(name, year, price).then((res) => {
            //validting name while user creation
            expect(res.name).to.eq(name)
            apiPageObj.getUserDetailsById(res.id).then((res) => {
                //validating name after user creating using GET api with ID
                expect(res[0].name).to.eq(name)
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
