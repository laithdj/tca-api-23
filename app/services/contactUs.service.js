const contactUs = require('../models/contactUs.model');


module.exports = {
    create: async (obj) => {
        const contact = new contactUs(obj);
        return await contact.save();
    }
}