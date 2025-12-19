import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/layout/pages/LoginPages";
import { lazy, Suspense } from "react";
import { RegisterPage } from "./auth/layout/pages/RegisterPages";
import { PrivateRoute } from "./auth/components/PrivateRoute";
import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "./fake/fake-data";

const ChatLayout = lazy(() => import("./chat/layout/ChatLayout"));
const ChatPage = lazy(() => import("./chat/pages/ChatPage"));
const NoChatSelectedPage = lazy(
  () => import("./chat/pages/NoChatSelectedPage")
);

export const AppRouter = () => {

const {data: user , isLoading , isError , error} = useQuery({
  queryKey: ['user'],
  queryFn: () => {


    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    return checkAuth(token);

  },
  retry: 0
})


if (isLoading) {
  return <div>Loading...</div>;
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route
          path="/chat"
          element={
            <Suspense fallback={<div>cargando ...</div>}>
              <PrivateRoute isAuthenticated={!!user}>
                <ChatLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<NoChatSelectedPage />} />
          <Route path="/chat/:clientId" element={<ChatPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
};
