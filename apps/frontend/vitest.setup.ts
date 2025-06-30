import '@testing-library/jest-dom'

import React from 'react'
import { expect } from 'vitest'
;(globalThis as unknown as { expect: typeof expect }).expect = expect

// Configuración global de React para tests con JSX
;(globalThis as unknown as { React: typeof React }).React = React

// Si necesitas custom matchers o setup adicional, agrégalo aquí.

// Si es necesario, puedes agregar configuraciones globales aquí.
