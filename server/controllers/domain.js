const domainService = require('../services/domain');

const createDomain = async (req, res) => {
  const domain = req.body;
  const result = await domainService.createDomain(domain);
  return res.send({ status: 1, result });
};

module.exports = {
  createDomain,
};