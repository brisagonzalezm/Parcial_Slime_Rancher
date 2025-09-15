const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  entityType: { type: String, enum: ['slime', 'food', 'location', 'toy'], required: true },
  entityId:   { type: String, required: true },
  name:       { type: String },
  notes:      { type: String },
  addedAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
