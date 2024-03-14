// controllers/lovController.js
const lovModel = require("../models/lovModel");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const axios = require("axios");
const querystring = require("querystring");
const { body, query, header, validationResult } = require("express-validator");
// const MyDb = require("../db/config");
// const db = MyDb.LocalDb;
// const RemoteDb = MyDb.RemoteDb;
const secretKey = "0nBB4D1CAA234kA0";
const new_url =
  "http://bbsanmc.nrspbank.com:808/BbsCoreApis/ANMC.svc/doactivity";
const url =
  "http://bbsanmc.nrspbank.com:808/BbsCoreApis/BBConventional.svc/doactivity";
// "https://pri-bbs.nrspbank.com:8008/BbsCoreApis/BBConventional.svc/doActivity";//production
const a_url = "http://bbsanmc.nrspbank.com:808/BbsCoreApis/ANMC.svc/doactivity";
const usr = "PayPlus";
const usr1 = "PayPlus";
const pwd = "Nrspbank@1";
// const pwd1 = "W6T5u3Hp5Lpi6iEwhWzx";
const pwd1 = "1BkzoQA34tG373QQiz7D";
const secretKey1 = "0nAN4D1fMC234kA0";
// const pwd = "Yu5uU5LVp3B7iioi47i7";//prod
const ip = "10.1.7.12";
const PAN = "6291790000009895";
const ACCOUNT_ID_1 = "8011190002458";

var svcc = {
  usr: usr,
  pwd: pwd,
  keyOld: "",
  slt: "",
  stn: "",
  key: "",
};

// "svcc": {
//   "usr": "PayPlus",
//   "keyOld": "",
//   "slt": "",
//   "pwd": "Nrspbank@1",
//   "stn": "3LDalhFZxRBnXMo9ojMq8LrWStUH4+E7/O4XgYaPhng=",
//   "key": "8c5e661b-779b-4fb6-a0cc-467bd4fcd9c6"
// }

// "user": {
//   "Unm": "nrsp.admin"
// }

// "act": {
//   "Typ": "-5",
//   "Lvl": "1"
// }

exports.getLogin = async (req, res) => {
  try {
    console.log(req.body);
    console.log(
      "=============================validation================================"
    );

    const { requestObject } = req.body;
    const uuid = uuidv4();

    // const stn = lovModel.getSTN(`${"45.89.240.87"}GET_LOV${usr}${pwd1}`);
    const stn = lovModel.getSTN(
      "0000044d865302020046627AUTHENTICATESwitchPh52LCF26t4Ky5tTc1b7"
    );
    console.log("stn is :", stn);
    //svcc object
    req.body.svcc = svcc;
    req.body.svcc.stn = stn;
    req.body.svcc.pwd = pwd1;
    req.body.svcc.usr = usr;
    req.body.svcc.key = uuid;
    const requestBody = JSON.stringify(req.body);
    console.log("REQ BODY  ===============", requestBody);

    const encryptedReq = lovModel.encrypt(requestBody, secretKey1);
    const urlEncodedReq = querystring.escape(encryptedReq);
    console.log("before send ", urlEncodedReq);
    const headers = {
      "Content-Type": "application/json",
    };
    const axiosConfig = {
      headers,
    };

    const response = await axios.post(new_url, urlEncodedReq, axiosConfig);
    const newDecoded = decodeURIComponent(response.data);
    const decryptedText = lovModel.decrypt(newDecoded, secretKey1);

    const jsonObject = JSON.parse(decryptedText);
    console.log("response is :", jsonObject);
    res.json({
      success: true,
      data: jsonObject,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      success: false,
      message: "Network Error Please Try Again Later",
    });
  }
};

exports.getLov = async (req, res) => {
  try {
    // await Promise.all([
    //   header("TOKEN")
    //     .notEmpty()
    //     .withMessage("TOKEN header is required")
    //     .run(req),
    //   header("deviceid")
    //     .notEmpty()
    //     .withMessage("deviceid header is required")
    //     .run(req),
    // ]);
    // const v_errors = validationResult(req);
    // if (!v_errors.isEmpty()) {
    //   console.log("Got validation  Error", v_errors);
    //   return resp_generator(response, "", "error", "Invalid Data");
    // }
    console.log(req.body);
    console.log(
      "=============================validation================================"
    );
    // const login = await verify_login(req.headers.token, req.headers.deviceid);
    // if (!login) {
    //   console.log("invalid login");
    //   return resp_generator(response, "", "error", "Invalid Login", 401);
    // }

    const { requestObject } = req.body;
    const uuid = uuidv4();

    const stn = lovModel.getSTN(`${ip}GET_LOV${usr}${pwd}`);
    console.log("stn is :", stn);
    //svcc object
    req.body.svcc = svcc;
    req.body.svcc.stn = stn;
    req.body.svcc.pwd = pwd;
    req.body.svcc.usr = usr;
    req.body.svcc.key = uuid;
    const requestBody = JSON.stringify(req.body);
    console.log("REQ BODY  ===============", requestBody);

    const encryptedReq = lovModel.encrypt(requestBody, secretKey);
    const urlEncodedReq = querystring.escape(encryptedReq);
    console.log("before send ", urlEncodedReq);
    const headers = {
      "Content-Type": "application/json",
    };
    const axiosConfig = {
      headers,
    };

    const response = await axios.post(url, urlEncodedReq, axiosConfig);
    const newDecoded = decodeURIComponent(response.data);
    const decryptedText = lovModel.decrypt(newDecoded, secretKey);

    const jsonObject = JSON.parse(decryptedText);
    console.log("response is :", jsonObject);
    res.json({
      success: true,
      data: jsonObject,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      success: false,
      message: "Network Error Please Try Again Later",
    });
  }
};

