const Users = require('../models/UsersModel')

// let Users = [
//     {id: 1, name: 'Daban', address:''},
//     {id: 2, name: 'Yan ', address:''},
// ]

module.exports = {
    index: (req, res) => {
        Users.find({}, "name _id", function(err, users){
            if(err) console.log(err)

            console.log(users)
            res.render('pages/users/index', {users})
        })
    },
    
    create: (req, res) => {
        res.render('pages/users/create')
    },

}