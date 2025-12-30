import 'dotenv/config';
import mongoose from 'mongoose';
import { seedDatabase } from '../src/config/seed';
import { parseLogs } from '../src/config/parse'; 

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✅ MongoDB connected for tests');

  await seedDatabase();
  await parseLogs();
  console.log('✅ Database seeded and logs parsed for tests');

});

afterAll(async () => {
  await mongoose.disconnect();
  console.log('✅ MongoDB disconnected');
});
