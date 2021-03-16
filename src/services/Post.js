import { firestore } from "../firebase";

/**
 * this function will be fired when you first time run the app,
 * and it will fetch first 5 posts, here I retrieve them in descending order, until the last added post appears first.
 */
export async function postsFirstBatch() {
  try {
    const data = await firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    let posts = [];
    let lastKey = "";
    data.forEach((doc) => {
      posts.push({
        postId: doc.id,
        postContent: doc.data().postContent,
      });
      lastKey = doc.data().createdAt;
    });

    return { posts, lastKey };
  } catch (e) {
    console.log(e);
  }
}

/**
 * this function will be fired each time the user click on 'More Posts' button,
 * it receive key of last post in previous batch, then fetch next 5 posts
 * starting after last fetched post.
 */
export async function postsNextBatch(key) {
  try {
    const data = await firestore
      .collection("posts")
      .orderBy("createdAt", "desc")
      .startAfter(key)
      .limit(5)
      .get();

    let posts = [];
    let lastKey = "";
    data.forEach((doc) => {
      posts.push({
        postId: doc.id,
        author: doc.data().author,
        tags: doc.data().tags,
        postContent: doc.data().postContent,
      });
      lastKey = doc.data().createdAt;
    });
    return { posts, lastKey };
  } catch (e) {
    console.log(e);
  }
}
