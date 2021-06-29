const {
  Types: {ObjectId},
} = require('mongoose');
const {Domain} = require('../models/Domain');

const createDomain = async (domain) => {
  const result = await Domain.create(domain);
  return result;
};

module.exports = {
  createDomain
};