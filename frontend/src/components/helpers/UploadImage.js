const UploadImage = async (image) => {
  try {
    const url = `https://api.cloudinary.com/v1_1/dadaiytmf/image/upload`;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "tech_wave");
    
    console.log("Cloudinary URL:", url);
    console.log("Form Data:", formData.get("file"), formData.get("upload_preset"));

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errMessage = await response.text();
      throw new Error(`Failed to upload image: ${errMessage}`);
    }

    const data = await response.json();
    return data;  
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    return null;
  }
};

export default UploadImage;  
