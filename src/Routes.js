import React from "react";
import { Route, Switch } from "react-router-dom";
import Cosumidor from "./components/consumidor";
import Editar from "./components/editar";

const Routes = () => {
    return (
      <div>
        <Switch>
        <Route exact path="/">
            <Cosumidor/>
          </Route>
          <Route exact path="/actualizar/:id">
            <Editar/>
          </Route>
          
        </Switch>
      </div>
    );
  };
  
  export default Routes;