const { client, connectToMongoDB } = require("../model/data_model.js");

connectToMongoDB();
class Attendance {
  addattendance(data) {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_ATTENDANCE);
      data.date = new Date();
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

  findattandance(reg_number) {
    try {
      const collections = client
        .db(process.env.DB)
        .collection(process.env.COLLECTION_ATTENDANCE);

      const cursor = collections
        .find({ regno: reg_number })
        .sort({ timestampField: -1 }); // Sorting by timestamp field in descending order

      const result = cursor.toArray(); // Convert cursor to array
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = Attendance;
