import { type Request, type Response } from 'express'

export const getHealthStatus = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: 'healthy', message: 'STRATO Engine is running' })
}
