import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebaseConfig"; // Assuming firebaseConfig.js is set up

const storage = getStorage(app);

export async function uploadImage(file) {
  const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef); // Returns the image URL
}
