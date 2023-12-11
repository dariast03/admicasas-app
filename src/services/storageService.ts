import storage from "@react-native-firebase/storage";

type Storage = "images" | "payments";

export type TFile = {
  uri: string;
  name: string;
};
/**
 * Upload a file to Firestore and returns the  selected file's url.
 * @param {string} file - File object.
 * @param {number} extraName - Array of extra names to be concatenated at the beginning of the file name.
 * @param {number} storageBucket - Storage path -> images | payments. default images
 * @returns {string} - URL of the uploaded file.
 */
const onUploadFile = async (
  file: TFile,
  extraName: string[],
  storageBucket: Storage = "images"
): Promise<string> => {
  try {
    const fullFileName = `${extraName.join(
      "-"
    )}__${new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}__${file.name.replaceAll(" ", "-")}`.replaceAll("/", "-");

    const storageReference = storage().ref(`${storageBucket}/${fullFileName}`);

    await storageReference.putFile(file.uri);

    const downloadURL = await storageReference.getDownloadURL();
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.code);
  }
};
export default {
  onUploadFile,
};
