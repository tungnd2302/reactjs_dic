import { Route,Routes } from "react-router-dom";
import DictionaryPage from "./Pages/Dictionary/Index";
import HomePage from "./Pages/Home/Index";
import PracticePage from "./Pages/Practice/Index";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route path="dictionary" element={<DictionaryPage />} />
        <Route path="practice" element={<PracticePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
