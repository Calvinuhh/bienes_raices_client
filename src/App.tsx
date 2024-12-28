import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginView from "./views/LoginView";
import RegiserView from "./views/RegisterView";
import RecoverPasswordView from "./views/RecoverPasswordView";
import ResultAcountView from "./views/ResultAcountView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegiserView />} />
            <Route
              path="/recuperar_contraseña"
              element={<RecoverPasswordView />}
            />
          </Route>

          <Route path="/confirmacion/:token" element={<ResultAcountView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
