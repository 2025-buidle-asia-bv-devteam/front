// Upload file to IPFS using Pinata
export const uploadFileToIPFS = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Pinata upload error:", errorData);
      throw new Error(`IPFS upload error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("File uploaded to IPFS:", data);
    return data.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw new Error("Error uploading file to IPFS");
  }
};

// Upload JSON to IPFS using Pinata
export const uploadJSONToIPFS = async (jsonData: any): Promise<string> => {
  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
      body: JSON.stringify(jsonData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Pinata JSON upload error:", errorData);
      throw new Error(`IPFS JSON upload error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("JSON uploaded to IPFS:", data);
    return data.IpfsHash;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw new Error("Error uploading JSON data to IPFS");
  }
}; 