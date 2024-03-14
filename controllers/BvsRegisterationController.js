const axios = require("axios");
const { body, query, header, validationResult } = require("express-validator");
const BaseUrl =
  "https://rgw.8798-f464fa20.eu-de.ri1.apiconnect.appdomain.cloud/tmfb/dev-catalog/";

const channel = "bvsgateway";
const client_id = "51d9d9c413a64e514aa88996f06d3083";
const client_secret = "234373dc78dbebbd583559487c6222cb";

exports.sendOTP = async (req, res) => {
  try {
    // console.log('body isss===')
    const { requestObject } = req.body; // Extract the requestObject from the POST request body
    // console.log(req.body)

    let url = BaseUrl + "RetailerBVSLogin/OTPGeneration";

    const headers = {
      "Content-Type": "application/json",
      "X-Channel": channel,
      "X-IBM-Client-Id": client_id,
      "X-IBM-Client-Secret": client_secret,
    };

    const body = req.body;

    const response = await axios.post(url, body, { headers });

    // Send the decrypted response as JSON
    return res.send(response.data);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.BvsLogin = async (req, res) => {
  try {
    const { requestObject } = req.body;

    let url = BaseUrl + "RetailerBVSLogin";

    const headers = {
      "Content-Type": "application/json",
      "X-Channel": channel,
      "X-IBM-Client-Id": client_id,
      "X-IBM-Client-Secret": client_secret,
    };
    const body = req.body;

    const response = await axios.post(url, body, { headers });

    // Send the decrypted response as JSON
    return res.send(response.data);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.BvsRegisteration = async (req, res) => {
  try {
    // console.log('body isss===')
    const { requestObject } = req.body; // Extract the requestObject from the POST request body
    // console.log(req.body)

    const channel = req.headers.channel;
    const client_id = req.headers.client_id;
    const client_secret = req.headers.client_secret;
    const Sessionid = req.headers.sessionid;
    const Authorization = req.headers.authorization;

    console.log("====== Authorization ======");
    console.log(Authorization);

    console.log("====== Sessionid ======");
    console.log(Sessionid);

    let url = BaseUrl + "BVSAccountRegistration/OTP";

    const headers = {
      "Content-Type": "application/json",
      "X-Channel": channel,
      "X-IBM-Client-Id": client_id,
      "X-IBM-Client-Secret": client_secret,
      Sessionid: Sessionid,
      Authorization: Authorization,
      "X-Username": "923481565391@2900",
      "X-Password": "12121",
    };
    const body = req.body;

    const response = await axios.post(url, body, { headers });

    // Send the decrypted response as JSON
    return res.send(response.data);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.RefreshToken = async (req, res) => {
  try {
    const { requestObject } = req.body;

    let url = BaseUrl + "RetailerBVSLogin";
    // Access request headers

    const Sessionid = req.headers.sessionid;
    const Authorization = req.headers.authorization;

    // Access request body
    const refresh_token = req.body.refresh_token;
    console.log(
      "==================================== refresh_token ==================================="
    );
    console.log(refresh_token);

    const headers = {
      "Content-Type": "application/json",
      "X-Channel": channel,
      "X-IBM-Client-Id": client_id,
      "X-IBM-Client-Secret": client_secret,
      Sessionid: Sessionid,
      Authorization: Authorization,
      "X-Username": "923481565391@2900",
      "X-Password": "12121",
    };
    console.log(headers);
    // const body = req.body;

    const response = await axios.post(url, refresh_token, { headers });

    // Send the decrypted response as JSON
    return res.send(response.data);
  } catch (ex) {
    console.error(ex);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.deposit = async (req, response) => {
  try {
    const apiUrl =
      "https://rgw.8798-f464fa20.eu-de.ri1.apiconnect.appdomain.cloud/tmfb/dev-catalog/BVSCashDeposit/CashDepositBVS";
    console.log(
      "=======================calling Deposit API==================================="
    );
    // Extracting variables from req.body
    const { amount, Longitude, Latitude, CustomerCNIC, mobile } = req.body;

    // Validation using express-validator
    const validationRules = [
      body("mobile").isInt().isLength({ min: 11, max: 11 }),
      body("amount").isInt({ min: 40, max: 25000 }),
      body("Longitude").notEmpty().isNumeric(),
      body("Latitude").notEmpty().isNumeric(),
      body("CustomerCNIC").notEmpty(),
      header("deviceid").notEmpty(),
      header("TOKEN").notEmpty(),
    ];

    await Promise.all(validationRules.map((validation) => validation.run(req)));

    const v_errors = validationResult(req);
    if (!v_errors.isEmpty()) {
      console.log("Got validation  Error", v_errors);
      return resp_generator(response, "", "error", "Invalid Data");
    }
    const full_mobile = "92" + mobile.substring(1);

    console.log(mobile);

    // login = await verify_login(req.headers.token, req.headers.deviceid);
    // if (!login) {
    //   console.log("invalid login");
    //   return resp_generator(response, "", "error", "Invalid Login", 401);
    // }

    // if (login["show_easypaisa"] != 1) {
    //   return resp_generator(response, "", "error", "Transactions not allowed");
    // }
    // const user_id = login["id"];
    // const user_number = login["phone_number"];

    // console.log(
    //   "============ Before Balance Hit ================================"
    // );

    // const balance_row = await db.execute("CALL getLoginBalance(?)", [user_id]);
    // if (balance_row[0][0]) {
    //   console.log(
    //     "============ After Balance Check ================================"
    //   );
    //   if (balance_row[0][0][0]["Balance"] > amount) {
    // Check if Master EP is active

    // Check for quote reponse
    // login['show_easypaisa']

    //console.log(api_response)
    // const now = String(moment().format("yyyy-MM-DD H:mm:ss"));

    // db.execute(
    //   "INSERT INTO easy_paisa_hits (date, user_id ,user_type , receiver_mobile  \
    //                 , amount )  \
    //                 VALUES (?,  ?, ?, ?, ?)",
    //   [now, user_id, 1, full_mobile, amount]
    // );

    // const commision_amount = await db.execute(
    //   `select * from between_amount where type = 1 AND from_amount <= ${amount} AND to_amount >= ${amount}`
    // );

    // let transaction_id = new Date().valueOf().toString().slice(4);
    // let credits = amount;

    const Authorization = req.headers.authorization;
    const Sessionid = req.headers.sessionid;
    const Username = req.headers["x-username"];
    const Password = req.headers["x-password"];
    const form_data = {
      amount,
      Longitude,
      Latitude,
      CustomerCNIC,
      mobile: full_mobile,
    };
    const headers = {
      "content-type": "application/json",
      "X-IBM-Client-Id": "51d9d9c413a64e514aa88996f06d3083",
      "X-IBM-Client-Secret": "234373dc78dbebbd583559487c6222cb",
      "X-Channel": "bvsgateway",
      "X-Username": Username,
      "X-Password": Password,
      Sessionid: Sessionid,
      Authorization: Authorization,
    };
    console.log(form_data);
    console.log(headers);
    const PayResponse = await axios.post(apiUrl, form_data, { headers });
    console.log(PayResponse);
    console.log(
      "============ After PayResponse Api hit ================================"
    );
    if (PayResponse) {
      // return response.send(PayResponse.data);

      return resp_generator(response, PayResponse.data, "success", "success");
    } else {
      return resp_generator(
        response,
        "",
        "error",
        " EP Error Please try again Later."
      );
    }
    //   } else {
    //     return resp_generator(response, "", "error", "Insufficient Amount.");
    //   }
    // } else {
    //   return resp_generator(response, "", "error", "Insufficient Amount");
    // }

    // ==================
  } catch (error) {
    console.error("Error during deposit:", error);
    return resp_generator(response, "", "error", "Internal Server Error");
    // return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// ==================================================================================
exports.depositConfirm = async (req, response) => {
  try {
    const apiUrl =
      "https://rgw.8798-f464fa20.eu-de.ri1.apiconnect.appdomain.cloud/tmfb/dev-catalog/BVSCashDeposit/CashDepositBVS/Confirmation";
    console.log(
      "=======================calling Deposit Confirm  API===================================",
      req.body
    );
    // Extracting variables from req.body
    const {
      amount,
      Longitude,
      Latitude,
      mobile,
      TransactionID,
      TermsAccepted,
      AcquiredAfis,
      BioDeviceName,
      FingerNumber,
      ImageType,
      MPOS,
    } = req.body;

    // Validation using express-validator
    await body("amount").isInt({ min: 40, max: 25000 }).run(req);
    await body("Longitude").notEmpty().isNumeric().run(req);
    await body("Latitude").notEmpty().isNumeric().run(req);
    await body("mobile").isInt().isLength({ min: 11, max: 11 }).run(req);
    await body("TransactionID").notEmpty().run(req);
    await header("deviceid").notEmpty().run(req);
    await header("TOKEN").notEmpty().run(req);

    const v_errors = validationResult(req);
    if (!v_errors.isEmpty()) {
      console.log("Got validation  Error", v_errors);
      return resp_generator(response, "", "error", "Invalid Data");
    }
    const full_mobile = "92" + mobile.substring(1);

    console.log(mobile);

    // login = await verify_login(req.headers.token, req.headers.deviceid);
    // if (!login) {
    //   console.log("invalid login");
    //   return resp_generator(response, "", "error", "Invalid Login", 401);
    // }

    // if (login["show_easypaisa"] != 1) {
    //   return resp_generator(response, "", "error", "Transactions not allowed");
    // }
    // const user_id = login["id"];
    // const user_number = login["phone_number"];

    // console.log(
    //   "============ Before Balance Hit ================================"
    // );

    // const balance_row = await db.execute("CALL getLoginBalance(?)", [user_id]);
    // if (balance_row[0][0]) {
    //   console.log(
    //     "============ After Balance Check ================================"
    //   );
    //   if (balance_row[0][0][0]["Balance"] > amount) {
    // Check if Master EP is active

    // Check for quote reponse
    // login['show_easypaisa']

    //console.log(api_response)
    // const now = String(moment().format("yyyy-MM-DD H:mm:ss"));

    // db.execute(
    //   "INSERT INTO easy_paisa_hits (date, user_id ,user_type , receiver_mobile  \
    //                 , amount )  \
    //                 VALUES (?,  ?, ?, ?, ?)",
    //   [now, user_id, 1, full_mobile, amount]
    // );

    // const commision_amount = await db.execute(
    //   `select * from between_amount where type = 1 AND from_amount <= ${amount} AND to_amount >= ${amount}`
    // );

    // let transaction_id = new Date().valueOf().toString().slice(4);
    // let credits = amount;

    const Authorization = req.headers.authorization;
    const Sessionid = req.headers.sessionid;
    const Username = req.headers["x-username"];
    const Password = req.headers["x-password"];
    const form_data = {
      TransactionID,
      TermsAccepted,
      amount,
      Longitude,
      Latitude,
      mobile: full_mobile,
      AcquiredAfis,
      BioDeviceName,
      FingerNumber,
      ImageType,
      MPOS,
    };

    const headers = {
      "content-type": "application/json",
      "X-IBM-Client-Id": "51d9d9c413a64e514aa88996f06d3083",
      "X-IBM-Client-Secret": "234373dc78dbebbd583559487c6222cb",
      "X-Channel": "bvsgateway",
      "X-Username": Username,
      "X-Password": Password,
      Sessionid: Sessionid,
      Authorization: Authorization,
    };
    console.log(form_data);
    console.log(headers);
    const PayResponse = await axios.post(apiUrl, form_data, { headers });
    console.log(PayResponse);
    console.log(
      "============ After PayResponse Api hit ================================"
    );
    if (PayResponse) {
      // return response.send(PayResponse.data);

      return resp_generator(response, PayResponse.data, "success", "success");
    } else {
      return resp_generator(
        response,
        "",
        "error",
        " EP Error Please try again Later."
      );
    }
    //   } else {
    //     return resp_generator(response, "", "error", "Insufficient Amount.");
    //   }
    // } else {
    //   return resp_generator(response, "", "error", "Insufficient Amount");
    // }

    // ==================
  } catch (error) {
    console.error("Error during deposit:", error);
    return resp_generator(response, "", "error", "Internal Server Error");
    // return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

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
