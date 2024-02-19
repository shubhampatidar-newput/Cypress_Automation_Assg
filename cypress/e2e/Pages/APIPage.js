class CommonApis{

    getSpecificUserDetailsAPIButton() {
        return cy.get('[data-id="users-single"]')
    }

    //Method to generate API access token
    generateAccessToken(){
        return cy.request({
            method: 'POST',
            url: 'http://restapi.adequateshop.com//api/authaccount/login',
            body: {"name":"Shubham","email":"shubham988@gmail.com","password":123456}, timeout : 2000
        }).then((Response) => {
            expect(Response.status).to.eq(200)
            let res = Response.body.data.Token
            // cy.log(res)
            return res
        })
    }

    //API to get all users details
    getAllUsersDetails(accessToken){
        return cy.request({
            method : 'GET',
            url: 'http://restapi.adequateshop.com/api/users?page=1',
            headers: { 'Authorization': 'Bearer ' + accessToken , 'Content-Type' : 'application/json' }
        }).then((Response) => {
            expect(Response.status).to.eq(200)
            let res = Response.body.data
            return res
        })
    }

    //API to create a new user
    createUser(accessToken, name, email, location){
        return cy.request({
            method : 'POST',
            url: 'http://restapi.adequateshop.com/api/users',
            headers: { 'Authorization': 'Bearer ' + accessToken , 'Content-Type' : 'application/json' },
            body: { "name":name , "email":email , "location":location }
        }).then((Response) => {
            expect(Response.status).to.eq(201)
            let res = Response.body
            return res
        })
    }

    //API to get user detail by id
    getUserDetailsById(accessToken, id){
        return cy.request({
            method : 'GET',
            url: 'http://restapi.adequateshop.com/api/users/' + id,
            headers: { 'Authorization': 'Bearer ' + accessToken , 'Content-Type' : 'application/json' }
        }).then((Response) => {
            expect(Response.status).to.eq(200)
            let res = Response.body
            return res
        })
    }

    //API to update user
    updateUser(name, job){
        return cy.request({
            method : 'PUT',
            url: 'https://reqres.in/api/users/2',
            body: {"name": name, "job": job}
        }).then((Response) => {
            expect(Response.status).to.eq(200)
            let res = Response.body
            return res
        })
    }

    //API to delete user
    deleteUser(){
        return cy.request({
            method : 'DELETE',
            url: 'https://reqres.in/api/users/2',
        }).then((Response) => {
            expect(Response.status).to.eq(204)
            let res = Response.body
            return res
        })
    }
}

export default CommonApis;