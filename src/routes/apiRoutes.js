const express = require('express');
const workflowRoutes = require('./workflowRoutes');
const router = express.Router();

router.get('/', async (req, res) => {
    // The return value is configured.
    // The date and time are prepared ISO format.
    var value = {
        dateTime: new Date().toISOString(),
    }

    // The successful answer is transmitted and data is sent.
    var result = res.status(200).json(value)

    // response
    return result
});

router.use(workflowRoutes)

module.exports = router;
