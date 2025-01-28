// src/lib/mongodb.ts
import mongoose from 'mongoose'
import User from '../models/User'

const { MONGODB_URI } = process.env

const options = {
  appName: 'devrel.article.nextauthjs',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
}

const connectionMongo: { isConnected: number } = { isConnected: 0 }
let hasSeeded = false

// Function to seed data
const seedData2 = async () => {
  try {
    if (hasSeeded) {
      console.log('Data already seeded, skipping...')
      return
    }
    await User.seedData()
    hasSeeded = true
    console.log('Seeding completed successfully')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

export const connectDB = async () => {
  if (connectionMongo.isConnected) {
    console.log('MongoDB already connected!')
    return true // Return if already connected
  }

  let retries = 5 // Number of retries
  while (retries) {
    try {
      const { connection } = await mongoose.connect(
        MONGODB_URI as string,
        options
      )
      connectionMongo.isConnected = connection.readyState

      if (connection.readyState === 1) {
        console.log('MongoDB connected successfully')

        // Seed data only after successful connection and only once
        if (!hasSeeded) {
          await seedData2() // Seed data automatically on connection
        }
        return true // Return success on connection
      }
    } catch (error) {
      console.error('MongoDB connection error:', error)
      retries -= 1 // Decrease retry count
      console.log(`Retries left: ${retries}`)
      await new Promise((res) => setTimeout(res, 5000)) // Wait 5 seconds before retrying
    }
  }
  throw new Error('Could not connect to MongoDB after several retries')
}

// Monitor connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('MongoDB connection closed due to app termination')
  process.exit(0)
})
