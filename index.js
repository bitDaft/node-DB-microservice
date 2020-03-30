const { json } = require("micro");
const { router, get, post, put, del, options } = require("micro-fork");

const { sendResponse, success, failure } = require("./helper.js");
const db = require("./dbfn.js");
const { Auth, Template, Notification, Resource } = require("./dbtables.js");

const microCors = require("micro-cors");
const cors = microCors({ allowMethods: ["GET", "PUT", "POST"] });

const config = require("./config.json");
data = config[config.env];

const tablemap = {
  user: Auth,
  template: Template,
  notification: Notification,
  resource: Resource
};

// -----------------------------------
// ROUTES
// -----------------------------------

const getAllEntry = async (req, res) => {
  const table = req.params["table"];
  return sendResponse(res, success, "GET_OK", await db.getAll(tablemap[table]));
};
const getEntry = async (req, res) => {
  const table = req.params["table"];
  const id = +req.params["id"];
  return sendResponse(
    res,
    success,
    "GET_OK",
    await db.get(tablemap[table], id)
  );
};
const postEntry = async (req, res) => {
  const table = req.params["table"];
  const data = await json(req);
  return sendResponse(
    res,
    success,
    "POST_OK",
    await db.post(tablemap[table], data)
  );
};
const putEntry = async (req, res) => {
  const table = req.params["table"];
  const id = +req.params["id"];
  const data = await json(req);
  return sendResponse(
    res,
    success,
    "PUT_OK",
    await db.put(tablemap[table], id, data)
  );
};
const delEntry = async (req, res) => {
  const table = req.params["table"];
  const id = +req.params["id"];
  return sendResponse(
    res,
    success,
    "DEL_OK",
    await db.del(tablemap[table], id)
  );
};

// -----------------------------------
// -----------------------------------
// -----------------------------------

// -----------------------------------
// UTILITY FUNCTIONS
// -----------------------------------
const optionscheck = async (req, res) => {
  return sendResponse(res, success, "OK", "OK");
};
const healthcheck = async (req, res) =>
  sendResponse(res, success, "HEALTH_CHECK", "Up and Running!");
const notfound = (req, res) =>
  sendResponse(res, failure, "NOT_FOUND", "404 Not found", 404);

const middlewares = func => {
  //   func = cors(func);
  return func;
};
const getBaseURL = () => {
  return data.basURL + "/" + data.version;
};
// -----------------------------------
// -----------------------------------
// -----------------------------------
module.exports = router()(
  options("/*", optionscheck),

  get(getBaseURL(), healthcheck),

  get(getBaseURL() + "/:table", getAllEntry),
  get(getBaseURL() + "/:table/:id", getEntry),
  post(getBaseURL() + "/:table", postEntry),
  put(getBaseURL() + "/:table/:id", putEntry),
  del(getBaseURL() + "/:table/:id", delEntry),

  get("/*", middlewares(notfound)),
  post("/*", middlewares(notfound)),
  del("/*", middlewares(notfound)),
  put("/*", middlewares(notfound))
);