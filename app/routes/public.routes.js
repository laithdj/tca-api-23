const router = require('express').Router();
const tryCatch = require('../helpers/tryCatch.helper');
const jobController = require('../controllers/jobs.controller')
const studentApplicationController = require('../controllers/studentApplicants.controller')
const contactUsController = require('../controllers/contactUs.controller')
const jobValidator = require('../validators/job.validator')
const jobApplyValidator = require('../validators/jobApplicant.validator')
const validate = require('../helpers/validate.helper');

// job 
router.get('/job/list', tryCatch(jobController.list));
router.post('/job/apply', [jobApplyValidator.apply(), validate], tryCatch(jobController.jobApplication));
//student
router.post('/student-application', tryCatch(studentApplicationController.application));

// contact Us
router.post('/contact-us', tryCatch(contactUsController.contactUsForm));

module.exports = router;