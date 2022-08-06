const { body } = require('express-validator')
const constants = require('../helpers/constants.helpers')
module.exports = {
    create: () => {
        return [
            body('title', constants.TITLE_REQUIRED)
                .trim()
                .notEmpty(),
            body('description', constants.DESCRIPTION_REQUIRED)
                .notEmpty(),
        ]
    }
}
