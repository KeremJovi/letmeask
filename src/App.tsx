import { Route, BrowserRouter, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";
import { AccessRoom } from "./pages/AccessRoom";
import { AdminRoom } from "./pages/AdminRoom";

import "./styles/global.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          {/*Ele não permite que duar rotas sejam acessadas ao mesmo tempo */}
          <Switch>
            {/*Quando se dejesa criar uma nova rota e necessario que coloque o exact para que não seja exibidas as duas paginas juntas */}
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/access/:roomId" component={AccessRoom} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
