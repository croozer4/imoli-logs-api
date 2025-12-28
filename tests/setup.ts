import 'dotenv/config';
import mongoose from 'mongoose';

// import mongoose from 'mongoose';

// beforeAll(async () => {
//   await mongoose.connect(process.env.MONGODB_URI!);
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });

afterAll(async () => {
  await mongoose.disconnect();
});