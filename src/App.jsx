import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import Content from "./components/Content";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // 👈 mobile ke liye better

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white flex h-[100dvh] overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      <div className="flex-1 flex flex-col">
        
        {/* Navbar */}
        <Nav 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />

        {/* Content */}
        <Content sidebarOpen={sidebarOpen} />
      </div>
      
    </div>
  );
};

export default App;