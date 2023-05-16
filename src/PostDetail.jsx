import {useQuery, useMutation} from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {



  // replace with useQuery
  const  {data, isError, error, isLoading} = useQuery(
    ["comments", post.id],//쿼리키를 배열로 작성하기
    () => fetchComments(post.id), {staleTime: 2000}
  ) ;

  const deleteMutation = useMutation((postId) => deletePost(postId))
  const updateMutation = useMutation((postId) => updatePost(postId))

  if(isLoading) return <h3>Loading</h3>;
  if(isError) return (
    <h3>oop, comments Something went wrong!
      <p>{error.toString()}</p>
    </h3>
  );

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick = {() => deleteMutation.mutate(post.id)}>Delete</button>

      { deleteMutation.isError && (<p style={{color: "red"}} >deleting error </p>)}
      { deleteMutation.isLoading && (<p style={{color: "purple"}}  >Loading Deleting </p>)}
      { deleteMutation.isSuccess && (<p style={{color: "green"}}  >Post has been deleted </p>)}

      <button onClick = {() => updateMutation.mutate(post.id)}>Update title</button>

      { updateMutation.isError && (<p style={{color: "red"}} > Updating error </p>)}
      { updateMutation.isLoading && (<p style={{color: "purple"}}  >Loading Updating </p>)}
      { updateMutation.isSuccess && (<p style={{color: "green"}}  >Post has been updated</p>)}

      <p>{post.body}</p>

      <h4>Comments</h4>

      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
