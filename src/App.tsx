import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

import { PlayersList } from "@components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <PlayersList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
