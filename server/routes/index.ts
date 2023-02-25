import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { body } from 'express-validator'
import rateLimit from 'express-rate-limit'
import { verifySignature, verifyCommitment, verifyDeactivation, isAllDeactivated } from '../src/eas-contract'
import { activate, deactivate, deactivateAll } from '../src/eas'
// import appConfig from '../config'

const router = express.Router()
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const limiter = (args?) => rateLimit({
  windowMs: 1000 * 60,
  max: 60,
  keyGenerator: req => req.fingerprint?.hash ?? '',
  ...args
})

router.get('/health', async (req, res) => {
  console.log('[/health]', req.fingerprint)
  res.send('OK').end()
})

router.post('/activate',
  limiter(),
  body('alias').isLength({ min: 1, max: 32 }).trim().matches(/[a-zA-Z0-9._-]+/),
  body('sld').isLength({ min: 1, max: 32 }).trim().matches(/[a-z0-9-]+/),
  body('forwardAddress').isEmail().trim().matches(/0x[a-fA-F0-9]+/),
  body('signature').isLength({ min: 132, max: 132 }).trim().matches(/0x[a-fA-F0-9]+/),
  async (req, res) => {
    const { alias, sld, forwardAddress, signature } = req.body
    console.log('[/activate]', { alias, sld, forwardAddress, signature })
    try {
      const validSignature = await verifySignature({ signature, sld, alias, forwardAddress })
      if (!validSignature) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'invalid signature' })
      }
      const validCommitment = await verifyCommitment({ alias, sld, forwardAddress, signature })
      if (!validCommitment.success) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'commitment mismatch', ...validCommitment })
      }
      await activate(sld, alias, forwardAddress)
      res.json({ success: true })
    } catch (ex) {
      console.error('[/activate]', ex)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'cannot process request' })
    }
  })

router.post('/deactivate',
  limiter(),
  body('alias').isLength({ min: 1, max: 32 }).trim().matches(/[a-zA-Z0-9._-]+/),
  body('sld').isLength({ min: 1, max: 32 }).trim().matches(/[a-z0-9-]+/),
  async (req, res) => {
    const { sld, alias } = req.body
    console.log('[/deactivate]', { alias, sld })
    try {
      const isDeactivated = await verifyDeactivation(sld, alias)
      if (!isDeactivated) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not deactivated on contract' })
      }
      await deactivate(sld, alias)
      res.json({ success: true })
    } catch (ex) {
      console.error('[/deactivate]', ex)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'cannot process request' })
    }
  })

router.post('/deactivate-all',
  limiter(),
  body('sld').isLength({ min: 1, max: 32 }).trim().matches(/[a-z0-9-]+/),
  async (req, res) => {
    const { sld } = req.body
    console.log('[/deactivate]', { sld })
    try {
      const allDeactivated = await isAllDeactivated(sld)
      if (!allDeactivated) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not all deactivated on contract' })
      }
      await deactivateAll(sld)
      res.json({ success: true })
    } catch (ex) {
      console.error('[/deactivate-all]', ex)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'cannot process request' })
    }
  })

export default router
