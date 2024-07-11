import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

async function main() {
  await mongoose.connect(config.database as string);

  app.listen(config.port, () => {
    console.log(`App listening on port ${config.port}`);
  });
}

main();
