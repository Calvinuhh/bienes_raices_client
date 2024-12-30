import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import LoginView from "./views/LoginView";
import RegiserView from "./views/RegisterView";
import RecoverPasswordView from "./views/RecoverPasswordView";
import ResultAcountView from "./views/ResultAcountView";
import ChangePasswordForm from "./components/ChangePasswordForm";
import PropertiesView from "./views/PropertiesView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout showHeader={false} />}>
            <Route path="/login" element={<LoginView />} />
            <Route path="/registro" element={<RegiserView />} />
            <Route
              path="/recuperar_password"
              element={<RecoverPasswordView />}
            />
          </Route>

          <Route element={<Layout showHeader={true} />}>
            <Route path="/mis_propiedades" element={<PropertiesView />} />
          </Route>

          <Route path="/confirmacion/:token" element={<ResultAcountView />} />
          <Route
            path="/cambiar_password/:token"
            element={<ChangePasswordForm />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
