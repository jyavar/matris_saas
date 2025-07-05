import request from "supertest"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { server } from "../index"
import { analyticsReportingService } from "../services/analytics-reporting.service"

describe("Analytics Reporting API", () => {
  it("should get reports", async () => {
    const response = await request(server).get("/api/analytics-reporting")
    expect(response.status).toBe(200)
  })
})
