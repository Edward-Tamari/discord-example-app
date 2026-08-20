import mongoose from 'mongoose';

const countingSchema = new mongoose.Schema({
  Guild: String,
  Channel: String,
  Number: Number,
  LastUser: String,
});

export default mongoose.model('counting', countingSchema);
