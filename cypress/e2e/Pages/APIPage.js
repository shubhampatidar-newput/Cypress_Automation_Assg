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
    getAllUsersDetails(){
        return cy.request({
            method : 'GET',
            url: 'https://api.restful-api.dev/objects',
            headers: {'Content-Type' : 'application/json' }
        }).then((Response) => {
            expect(Response.status).to.eq(200)
            let res = Response.body
            return res
        })
    }

    //API to create a new user
    createUser(name, year, price){
        return cy.request({
            method : 'POST',
            url: 'https://api.restful-api.dev/objects',
            headers: {'Content-Type' : 'application/json' },
            body: {
                "name": name,
                "data": {
                   "year": year,
                   "price": price,
                   "CPU model": "Intel Core i9",
                   "Hard disk size": "1 TB"
                }
             }
        }).then((Response) => {
            expect(Response.status).to.eq(200)
            let res = Response.body
            return res
        })
    }

    //API to get user detail by id
    getUserDetailsById(id){
        return cy.request({
            method : 'GET',
            url: 'https://api.restful-api.dev/objects?id=' + id,
            headers: {'Content-Type' : 'application/json' }
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