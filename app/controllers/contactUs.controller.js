const constants = require('../helpers/constants.helpers');
const apiResp = require('../helpers/apiResponse.helper');
const emailHelper = require('../helpers/email.helper');
module.exports = {

  contactUsForm: async (req, res) => {
    

    let template = `
      <h2>Contact Us Details</h2>
      <p style="margin:0;"><b>Category: </b>${req.body['category'] || ''}</p>
      <p style="margin:0;"><b>First Name: </b>${req.body['firstName'] || ''}</p>
      <p style="margin:0;"><b>Last Name: </b>${req.body['lastName'] || ''}</p>
      <p style="margin:0;"><b>Country: </b>${req.body['country'] || ''}</p>
      <p style="margin:0;"><b>Comment: </b>${req.body['comment'] || ''}</p>`;

    emailHelper.send('thecollaborativeauckland@gmail.com', req.body['subject'], template, {}, '')
    apiResp.sendData(res, req.body, constants.DATA_LOADED);

  }
}