import { Router } from 'express'

import { CampaignsService } from '../services/campaigns.service.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(CampaignsService.list())
})

// @ts-expect-error - Express 5 compatibility issue
router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Falta nombre' })
  const campaign = CampaignsService.create(name)
  res.status(201).json(campaign)
})

// @ts-expect-error - Express 5 compatibility issue
router.delete('/:id', (req, res) => {
  const ok = CampaignsService.delete(req.params.id)
  if (!ok) return res.status(404).json({ error: 'No encontrada' })
  res.json({ ok: true })
})

export default router
