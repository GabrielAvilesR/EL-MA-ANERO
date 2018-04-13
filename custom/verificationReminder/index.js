import { Router } from 'express'
import { sendMails } from './function'

const router = new Router()

router.get('/', sendMails)

export default router