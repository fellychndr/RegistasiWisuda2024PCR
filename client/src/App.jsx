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
  OrangTua,
  TambahMahasiswa,
  EditMahasiswa,
  Admin,
  Display
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";

import { action as deleteMahasiswaAction } from "./pages/DeleteMahasiswa";
import { action as addMahasiswaAction } from "./pages/TambahMahasiswa";
import { action as editMahasiswaAction } from "./pages/EditMahasiswa";
// import { action as registeredMahasiswaAction } from "./pages/Scan";

import { loader as berandaLoader } from "./pages/Beranda";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as allMahasiswaLoader } from "./pages/Mahasiswa";
import { loader as editMahasiswa } from "./pages/EditMahasiswa";
import { loader as adminLoader } from "./pages/Admin";


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
            loader: berandaLoader,
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
            element: <OrangTua />,
          },
          {
            path: "scan",
            element: <Scan />,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
