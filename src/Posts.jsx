import { useState } from "react";
import {useQuery} from "react-query";
// useQuery는 훅이다. 우리가 서버로부터 데이터를 페치할 때 사용하는

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  //const data = []; //옵션 쿼리키, 커리에 데이터를 가져올 비동기(async) 함수,
  // 페치포스트로부터 반환된 데이터가 매핑된다.
  const {data} = useQuery("posts", fetchPosts) ;
  if(!data) return <div/>;


  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
