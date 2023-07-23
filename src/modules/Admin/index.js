import React from "react";
import { ColorModeContext, useMode } from "./../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import TopBar from "./Global/TopBar";
import SideBar from "./Global/SideBar";
import DashBoard from "./DashBoard";
import Category from "./Category";
import Contacts from "./Contacts";
import Invoices from "./Invoices";
import Form from "./Form";
import Calendar from "./Calendar";
import FAQ from "./FAQ";
import Bar from "./Bar";
import Pie from "./Pie";
import Line from "./Line";

const AdminView = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content h-[auto]" style={{ overflowX: "hidden"}}>
            <TopBar />
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/category" element={<Category />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/barchart" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AdminView;
