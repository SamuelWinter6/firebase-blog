import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import defaultBackgroundImage from "../assets/nasa-space-shuttle-take-off-moon-4k-wallpaper-uhdpaper.com-206@3@a.jpg";

async function fetchArticle(articleId) {
  const articleRef = doc(db, "articles", articleId);
  const articleSnap = await getDoc(articleRef);

  if (articleSnap.exists()) {
    const articleData = articleSnap.data();
    const backgroundImageUrl = articleData.BackgroundImageUrl || defaultBackgroundImage;

    const formattedDate = articleData.date ? new Date(articleData.date).toLocaleDateString() : "Date not available";
    const formattedGallery = (articleData.Gallery || []).filter(image => image && image.url);

    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return {
      ...articleData,
      date: formattedDate,
      BackgroundImageUrl: backgroundImageUrl,
      Gallery: formattedGallery,
      Comments: articleData.Comments || []
    };
  } else {
    console.log("No such article found!");
    document.body.style.backgroundImage = `url(${defaultBackgroundImage})`;
    return null;
  }
}

export default fetchArticle;
