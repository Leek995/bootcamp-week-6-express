const app = require('./src/app.js');
const { db } = require("./src/db/connection");
const port = 3000;

// keep tracks of local host 3000 and listening to and request to localhost 3000
app.listen(port, async () => {
  await db.sync();
  console.log(`Server is listening at port: ${port}`);
})