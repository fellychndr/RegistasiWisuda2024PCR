import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Beranda,
  Error,
  Scan,
  Mahasiswa,
  TambahMahasiswa,
  EditMahasiswa,
  TambahOrangtua,
  OrangTua,
  EditOrangTua,
  Admin,
  Display,
  Settings,
  RequestResetPassword,
  ResetPassword,
  EditSettings,
} from "./pages";

import { action as registerAction } from "./pages/auth/Register";
import { action as loginAction } from "./pages/auth/Login";
import { action as requesetResetPassword } from "./pages/auth/RequestResetPassword";
import { action as resetPassword } from "./pages/auth/ResetPassword";

import { action as addMahasiswaAction } from "./pages/mahasiswa/TambahMahasiswa";
import { action as editMahasiswaAction } from "./pages/mahasiswa/EditMahasiswa";
import { action as deleteMahasiswaAction } from "./pages/DeleteMahasiswa";

// import { action as registeredMahasiswaAction } from "./pages/auth/Scan";

import { action as addOrangTuaAction } from "./pages/orangtua/TambahOrangtua";
import { action as editOrangTuaAction } from "./pages/orangtua/EditOrangTua";

import { action as requesetResetPasswordSetting } from "./pages/settings/UserSettings";

import { action as editSettingsAction } from "./pages/settings/EditSettings";

// loader

import { loader as adminLoader } from "./pages/Admin";
// import { loader as berandaLoader } from "./pages/Beranda";
import { loader as dashboardLoader } from "./pages/DashboardLayout";

import { loader as allMahasiswaLoader } from "./pages/mahasiswa/Mahasiswa";
import { loader as editMahasiswa } from "./pages/mahasiswa/EditMahasiswa";

import { loader as allOrangtuaLoader } from "./pages/orangtua/OrangTua";
import { loader as editOrangTua } from "./pages/orangtua/EditOrangTua";

import { loader as editSettings } from "./pages/settings/EditSettings";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "display",
        element: <Display />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Beranda />,
            // loader: berandaLoader,
          },
          {
            path: "mahasiswa",
            children: [
              {
                index: true,
                element: <Mahasiswa />,
                loader: allMahasiswaLoader,
              },
              {
                path: "registered",
                element: <Mahasiswa />,
                loader: allMahasiswaLoader,
              },
              {
                path: "tambah-mahasiswa",
                element: <TambahMahasiswa />,
                action: addMahasiswaAction,
              },
              {
                path: "edit-mahasiswa/:id",
                element: <EditMahasiswa />,
                loader: editMahasiswa,
                action: editMahasiswaAction,
              },
            ],
          },
          {
            path: "delete-mahasiswa/:id",
            action: deleteMahasiswaAction,
          },
          {
            path: "orangtua",
            children: [
              {
                index: true,
                element: <OrangTua />,
                loader: allOrangtuaLoader,
              },
              {
                path: "tambah-orangtua",
                element: <TambahOrangtua />,
                action: addOrangTuaAction,
              },
              {
                path: "edit-orangtua/:id",
                element: <EditOrangTua />,
                loader: editOrangTua,
                action: editOrangTuaAction,
              },
              {
                path: "registered",
                element: <OrangTua />,
              },
            ],
          },
          {
            path: "scan",
            element: <Scan />,
          },
          {
            path: "admin",
            children: [
              {
                index: true,
                element: <Admin />,
                loader: adminLoader,
              },
              {
                path: "all-users",
                // element: <EditOrangTua />,
                // loader: editOrangTua,
                // action: editOrangTuaAction,
              },
              {
                path: "edit-user/:id",
                // element: <EditOrangTua />,
                // loader: editOrangTua,
                // action: editOrangTuaAction,
              },
            ],
          },
          // {
          //   path: "admin",
          //   element: <Admin />,
          //   loader: adminLoader,
          // },
          {
            path: "settings",
            children: [
              {
                index: true,
                element: <Settings />,
                action: requesetResetPasswordSetting,
              },
              {
                path: "edit-settings/:id",
                element: <EditSettings />,
                loader: editSettings,
                action: editSettingsAction,
              },
            ],
          },
        ],
      },
      {
        path: "request-reset-password",
        element: <RequestResetPassword />,
        action: requesetResetPassword,
      },
      {
        path: "reset/:token",
        element: <ResetPassword />,
        action: resetPassword,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
