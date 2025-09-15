const Favorite = require('../models/Favorite');

exports.list = async (req, res) => {
  try {
    const list = await Favorite.find().sort({ addedAt: -1 });
    res.json({ success: true, count: list.length, data: list });
  } catch (e) { res.status(500).json({ success:false, message:e.message }); }
};

exports.create = async (req, res) => {
  try {
    const { entityType, entityId, name, notes } = req.body;
    if (!entityType || !['slime','food','location','toy'].includes(entityType))
      return res.status(400).json({ success:false, message:'entityType inválido' });
    if (!entityId) return res.status(400).json({ success:false, message:'entityId es obligatorio' });
    const fav = await Favorite.create({ entityType, entityId, name, notes });
    res.status(201).json({ success:true, data:fav });
  } catch (e) { res.status(500).json({ success:false, message:e.message }); }
};

exports.getOne = async (req, res) => {
  try {
    const fav = await Favorite.findById(req.params.id);
    if (!fav) return res.status(404).json({ success:false, message:'Favorite no encontrado' });
    res.json({ success:true, data:fav });
  } catch (e) { res.status(500).json({ success:false, message:e.message }); }
};

exports.update = async (req, res) => {
  try {
    const fav = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new:true, runValidators:true });
    if (!fav) return res.status(404).json({ success:false, message:'Favorite no encontrado' });
    res.json({ success:true, data:fav });
  } catch (e) { res.status(500).json({ success:false, message:e.message }); }
};

exports.remove = async (req, res) => {
  try {
    const fav = await Favorite.findByIdAndDelete(req.params.id);
    if (!fav) return res.status(404).json({ success:false, message:'Favorite no encontrado' });
    res.json({ success:true, message:'Borrado correctamente' });
  } catch (e) { res.status(500).json({ success:false, message:e.message }); }
};
