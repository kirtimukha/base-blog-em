import { Posts } from "./Posts";
import "./App.css";

import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();
//이제 provider를 설정해서 prop으로 클라이언트를 이용할 수 있다.
// 클라이언트는 cache 등 우리에게 필요한 정보가 들어있다.
function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
