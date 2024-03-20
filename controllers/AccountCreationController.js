const lovModel = require("../models/lovModel");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const axios = require("axios");
const querystring = require("querystring");
const { body, query, header, validationResult } = require("express-validator");
// const MyDb = require("../db/config");
// const db = MyDb.LocalDb;
// const RemoteDb = MyDb.RemoteDb;
const url = "http://bbsanmc.nrspbank.com:808/BbsCoreApis/ANMC.svc/doactivity";
const secretKey = "0nAN4D1fMC234kA0";
const usr = "Switch";
const pwd = "Ph52LCF26t4Ky5tTc1b7";
var svcc = {
  usr: usr,
  pwd: pwd,
  keyOld: "",
  slt: "",
  stn: "",
  key: "",
};
exports.getLogin = async (req, res) => {
  try {
    console.log(req.body);
    console.log(
      "=============================validation================================"
    );

    const { requestObject } = req.body;

    const tid = req.body.act.Tid; // ?
    const BtsLoc = req.body.loc.BtsLoc; //null
    const Sid = req.body.user.Uid; //?
    const Imei1 = req.body.dev.Imei1;
    const uuid = uuidv4();

    const stn = lovModel.getSTN(`${BtsLoc}${Imei1}AUTHENTICATE${usr}${pwd}`);

    console.log(`${BtsLoc}${Imei1}AUTHENTICATE${usr}${pwd}`);

    console.log("stn is =====:", stn);
    //svcc object modify
    // req.body.svcc = svcc;
    req.body.svcc.stn = stn;

    // req.body.svcc.pwd = pwd;
    // req.body.svcc.usr = usr;
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




exports.getFetchLov = async (req, res) => {
  try {
    console.log(req.body);
    console.log(
      "=============================validation================================"
    );

    const { requestObject } = req.body;

    const Tid = req.body.act.Tid; // ?
    const BtsLoc = req.body.loc.BtsLoc; //null
    const Sid = req.body.user.Sid; //?
    const Imei1 = req.body.dev.Imei1;
    const uuid = uuidv4();

    req.body.svcc.pwd = pwd;
    req.body.svcc.usr = usr;

    const stn = lovModel.getSTN(`${Tid}${Sid}${BtsLoc}${Imei1}BVS${usr}${pwd}`);
    // const stn = lovModel.getSTN(
    //   `2279019a1e7daa-d056-48b6-9ee3-a92f77f41e660000044d865302020046627BVSSwitchPh52LCF26t4Ky5tTc1b7`
    // );

    console.log(`${Tid}${Sid}${BtsLoc}${Imei1}BVS${usr}${pwd}`);

    console.log("stn is =====:", stn);
    //svcc object modify
    // req.body.svcc = svcc;
    req.body.svcc.stn = stn;

    // req.body.svcc.pwd = pwd;
    // req.body.svcc.usr = usr;
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


exports.getAccountLov = async (req, res) => {
  try {
    console.log(req.body);
    console.log(
      "=============================validation================================"
    );

    const { requestObject } = req.body;

    const Tid = req.body.act.Tid; // ?
    const BtsLoc = req.body.loc.BtsLoc; //null
    const Sid = req.body.user.Sid; //?
    const Imei1 = req.body.dev.Imei1;
    const uuid = uuidv4();

    req.body.svcc.pwd = pwd;
    req.body.svcc.usr = usr;

    const stn = lovModel.getSTN(`${Tid}${Sid}${BtsLoc}${Imei1}GET_LOV${usr}${pwd}`);
    // const stn = lovModel.getSTN(
    //   `2279019a1e7daa-d056-48b6-9ee3-a92f77f41e660000044d865302020046627BVSSwitchPh52LCF26t4Ky5tTc1b7`
    // );

    console.log(`${Tid}${Sid}${BtsLoc}${Imei1}GET_LOV${usr}${pwd}`);

    console.log("stn is =====:", stn);
    //svcc object modify
    // req.body.svcc = svcc;
    req.body.svcc.stn = stn;

    // req.body.svcc.pwd = pwd;
    // req.body.svcc.usr = usr;
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
