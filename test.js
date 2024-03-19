const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Connect or Create & Connect on DB
mongoose.connect("mongodb://localhost/pcat-test-db");

//Create a Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

//Create a Model
const PhotoModel = mongoose.model("Photo", PhotoSchema); //takes "Photo" as an object name so decides to name the collection as "photos"

//Create a Photo BSON
/*PhotoModel.create({
  title: "Photo 2",
  description: "Photo 2 description",
});
*/

const disconnect = async () => {
  await mongoose.disconnect();
};
//Read a Photo
const findByName = async (name) => {
  const sonuc = await PhotoModel.find({ title: `${name}` });
  console.log(sonuc);
  await disconnect();
};

const updateByName = async (name, description) => {
  await PhotoModel.updateOne(
    { title: `${name}` },
    { description: `${description}` }
  );
  await findByName(name);
};
updateByName("Photo 2", "Photo 2 description updated really rly");
//findByName("Photo 2");
