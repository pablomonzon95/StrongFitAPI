

const sharp = require("sharp");
const uuid = require ("uuid");
const path = require("path") ;



const fs = require("fs").promises;



// i Generate the path where i want to store images/videos"
const uploadsPath = path.join(__dirname, "../../docs", process.env.UPLOADS_DIR ?? "");

// Function that process binary data and save the image
const processAndSaveImage = async (imageBuffer) => {

  // Creating the uploads directory if not exist
  await fs.mkdir(uploadsPath, { recursive: true });

  // Processing the image with sharp
  const image = sharp(imageBuffer)

  // Obtaining the image metadata (witdh, height, format, etc)
  const imageMetadata = await image.metadata();

  // Resizing the image to less than 1000px 
  if ( imageMetadata.width && imageMetadata.width > 1000) {
    image.resize(1000);
  }

  // Generating a random and unique name for the image with the module uuid.
  const imageName = `${uuid.v4()}.${imageMetadata.format}`;

  // Generating the path where we are going to store the media 
  const imagePath = path.join(uploadsPath, imageName);

  await image.toFile(imagePath);

  // Returning image Name
  return imageName;
};

module.exports = processAndSaveImage;