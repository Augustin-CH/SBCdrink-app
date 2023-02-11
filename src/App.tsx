import React from "react";
import {useRoutes} from "react-router-dom";
import {routes} from "@/router";

// @mui material components
import ThemeProvider from "@/assets/theme";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const appRoutes = useRoutes(routes);
  return (
      <ThemeProvider>
        <CssBaseline />
        {appRoutes}
      </ThemeProvider>
  );
}

export default App;
