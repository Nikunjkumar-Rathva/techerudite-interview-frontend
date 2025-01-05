import { Route, Routes } from "react-router";
import AdminRegistration from "./pages/admin/Registration";
import Login from "./pages/auth/Login";
import Confirmation from "./pages/Confirmation";
import CustomerRegistration from "./pages/customer/Registration";
import Dashboard from "./pages/Dashboard";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const httpLink = import.meta.env.VITE_API_URL;

  const client = new ApolloClient({
    uri: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="login" index element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="admin">
          <Route path="registration" element={<AdminRegistration />} />
        </Route>
        <Route path="customer">
          <Route path="registration" index element={<CustomerRegistration />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ApolloProvider>
  );
};

export default App;
