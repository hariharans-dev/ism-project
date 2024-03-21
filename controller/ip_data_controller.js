const { client, connectToMongoDB } = require("../model/data_model.js");

connectToMongoDB();
class IP {
  addiplog(data) {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_IP_LOGS);
      const result = collections.insertOne(data, {
        writeConcern: {
          w: "majority",
          wtimeout: 0,
          provenance: "clientSupplied",
        },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  findiplogs() {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_IP_LOGS);
      const cursor = collections.find().sort({ timestampField: 1 });
      const result = cursor.toArray(); // Convert cursor to array
      return result;
    } catch (error) {
      return error;
    }
  }

  addregisteredip(data) {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_REGISTERED_IP);

      const result = collections.insertOne(data, {
        writeConcern: {
          w: "majority",
          wtimeout: 0,
          provenance: "clientSupplied",
        },
      });

      return result;
    } catch (error) {
      return error;
    }
  }

  deleteregisteredip(data) {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_REGISTERED_IP);

      const result = collections.deleteOne(data, {
        writeConcern: {
          w: "majority",
          wtimeout: 0,
          provenance: "clientSupplied",
        },
      });

      return result;
    } catch (error) {
      return error;
    }
  }

  async findregisteredip() {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_REGISTERED_IP);
      const cursor = collections.find();
      const result = await cursor.toArray();
      const ipValues = result.map((doc) => doc.ipaddr);

      return ipValues;
    } catch (error) {
      return error;
    }
  }
}

module.exports = IP;
