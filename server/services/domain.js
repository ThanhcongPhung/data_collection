const domainDao = require('../daos/domain');

const createDomain = async (domain) => {
  const result = await domainDao.createDomain(domain);
  return result;
};

module.exports = {
  createDomain,
};
