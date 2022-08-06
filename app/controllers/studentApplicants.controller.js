const constants = require('../helpers/constants.helpers');
const studentApplicationService = require("../services/studentApplication.service");
const apiResp = require('../helpers/apiResponse.helper');
const expressFile = require('../helpers/expressFileUpload.helper')
const emailHelper = require('../helpers/email.helper');
module.exports = {

  application: async (req, res) => {
    const { applicationDetails, contact, countryOfBirth, dateOfBirth,
      declaration, educationDetails, educationQualification, email,
      englishProficiency, gender, guardian, homeAddress, name,
      nationality, statement } = req.body
    let studentSign = '';
    if (req.files) {
      console.log('enter into signature file')
      const result = await expressFile.uploadFile(req.files.signature, process.env.studentSignature)
      if (!result.status) {
        throw new Error(result.message)
      }
      studentSign = result.message
    }
    const application = {
      applicationDetails: JSON.parse(applicationDetails),
      contact: contact,
      countryOfBirth: JSON.parse(countryOfBirth),
      dateOfBirth: JSON.parse(dateOfBirth),
      declaration: {
        date: declaration.date,
        firstName: declaration.firstName,
        lastName: declaration.lastName,
        middleName: declaration.middleName,
        signature: studentSign
      },
      educationDetails: JSON.parse(educationDetails),
      educationQualification: JSON .parse(educationQualification),
      email: JSON.parse(email),
      englishProficiency: JSON.parse(englishProficiency),
      gender: JSON.parse(gender),
      guardian: JSON.parse(guardian),
      homeAddress: JSON.parse(homeAddress),
      name: JSON.parse(name),
      nationality: JSON.parse(nationality),
      statement: JSON.parse(statement)
    }

    console.log('----------------------------');
    console.log(application);
    
    const data = await studentApplicationService.create(application)

    let template = `
      <h2>Name</h2>
      <p style="margin:0;"><b>First Name: </b>${application['name'].firstName || ''}</p>
      <p style="margin:0;"><b>Middle Name: </b>${application['name'].middleName || ''}</p>
      <p style="margin:0;"><b>Last Name: </b>${application['name'].lastName || ''}</p>
      <br>

      <h2>Application Details</h2>
      <p style="margin:0;"><b>Intended Degree: </b>${application['applicationDetails'].intendedDegree || ''}</p>
      <p style="margin:0;"><b>Propoosed Start Date: </b>${application['applicationDetails'].propoosedStartDate || ''}</p>
      <p style="margin:0;"><b>Tution Fee Mode: </b>${application['applicationDetails'].tutionFeeMode || ''}</p>
      <p style="margin:0;"><b>Sponser: </b>${application['applicationDetails'].sponser || ''}</p>
      <br>

      <h2>Contact</h2>
      <p style="margin:0;"><b>Contact: </b>${application.contact || ''}</p>
      <br>

      <h2>Country Of Birth</h2>
      <p style="margin:0;"><b>Country Of Birth: </b>${application.countryOfBirth || ''}</p>
      <br>

      <h2>Date Of Birth</h2>
      <p style="margin:0;"><b>DOB: </b>${application.dateOfBirth || ''}</p>
      <br>

      <h2>Declaration</h2>
      <p style="margin:0;"><b>Date: </b>${application['declaration'].date || ''}</p>
      <p style="margin:0;"><b>First Name: </b>${application['declaration'].firstName || ''}</p>
      <p style="margin:0;"><b>Middle Name: </b>${application['declaration'].middleName || ''}</p>
      <p style="margin:0;"><b>Last Name: </b>${application['declaration'].lastName || ''}</p>
      <p style="margin:0;"><b>Signature: </b>${application['declaration'].signature || ''}</p>
      <br>
      
      <h2>Education Details</h2>`;

      for (const item of application['educationDetails']) {
        template += `
          <p style="margin:0;"><b>Institute Name: </b>${item.instituteName || ''}</p>
          <p style="margin:0;"><b>Country: </b>${item.country || ''}</p>
          <p style="margin:0;"><b>Attended From: </b>${item.attendedFrom || ''}</p>
          <br>
        `;
      }
      
      template += '<h2>Education Qualification</h2>';

      for (const item of application['educationQualification']) {
        template += `
          <p style="margin:0;"><b>Subject: </b>${item.subject || ''}</p>
          <p style="margin:0;"><b>Level: </b>${item.level || ''}</p>
          <p style="margin:0;"><b>Grade: </b>${item.grade || ''}</p>
          <p style="margin:0;"><b>Date: </b>${item.date || ''}</p>
          <br>
        `;
      }

      template += '<h2>English Proficiency</h2>';

      for (const item of application['englishProficiency']) {
        template += `
          <p style="margin:0;"><b>CertificateName: </b>${item.certificateName || ''}</p>
          <p style="margin:0;"><b>Grade: </b>${item.grade || ''}</p>
          <p style="margin:0;"><b>Date: </b>${item.date || ''}</p>
          <br>
        `;
      }

      template += `
        <h2>Email</h2>
        <p style="margin:0;"><b>Email: </b>${application.email || ''}</p>
        <br>

        <h2>Gender</h2>
        <p style="margin:0;"><b>Gender: </b>${application.gender || ''}</p>
        <br>

        <h2>Guardian</h2>
        <p style="margin:0;"><b>Guardian Name: </b>${application['guardian'].guardianName || ''}</p>
        <p style="margin:0;"><b>Guardian Relationship: </b>${application['guardian'].guardianRelationship || ''}</p>
        <p style="margin:0;"><b>Guardian Contact: </b>${application['guardian'].guardianContact || ''}</p>
        <p style="margin:0;"><b>Guardian Address: </b>${application['guardian'].guardianAddress || ''}</p>
        <br>

        <h2>Home Address</h2>
        <p style="margin:0;"><b>Street Address Line 1: </b>${application['homeAddress'].streetAddressLine1 || ''}</p>
        <p style="margin:0;"><b>Street Address Line 2: </b>${application['homeAddress'].streetAddressLine2 || ''}</p>
        <p style="margin:0;"><b>City: </b>${application['homeAddress'].city || ''}</p>
        <p style="margin:0;"><b>State/Province: </b>${application['homeAddress'].stateOrProvince || ''}</p>
        <p style="margin:0;"><b>Postal Code: </b>${application['homeAddress'].postalCode || ''}</p>
        <p style="margin:0;"><b>Country: </b>${application['homeAddress'].country || ''}</p>
        <br>

        <h2>Nationality</h2>
        <p style="margin:0;"><b>Nationality: </b>${application.nationality || ''}</p>
        <br>

        <h2>Statement</h2>
        <p style="margin:0;"><b>Statement: </b>${application.statement || ''}</p>`;

    
    if (req.files) {
      console.log('enter into application file')
      const result = await expressFile.uploadFile(req.files.studentApplication, process.env.studentSignature)
      if (!result.status) {
        throw new Error(result.message)
      }

      // to, subject, template, data
      // emailHelper.send('mshahzeb793@gmail.com', 'Student Applied', 'studentApplication', { name: declaration.firstName, degree: applicationDetails.intendedDegree }, result.message)
    }
    emailHelper.send('thecollaborativeauckland@gmail.com', 'Student Applied', template, {}, '')
    apiResp.sendData(res, data, constants.DATA_LOADED);

  }
}