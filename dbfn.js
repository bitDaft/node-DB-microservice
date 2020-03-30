const getAll = async table => {
  return table.query();
};

const get = async (table, id) => {
  return table.query().findById(id);
};

const post = async (table, data) => {
  return table.query().insert(data);
};

const put = async (table, id, data) => {
  return table.query().patchAndFetchById(id, data);
};

const del = async (table, id, data) => {
  return table.query().deleteById(id, data);
};

module.exports = {
  getAll,
  get,
  put,
  post,
  del
};
