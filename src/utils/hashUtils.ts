import CryptoJS from "crypto-js";

// Generate file hash
export const getFileHash = async (file: File): Promise<`0x${string}`> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer as any);
      const hash = `0x${CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex)}` as `0x${string}`;
      resolve(hash);
    };
    reader.readAsArrayBuffer(file);
  });
};

// Generate string hash
export const getStringHash = (data: string | object): `0x${string}` => {
  const stringData = typeof data === 'object' ? JSON.stringify(data) : data;
  return `0x${CryptoJS.SHA256(stringData).toString(CryptoJS.enc.Hex)}` as `0x${string}`;
}; 