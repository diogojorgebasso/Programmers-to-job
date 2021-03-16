import React, { useEffect, useState } from "react";
import { postsFirstBatch, postsNextBatch } from "../../services/Post";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [lastKey, setLastKey] = useState("");
  const [nextPosts_loading, setNextPostsLoading] = useState(false);

  useEffect(() => {
    // first 5 posts
    postsFirstBatch()
      .then((res) => {
        setPosts(res.posts);
        setLastKey(res.lastKey);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const fetchMorePosts = (key) => {
    if (key.length > 0) {
      setNextPostsLoading(true);
      postsNextBatch(key)
        .then((res) => {
          setLastKey(res.lastKey);
          // add new posts to old posts
          setPosts(posts.concat(res.posts));
          setNextPostsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setNextPostsLoading(false);
        });
    }
  };

  const allPosts = (
    <div>
      {posts.map((post) => {
        return (
          //make model for the post here
          <section key={post.postId}>
            <p>{post.postContent}</p>
          </section>
        );
      })}
    </div>
  );
  return (
    <div>
      <h1>Os Posts mais práticos sobre tecnologia</h1>
      <input placeholder="Pesquise aqui..." type="text" />
      <main id="top">{allPosts}</main>
      <div style={{ textAlign: "center" }}>
        {nextPosts_loading ? (
          <p>Carregando..</p>
        ) : lastKey.length > 0 ? (
          <button onClick={() => fetchMorePosts(lastKey)}>More Posts</button>
        ) : (
          <span>Todos os conteúdos foram consumidos!</span>
        )}
      </div>
      <a href="#top">Voltar para o início</a>
    </div>
  );
}
