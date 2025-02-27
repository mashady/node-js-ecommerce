import mongoose from "mongoose";
import config from "config";

export default function () {
  const db = config.get("sys_info.db_uri");
  mongoose.connect(db).then(() => console.info(`Database Connected  ...`));
}
