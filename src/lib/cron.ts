// lib/cron.ts
import cron from 'node-cron'

const task = cron.schedule(
  '*/1 * * * *',
  () => {
    console.log('Cron job running every minute')
  },
  {
    scheduled: false, // Prevent it from starting immediately
  }
)

export const startCron = () => {
  task.start()
}

export const stopCron = () => {
  task.stop()
}
