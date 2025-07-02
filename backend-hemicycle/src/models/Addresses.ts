import mongoose, { Schema } from 'mongoose';

const addressesSchema = new Schema({
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: true,
    match: /^[0-9]{5}$/,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: true,
  },
});

const Addresses = mongoose.model('Addresses', addressesSchema);

export default Addresses;
