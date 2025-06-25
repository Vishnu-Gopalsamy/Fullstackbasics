// Simple diagnostic script to check networking and MongoDB connection
import http from 'http';
import mongoose from 'mongoose';
import { networkInterfaces } from 'os';
import dns from 'dns';

console.log('===============================================');
console.log('🔍 CONNECTION DIAGNOSTIC TOOL');
console.log('===============================================');

// Check if port 3000 is accessible
console.log('\n🔄 Checking if port 3000 is available...');
const testServer = http.createServer();

testServer.once('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('❌ Port 3000 is already in use!');
    console.log('👉 This might be preventing your server from starting.');
    console.log('👉 Try changing your server port or stopping the other application.');
  } else {
    console.log(`❌ Error checking port: ${err.message}`);
  }
  portCheckCompleted();
});

testServer.once('listening', () => {
  console.log('✅ Port 3000 is available!');
  testServer.close();
  portCheckCompleted();
});

function portCheckCompleted() {
  // Check MongoDB connection
  console.log('\n🔄 Checking MongoDB connection...');
  
  try {
    mongoose.connect('mongodb+srv://Vishnu:4yvT6QjBVusSvzg6@cluster0.rtazada.mongodb.net/')
      .then(() => {
        console.log('✅ MongoDB connection successful!');
        networkCheck();
      })
      .catch((err) => {
        console.log('❌ MongoDB connection failed!');
        console.log(`👉 Error: ${err.message}`);
        if (err.message.includes('ENOTFOUND')) {
          console.log('👉 It looks like there might be a DNS issue. Check your internet connection.');
        }
        networkCheck();
      });
  } catch (error) {
    console.log('❌ Error while attempting MongoDB connection');
    console.log(`👉 Error: ${error.message}`);
    networkCheck();
  }
}

function networkCheck() {
  // Display network interfaces
  console.log('\n🔄 Checking network interfaces...');
  const nets = networkInterfaces();
  const results = {};

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  console.log('Available network interfaces:');
  for (const [key, value] of Object.entries(results)) {
    console.log(`${key}: ${value.join(', ')}`);
  }

  // Check DNS resolution
  console.log('\n🔄 Checking DNS resolution...');
  dns.lookup('mongodb.net', (err, address, family) => {
    if (err) {
      console.log(`❌ DNS resolution failed: ${err.message}`);
    } else {
      console.log(`✅ DNS resolution working: mongodb.net → ${address}`);
    }

    console.log('\n===============================================');
    console.log('🔍 DIAGNOSTIC SUMMARY');
    console.log('===============================================');
    console.log('If any of the checks above failed, this might be');
    console.log('why your server is not connecting properly.');
    console.log('Try fixing the issues reported above.');
    console.log('===============================================');
    
    process.exit();
  });
}

// Start the test
testServer.listen(3000);