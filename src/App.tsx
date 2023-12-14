import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { StoreProvider } from "@stores";
import { SearchPlayers, FavoritePlayers } from "@components";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="App p-4 flex overflow-y-hidden h-screen space-x-4 ">
          <SearchPlayers />
          <FavoritePlayers />
        </div>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
