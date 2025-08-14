import { Route, Routes } from "react-router-dom";
import routes from "./shared/const/routes";
import Payment from "./pages/Payment/Payment";
import Status from "./pages/Status/Status";
import NotFound from "./pages/NotFound/NotFound";
import Card from "./shared/components/Card/Card";

const App = () => (
  <Card>
    <Routes>
      <Route element={<Payment />} path={routes.main} />
      <Route element={<Status />} path={routes.status} />
      <Route element={<NotFound />} path={routes.notFound} />
    </Routes>
  </Card>
);

export default App;
