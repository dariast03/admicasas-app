import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const FirebaseStorage = getStorage();
const storageRef = ref(FirebaseStorage, "images/");

type Storage = "images" | "payments";

export type TFile = {
  uri: string;
  name: string;
};
/**
 * Upload a file to Firestore and returns the  selected file's url.
 * @param {string} file - File object.
 * @param {number} extraName - Array of extra names to be concatenated at the beginning of the file name.
 * @param {number} storage - Storage path -> images | payments. default images
 * @returns {string} - URL of the uploaded file.
 */
const onUploadFile = async (
  file: TFile,
  extraName: string[],
  storage: Storage = "images"
): Promise<string> => {
  try {
    const fullFileName = `${extraName.join(
      "-"
    )}__${new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}__${file.name.replaceAll(" ", "-")}`.replaceAll("/", "-");

    const response = await fetch(file.uri);
    const blob = await response.blob();

    const storageReference = ref(storageRef, fullFileName);

    await uploadBytes(storageReference, blob);

    const downloadURL = await getDownloadURL(storageReference);
    return downloadURL;
  } catch (error: any) {
    throw new Error(error.code);
  }
};
export default {
  onUploadFile,
};
