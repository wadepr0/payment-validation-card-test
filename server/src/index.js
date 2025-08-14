const ErrorMSG = () => ({ message: "Bad request", code: 110143 });
const PORT = process.env.PORT || 2050;
const bodyParser = require("body-parser"),
  { isString, getRandomRange } = require("./utils"),
  express = require("express"),
  jayson = require("jayson"),
  app = express(),
  uuid = require("uuid");

let pid = null;
let callCount = 0;
let randomCall = getRandomRange(2, 5);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const paymentSession = (args, cb) => {
  const { pan, expire, cardholder, cvc } = args,
    keys = Object.keys(args);
  callCount = 0;
  pid = uuid.v4();

  if (pan && expire && cardholder && cvc) {
    keys.map((el) => (!isString(args[el]) ? cb(ErrorMSG()) : ""));
    cb(null, { pid });
  } else cb(ErrorMSG());
};

const EmployeeServices = jayson.server({
  pay: (args, cb) => (args ? paymentSession(args, cb) : cb(ErrorMSG()))
});

app.get('/test', (req, res) => res.send({bomj: 'bomj'}));
app.use(bodyParser.json());
app.post("/api", EmployeeServices.middleware());

app.get("/pay/check/*", (request, response) => {
  if (request.params[0] === pid) {
    callCount++;

    switch (true) {
      case callCount < randomCall:
        response.send({ status: "process", pid });
        break;
      case callCount === randomCall:
        response.send({ status: "ok", pid });
        break;
      case callCount === 5:
        response.send({ status: "fail", pid });
        break;
      default:
        response.send({ message: "err" });
    }
  } else response.send({ message: "invalid pid" });
});

const server = app.listen(PORT, () => {
  console.log(`Start ${PORT} port`);
});
server.keepAliveTimeout = 1000;
