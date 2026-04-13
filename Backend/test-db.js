import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('📝 MONGO_URI exists:', !!process.env.MONGO_URI);
    
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not found in .env file');
      return;
    }
    
    // Hide password in logs for security
    const hiddenUri = process.env.MONGO_URI.replace(/\/\/(.*)@/, '//***:***@');
    console.log('📡 Connecting to:', hiddenUri);
    
    // Connect without deprecated options
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connection successful!');
    
    // Test the connection
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('📋 Full error:', error);
  }
};

testConnection();