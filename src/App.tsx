import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";

import { PlayersList } from "@components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App p-4">
        <PlayersList className="border rounded-md max-w-md max-h-[600px]" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
