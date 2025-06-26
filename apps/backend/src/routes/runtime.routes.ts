import { Router } from 'express'

import { RuntimeService } from '../services/runtime.service.js'

const router = Router()

// GET /runtime/jobs
router.get('/jobs', (req, res) => {
  res.json(RuntimeService.listJobs())
})

// POST /runtime/jobs
router.post('/jobs', (req, res) => {
  const { id, schedule } = req.body
  if (!id || !schedule) {
    res.status(400).json({ error: 'Missing id or schedule' })
    return
  }
  try {
    const job = RuntimeService.createJob(id, schedule, () => {
      // Placeholder: aquí se ejecutaría la lógica real del job
      // Se puede loggear o notificar
    })
    res.status(201).json(job)
  } catch (e) {
    res.status(400).json({ error: (e as Error).message })
  }
})

// POST /runtime/jobs/:id/pause
router.post('/jobs/:id/pause', (req, res) => {
  try {
    RuntimeService.pauseJob(req.params.id)
    res.json({ ok: true })
  } catch (e) {
    res.status(404).json({ error: (e as Error).message })
  }
})

// POST /runtime/jobs/:id/resume
router.post('/jobs/:id/resume', (req, res) => {
  try {
    RuntimeService.resumeJob(req.params.id)
    res.json({ ok: true })
  } catch (e) {
    res.status(404).json({ error: (e as Error).message })
  }
})

// DELETE /runtime/jobs/:id
router.delete('/jobs/:id', (req, res) => {
  try {
    RuntimeService.deleteJob(req.params.id)
    res.json({ ok: true })
  } catch (e) {
    res.status(404).json({ error: (e as Error).message })
  }
})

// POST /runtime/agents/:name/run
router.post('/agents/:name/run', async (req, res) => {
  const { name } = req.params
  try {
    const result = await RuntimeService.runAgent(name, req.body)
    if (result.ok) {
      res.json({ ok: true, result: result.result })
    } else {
      res.status(400).json({ ok: false, error: result.error })
    }
  } catch (e) {
    res
      .status(500)
      .json({ ok: false, error: e instanceof Error ? e.message : String(e) })
  }
})

export default router
