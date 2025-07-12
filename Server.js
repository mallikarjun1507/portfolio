const express = require("express");
const app = express();
require("dotenv").config();

// Import the database promise
const dbPromise = require("./config/dbconfig");

const portfolioRoute = require("./routes/portfolioRoute");

app.use(express.json());

// Wait for database to initialize before setting up routes
dbPromise.then(pool => {
  // Make pool available to routes if needed
  app.locals.pool = pool;
  
  // Setup routes
  app.use("/api/portfolio", portfolioRoute);

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});