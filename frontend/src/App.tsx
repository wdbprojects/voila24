import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ThemeProvider } from "@/components/comps/theme-provider";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="voila-theme">
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </ThemeProvider>
  );
}

export default App;
