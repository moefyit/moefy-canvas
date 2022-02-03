import { describe, test, expect } from 'vitest'
import { Random } from '@moefy-canvas/utils'

describe.concurrent('test Random', () => {
  for (let i = 0; i < 10000; i++) {
    test('test randomFloat', async () => {
      const start = Math.random() * 10000
      const end = start + Math.random() * (10000 - start)
      const result = Random.randomFloat(start, end)
      expect(result).toBeGreaterThanOrEqual(start)
      expect(result).toBeLessThanOrEqual(end)
    })
  }

  for (let i = 0; i < 10000; i++) {
    test('test randomInt', async () => {
      const start = Math.floor(Math.random() * 10000)
      const end = Math.floor(start + Math.random() * (9999 - start)) + 1
      const result = Random.randomInt(start, end)
      expect(result).toBeGreaterThanOrEqual(start)
      expect(result).toBeLessThanOrEqual(end - 1)
    })
  }

  for (let i = 0; i < 1000; i++) {
    test('test choice int', async () => {
      const choices = []
      for (let i = 0; i < 20; i++) {
        choices.push(Math.floor(Math.random() * 10000))
      }
      const result = Random.choice(choices)
      expect(choices).toContain(result)
    })
  }

  for (let i = 0; i < 1000; i++) {
    test('test choice string', async () => {
      let choices = ''
      for (let i = 0; i < 20; i++) {
        choices += String.fromCharCode(Random.randomInt(40, 128))
      }
      const result = Random.choice(choices)
      expect(choices).toContain(result)
    })
  }
})
