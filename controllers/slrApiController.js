const axios = require('axios');
const BASE = 'https://slime-rancher.vercel.app/api';

const fetchList = async (resource, query) => {
  const { q, ...rest } = query || {};
  const { data } = await axios.get(`${BASE}/${resource}`, { params: rest });
  const list = Array.isArray(data) ? data
    : Array.isArray(data?.slimes)   ? data.slimes
    : Array.isArray(data?.foods)    ? data.foods
    : Array.isArray(data?.locations)? data.locations
    : Array.isArray(data?.toys)     ? data.toys
    : [];
  if (!q) return list;
  const ql = String(q).toLowerCase();
  return list.filter(it => (it.name || '').toLowerCase().includes(ql));
};

const fetchOne = async (resource, id) => {
  const { data } = await axios.get(`${BASE}/${resource}/${id}`);
  return data;
};

exports.slimesList    = async (req, res) => { try { const data = await fetchList('slime', req.query);    res.json({ success: true, count: data.length, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo slimes' }); } };
exports.slimeDetail   = async (req, res) => { try { const data = await fetchOne('slime', req.params.id); res.json({ success: true, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo slime' }); } };

exports.foodsList     = async (req, res) => { try { const data = await fetchList('food', req.query);     res.json({ success: true, count: data.length, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo foods' }); } };
exports.foodDetail    = async (req, res) => { try { const data = await fetchOne('food', req.params.id);  res.json({ success: true, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo food' }); } };

exports.locationsList = async (req, res) => { try { const data = await fetchList('location', req.query); res.json({ success: true, count: data.length, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo locations' }); } };
exports.locationDetail= async (req, res) => { try { const data = await fetchOne('location', req.params.id); res.json({ success: true, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo location' }); } };

exports.toysList      = async (req, res) => { try { const data = await fetchList('toy', req.query);      res.json({ success: true, count: data.length, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo toys' }); } };
exports.toyDetail     = async (req, res) => { try { const data = await fetchOne('toy', req.params.id);   res.json({ success: true, data }); } catch(e){ res.status(500).json({ success:false, message:'Error obteniendo toy' }); } };