exports.ibftSummary = async (req, res) => {
  try {
    const { requestObject } = req.body;
    const uuid = uuidv4();
    // const stn = lovModel.getSTN('10.1.7.12IBFT_OUTPayPlusNrspbank@1');
    const stn = lovModel.getSTN(`${ip}IBFT_OUT${usr}${pwd}`);

    //svcc object
    req.body.svcc = svcc;
    req.body.svcc.stn = stn;
    req.body.svcc.pwd = pwd;
    req.body.svcc.usr = usr;
    req.body.svcc.key = uuid;
    req.body.act.Bdata.PAN = PAN;
    // req.body.act.Bdata.ACCOUNT_ID_1 = ACCOUNT_ID_1;

    console.log(req.body);
    const requestBody = JSON.stringify(req.body);

    const encryptedReq = lovModel.encrypt(requestBody, secretKey);
    const urlEncodedReq = querystring.escape(encryptedReq);

    const headers = {
      "Content-Type": "application/json",
    };
    const axiosConfig = {
      headers,
    };

    const response = await axios.post(url, urlEncodedReq, axiosConfig);
    const newDecoded = decodeURIComponent(response.data);
    const decryptedText = lovModel.decrypt(newDecoded, secretKey);

    const jsonObject = JSON.parse(decryptedText);

    res.json({
      success: true,
      data: jsonObject,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      success: false,
      message: "Network Error Please Try Again Later",
    });
  }
};

exports.sendIbft = async (req, res) => {
  try {
    const { requestObject } = req.body;
    const uuid = uuidv4();
    const tid = req.body.act.Tid;
    const stn = lovModel.getSTN(`${tid}${ip}IBFT_OUT${usr}${pwd}`);

    //svcc object
    req.body.svcc = svcc;
    req.body.svcc.stn = stn;
    req.body.svcc.pwd = pwd;
    req.body.svcc.usr = usr;
    req.body.svcc.key = uuid;
    req.body.act.Bdata.PAN = PAN;
    req.body.act.Bdata.ACCOUNT_ID_1 = ACCOUNT_ID_1;

    const requestBody = JSON.stringify(req.body);

    const encryptedReq = lovModel.encrypt(requestBody, secretKey);
    const urlEncodedReq = querystring.escape(encryptedReq);

    const headers = {
      "Content-Type": "application/json",
    };
    const axiosConfig = {
      headers,
    };

    const response = await axios.post(url, urlEncodedReq, axiosConfig);

    console.log("===================================", response);
    const newDecoded = decodeURIComponent(response.data);
    console.log("#######################################", newDecoded);
    const decryptedText = lovModel.decrypt(newDecoded, secretKey);
    console.log("22222222222222222222222222222222222222222", decryptedText);

    const jsonObject = JSON.parse(decryptedText);

    res.json({
      success: true,
      data: jsonObject,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      success: false,
      message: "Network Error Please Try Again Later",
    });
  }
};

exports.createNrspAccount = async (req, res) => {
  try {
    const { requestObject } = req.body;

    // const stn =lovModel.getSTN('10.1.7.12REGISTER_CUSTOMERPayPlus4xDV5S138YP8tpEnsyEy');
    const uuid = uuidv4();
    const tid = req.body.act.Tid; // ?
    const BtsLoc = req.body.loc.BtsLoc; //null
    const Sid = req.body.user.Uid; //?
    const Imei1 = req.body.dev.Imei1;
    // const stn = "4IIAL8QN9fjs5wC5P0VhtapZTd6i/p8q1GQdmC2RQyA=";
    const stn = lovModel.getSTN(
      `${Sid}${BtsLoc}${Imei1}ACCOUNT_OPENING_L1${usr}${pwd1}`
    );
    console.log(`${Sid}${BtsLoc}${Imei1}ACCOUNT_OPENING_L1${usr}${pwd1}`);
    // const stn = lovModel.getSTN(`${ip}ACCOUNT_OPENING_L1${usr}${pwd1}`);
    console.log(stn);
    //svcc object
    // req.body.svcc = svcc;
    req.body.svcc.stn = stn;
    //  req.body.svcc.pwd = pwd1;
    // req.body.svcc.usr = usr;
    req.body.svcc.key = uuid;
    // req.body.act.Bdata.PAN = PAN;

    const requestBody = JSON.stringify(req.body);
    console.log("bdy ", requestBody);
    const encryptedReq = lovModel.encrypt(requestBody, secretKey1);
    console.log("Encrypt req ", encryptedReq);
    const urlEncodedReq = querystring.escape(encryptedReq);

    const headers = {
      "Content-Type": "application/json",
    };
    const axiosConfig = {
      headers,
    };

    console.log("before send req ", urlEncodedReq);

    const response = await axios.post(a_url, urlEncodedReq, axiosConfig);
    console.log("===================================", response);
    const newDecoded = decodeURIComponent(response.data);
    console.log("#######################################", newDecoded);
    const decryptedText = lovModel.decrypt(newDecoded, secretKey1);
    console.log("final data response ", decryptedText);

    const jsonObject = JSON.parse(decryptedText);

    res.json({
      success: true,
      data: jsonObject,
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      success: false,
      message: "Network Error Please Try Again Later",
    });
  }
};
// app.post('/create-nrsp-account', async (req, res) => {
//   try {

