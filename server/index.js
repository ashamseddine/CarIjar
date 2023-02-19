const server = require("./src/config/server");
const connection = require("./src/config/connection");

const cluster = require("cluster");
const os = require("os");
const numCPU = os.cpus().length;

const PORT = process.env.PORT ?? 5000;

connection(() => {
  if (cluster.isMaster) {
    for (let i = 0; i < numCPU; i++) {
      cluster.fork();
    }
  } else {
    server.listen(PORT, () => {
      console.log(`Server started listening on port ${PORT}`, "---- index");
    });
  }
});
