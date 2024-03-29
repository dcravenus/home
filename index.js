const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

require("./routes")(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
