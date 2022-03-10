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
            if (req.query.limit <= 1) req.query.limit = 1
            res.send(users) // response
            // res.render('pages/users/index', {users}) // tampilan
        }).limit(req.query.limit).skip(req.skip).lean().exec()
    },

    create: (req, res) => {
        res.render('pages/users/create')
    },

    store: (req, res) => {
        // const user = new Users ({
        //     name: req.body.name,
        //     phone: req.body.phone,
        //     address: req.body.address,
        // })
        // user.save(function(err, data) {
        //     if (err) console.log(err)
        //     // saved!
        //     console.log(data)
        //     res.send(data);
        //     // res.redirect('/users')
        // })

        const user = new Users(req.body)
        
        user.save().then( () => {
            res.status(201).send("User Added!");
        }).catch( (e) => {
            res.status(400).send(e);
        })
    },

    show: (req, res) => {
        const id = req.params.id
        Users.findById(id, function(err, user){
            if(err) console.log(err)
            
            console.log(user)
            res.send(user)
            res.render('pages/users/detail', {user})
        })
    },

    edit: (req, res) => {
        const id = req.params.id
        Users.findById(id, function(err, user){
            if(err) console.log(err)
            
            console.log(user)
            res.render('pages/users/edit', {user})
        })
    },

    update: (req, res) => {
        if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
            });
        }
        const id = req.params.id;
        Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
            if (!data) {
                res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
    },

    destroy: (req, res) => {
        let id = req.params.userId
        Users.findOneAndRemove(id)
            .then(data => {
                if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
                } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
                res.redirect('/users')
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Tutorial with id=" + id
                });
            });
        // res.json({
        //     status: true,
        //     data: users,
        //     message: 'Data user deleted successfully!',
        //     method: req.method,
        //     url: req.url
        // })

        // Users.findOneAndRemove(id, function(err, id){
        //     if(err) console.log(err)
            
        //     console.log('a')
        //     res.redirect('/users')
        // });

    }
}