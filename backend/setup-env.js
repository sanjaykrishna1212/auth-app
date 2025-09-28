////////////////////////////////////////////////////////////////////////////////////////////
// Purpose: Helps to  setup the evviroment path to run appliction 
//
// Author: Sanjay
////////////////////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');

const envContent = `MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=auth_app
PORT=3000
`;

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('.env file created successfully!');
  console.log('Please review and modify the .env file if needed.');
} else {
  console.log('.env file already exists. Skipping creation.');
}

console.log('\n Next steps:');
console.log('1. connecting MongoDB is running');
console.log('2. Run: npm run seed');
console.log('3. Run: npm start');
