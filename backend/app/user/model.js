const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nik: {
    type: String,
    required: [true, 'NIK harus diisi'],
    validate: {
      validator: function(value) {
        return /^[0-9]{16}$/.test(value); // Harus 16 digit angka
      },
      message: props => `${props.value} bukan NIK yang valid (harus 16 digit angka)`
    }
  },
  full_name: {
    type: String,
    required: [true, 'Field Name Harus Ada'],
    minlength: [3, 'Nama minimal 3 karakter'],
    maxlength: [255, 'Panjang nama maksimal 255 karakter']
  },
  email: {
    type: String,
    required: [true, 'Email harus diisi'],
    maxlength: [255, 'Panjang email maksimal 255 karakter'],
    lowercase: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password harus diisi'],
    maxlength: [255, 'Panjang password maksimal 255 karakter']
  },
  role: {
    type: String,
    enum: [
      'pemohon',
      'petugas_desa',
      'petugas_kecamatan',
      'petugas_bpn_loket',
      'petugas_bpn_berkas',
      'petugas_bpn_pengukuran',
      'kepala_seksi',
      'kepala_kantor',
      'verifikator_smartcontract',
      'admin'
    ],
    default: 'pemohon'
  },
  nip: {
    type: String,
    required: function () {
      return this.role !== 'pemohon';
    }
  },
  instansi: {
    type: String // ex: Desa Sukamaju, Kecamatan Bandung, BPN Jakarta Selatan
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  token: [String], // array of active JWT tokens or refresh tokens
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

// Hash password jika dimodifikasi
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Validasi format email
userSchema.path('email').validate(function(value){
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_RE.test(value);
}, attr => `${attr.value} harus merupakan email valid!`);

// Validasi email unik
userSchema.path('email').validate(async function(value){
  try {
    const count = await this.model('User').countDocuments({ email: value });
    return !count;
  } catch (e) {
    throw e;
  }
}, attr => `${attr.value} sudah terdaftar.`);

// Method untuk validasi login
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
