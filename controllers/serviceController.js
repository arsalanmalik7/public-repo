const Service = require('../models/Service');

// Get all services (React Admin compatible)
exports.getAllServices = async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const range = req.query.range ? JSON.parse(req.query.range) : [0, 9];
    const sort = req.query.sort ? JSON.parse(req.query.sort) : ['_id', 'ASC'];
    const sortField = sort[0] === 'id' ? '_id' : sort[0];
    const sortOrder = sort[1] === 'ASC' ? 1 : -1;
    const skip = range[0];
    const limit = range[1] - range[0] + 1;
    const total = await Service.countDocuments(filter);
    const services = await Service.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();
    // Map _id to id for React Admin compatibility
    const mappedServices = services.map(service => ({ ...service, id: service._id }));
    res.set('Content-Range', `services ${skip}-${skip + services.length - 1}/${total}`);
    res.json(mappedServices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const services = await Service.find({ category });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    const savedService = await service.save();
    // Map _id to id for React Admin compatibility
    res.status(201).json({ ...savedService.toObject(), id: savedService._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedService = await Service.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ ...updatedService.toObject(), id: updatedService._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 