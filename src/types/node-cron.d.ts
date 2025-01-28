// @types/node-cron.d.ts

// Define an interface for the task
interface Task {
  start: () => void
  stop: () => void
  lastDate: () => Date | null // Adjust according to your needs
  nextDates: (count?: number) => Date[]
  cronTime: string
  // Add more properties as needed
}

declare module 'node-cron' {
  export function schedule(
    cronTime: string,
    onTick: () => void,
    options?: {
      scheduled?: boolean
      timezone?: string
    }
  ): Task // Return the Task type

  export function getTasks(): Task[] // Return an array of Task
}
