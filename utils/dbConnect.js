function dbConnect() {
  //     const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ihwth.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
  // const client = new MongoClient(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   serverApi: ServerApiVersion.v1,
  // });
  console.log("DB Connected");
}
module.exports = dbConnect;
