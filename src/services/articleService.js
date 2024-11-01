import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  orderBy,
  limit,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export async function createArticle({ title, body, category, BackgroundImageUrl, Comments = [], Gallery }) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

    const data = {
      title,
      body,
      category,
      BackgroundImageUrl,
      Comments,
      Gallery: Gallery || [],
      date: formattedDate,
      author: user ? user.displayName || "Anonymous" : "Unknown Author",
    };

    const docRef = await addDoc(collection(db, "articles"), data);
    console.log("Article created with ID:", docRef.id);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
}

export async function fetchArticles() {
  try {
    const snapshot = await getDocs(
      query(collection(db, "articles"), orderBy("date", "desc"), limit(20))
    );
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function addCommentToArticle(articleId, comment) {
  try {
    const articleRef = doc(db, "articles", articleId);

    await updateDoc(articleRef, {
      Comments: arrayUnion(comment),
    });

    const updatedArticleSnap = await getDoc(articleRef);
    const updatedArticleData = updatedArticleSnap.data();

    return updatedArticleData.Comments || [];
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}
