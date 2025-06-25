import 'vitest/globals'

import { expect } from 'vitest'
;(globalThis as unknown as { expect: typeof expect }).expect = expect

// Si necesitas custom matchers o setup adicional, agrégalo aquí.