//    // console.log('body isss===')
//     const { requestObject } = req.body; // Extract the requestObject from the POST request body
//    // console.log(req.body)

//     const uuid = uuidv4();
//     console.log(uuid);

//     req.body.svcc.key = uuid;
//     const stn = getSTN('10.1.7.12REGISTER_CUSTOMERPayPlus4xDV5S138YP8tpEnsyEy');
//     req.body.svcc.stn=stn;
//     console.log("====== Request Body =========")
//     console.log(req.body)

//     const test1 = JSON.stringify(req.body);

//     console.log(test1)
//     const encryptedReq = encrypt(test1, secretKey);
//     const urlEncodedReq = querystring.escape(encryptedReq);

//     console.log("====== Encrypted Request=========")
//     console.log(urlEncodedReq)

//     const headers = {
//       'Content-Type': 'application/json',
//     };
//     const body = urlEncodedReq;

//     const url1='http://bbsanmc.nrspbank.com:808/BbsCoreApis/ANMC.svc';

//     const response = await axios.post(url1, body, { headers });
//     const newDecoded1 = decodeURIComponent(response.data);
//     const decryptedText1 = decrypt(newDecoded1, secretKey);

//     const jsonObject = JSON.parse(decryptedText1);

//     // Send the decrypted response as JSON
//     res.json({ DecryptedResponse: jsonObject });
//   } catch (ex) {
//     console.error(ex);
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });
// ========================common method===============================
function resp_generator(
  response,
  data,
  condition = "success",
  message = "",
  code = 200,
  req = {},
  error = ""
) {
  console.log("coming conde is ", code, data, message);
  if (code == 500) {
    const now = String(moment().format("yyyy-MM-DD H:mm:s"));

    fs.appendFile(
      "/home/toplist/mobileapp_live/logs/errors.txt",
      ` \n ${now} } - ${JSON.stringify(req.headers)}  - ${error} }`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    //fs.appendFile('/home/toplist/mobileapp_live/logs/errors.txt',` \n ${now} } - ${body} }`, () => {});
    //process.exit(1)
  }
  const MyResponse = { condition: condition, data: data, message: message };
  console.log("response is", MyResponse);
  response.status(code);
  return response.json(MyResponse);
}
// async function verify_login(token, device_id) {
//   try {
//     console.log("token iz ", token);
//     let textParts = token.split(":");
//     let iv = Buffer.from(textParts.shift(), "hex");
//     let encryptedText = Buffer.from(textParts.join(":"), "hex");
//     let decipher = crypto.createDecipheriv(
//       "aes-256-cbc",
//       Buffer.from("D00FjdG8iLCJpc3MiOiJodHRwczovL2R"),
//       iv
//     );
//     let decrypted = decipher.update(encryptedText);

//     decrypted = Buffer.concat([decrypted, decipher.final()]);
//     console.log("decryption is ", decrypted.toString());

//     let dec = decrypted.toString().split("##");
//     let enc_user_id = dec[0];
//     let enc_device_id = dec[1];
//     console.log("details are ", enc_user_id, device_id);
//     console.log("submited token is ", textParts);
//     // Todo Needs to add device comparing check
//     if (enc_user_id && enc_device_id && enc_device_id == device_id) {
//       console.log("checking for ", enc_user_id);
//       const rows = await db.execute(
//         "SELECT * FROM business_users where id =? and device_id =? AND token = ?  AND (token_updated > (now() - interval 15 minute))",
//         [enc_user_id, device_id, textParts[0]]
//       );

//       //console.log(43, rows[0])
//       if (rows[0][0]) {
//         console.info("updating");
//         const now = String(moment().format("yyyy-MM-DD H:mm:s"));
//         await db.execute(
//           `UPDATE business_users SET  token_updated = '${now}'  where id = ${rows[0][0]["id"]}`
//         );

//         return rows[0][0];
//       } else {
//         console.log("authentication failed");
//         return false;
//       }
//     } else {
//       console.log("authentication failed 22");
//       return false;
//     }
//   } catch (e) {
//     console.log("Catch an error: ", e);
//     return false;
//   }

//   // A5)wBZb$=N
// }
