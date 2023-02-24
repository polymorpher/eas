const express = require('express')
const router = express.Router()
const { StatusCodes } = require('http-status-codes')
const { body, validationResult } = require('express-validator')
const rateLimit = require('express-rate-limit')
const appConfig = require('../config')

const limiter = (args) => rateLimit({
  windowMs: 1000 * 60,
  max: 60,
  keyGenerator: req => req.fingerprint?.hash || '',
  ...args,
})

router.get('/health', async (req, res) => {
  Logger.log('[/health]', req.fingerprint)
  res.send('OK').end()
})

router.post('/activate',
  limiter(),
  body('alias').isLength({ min: 1, max: 32 }).trim().matches(/[a-zA-Z0-9._-]+/),
  body('sld').isLength({ min: 1, max: 32 }).trim().matches(/[a-z0-9-]+/),
  body('forwardAddress').isEmail().trim().matches(/0x[a-fA-F0-9]+/),
  body('signature').isLength({ min: 132, max: 132 }).trim().matches(/0x[a-fA-F0-9]+/),
  async (req, res) => {
  const { sld } = req.body

  try {
    // TODO
    res.json({ })
  } catch (ex) {
    console.error('[/activate]', { sld })
    console.error(ex)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'cannot process request' })
  }
})


router.post('/deactivate',
  limiter(),
  body('alias').isLength({ min: 1, max: 32 }).trim().matches(/[a-zA-Z0-9._-]+/),
  body('sld').isLength({ min: 1, max: 32 }).trim().matches(/[a-z0-9-]+/),
  async (req, res) => {
    const { sld } = req.body

    try {
      // TODO
      res.json({ })
    } catch (ex) {
      console.error('[/deactivate]', { sld })
      console.error(ex)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'cannot process request' })
    }
  })


module.exports = router
