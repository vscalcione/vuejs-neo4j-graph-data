const express = require("express");
const cors = require("cors");
const neo4j = require("neo4j-driver");

const app = express();
const port = process.env.PORT || 3000;

const dbHost = process.argv[2];
const driver = neo4j.driver(
  `neo4j://${dbHost}:7687`,
  neo4j.auth.basic("neo4j", "test")
);

const corsOptions = {
  origin: "http://localhost:8080",
};

app.get("/", cors(corsOptions), async (req, res, next) => {
  const session = driver.session();
  try {
    const rootNodes = await session.run(
      "MATCH (n) WHERE NOT (n)-->() RETURN n"
    );
    const rootNodeName = rootNodes.records[0].toObject().n.properties.name;
    const tree = await session.run(
      `MATCH p=(n:Node {name:'${rootNodeName}'})<-[:CHILD*]-(m) 
        WITH COLLECT(p) AS ps 
        CALL apoc.convert.toTree(ps) yeild value
        RETURN value`
    );
    const json = JSON.stringify(tree.records[0].toObject().value);
    res.json(json);
  } catch (error) {
    next(error);
  } finally {
    session.close();
  }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})
