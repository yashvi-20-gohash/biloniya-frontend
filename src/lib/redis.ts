import { createClient, RedisClientType } from 'redis'

const client: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
})

client.on('connect', () => {
  console.log('Connected to Redis')
})

client.on('error', (err: Error) => {
  console.error('Redis error:', err)
})
;(async () => {
  try {
    await client.connect()
  } catch (err) {
    console.error('Could not connect to Redis:', err)
  }
})()
