const mongoose = require('mongoose')
const { Schema } = mongoose;

// Membuat variabel baru dengan nama mahasiswaScheme
const usersSchema = new Schema({
    name: {
      // Membuat type dari field nama yang berada di tabel mahasiswa bersifat string
        type: String,
      // maksud dari required adalah ketika data disimpan kedalam database, data tidak boleh kosong
        required: true,
    },
    phone: {
      // Membuat type dari field nama yang berada di tabel mahasiswa bersifat number
        type: Number,
        required: true,
    },
    alamat: {
        type: String,
        required: false,
    },
});
const Users = mongoose.model('Users', usersSchema);
module.exports = Users