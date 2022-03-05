const Users = require('../models/UsersModel')

// let Users = [
//     {id: 1, name: 'Daban', address:''},
//     {id: 2, name: 'Yan ', address:''},
// ]

module.exports = {
    index: (req, res) => {
        let search = {}

        if(req.query.search){
            search = {name: {$regex: req.query.search}} //contoh hasil = /search/
        }

        Users.find(search, "name _id", function(err, users){
            if(err) console.log(err)

            console.log(users)
            res.render('pages/users/index', {users})
        })
    },

    create: (req, res) => {
        res.render('pages/users/create')
    },

    store: (req, res) => {
        const user = new Users ({
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
        })
        user.save(function(err, data) {
            if (err) console.log(err)
            // saved!
            console.log(data)
            res.redirect('/users')
        })

    },

    show: (req, res) => {
        const id = req.params.id
        Users.findById(id, function(err, user){
            if(err) console.log(err)
            
            console.log(user)
            res.render('pages/users/detail', {user})
        })
    },
}