import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, Map, Users, LogOut, CloudRain, Car, Recycle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NavButton from "@/components/NavButton";
import useDarkMode from '@/hooks/use_dark_mode';
import { Sun, Moon } from "lucide-react";

const ROUTE_CONFIG = {
  "/flood_page": "flood_page",
  "/traffic": "traffic",
  "/smart_waste_management_page": "smart_waste_management_page",
  "/homepage": "home",
  "/homepage#policy": "features",
  "/homepage#feedback": "transportation",
  "/homepage#profile": "profile",
};

const NAV_ITEMS = [
  { path: "/homepage", icon: Home, section: "home", label: "Home" },
  { path: "/homepage#policy", icon: FileText, section: "features", label: "Features" },
  { path: "/homepage#feedback", icon: Map, section: "transportation", label: "Transportation" },
  { path: "/homepage#profile", icon: Users, section: "profile", label: "Profile" },
  { path: "/flood_page", icon: CloudRain, section: "flood_page", label: "Flood Monitoring" },
  { path: "/traffic", icon: Car, section: "traffic", label: "Traffic" },
  { path: "/smart_waste_management_page", icon: Recycle, section: "smart_waste_management_page", label: "Waste Management" },
];

export default function Sidebar() {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    }, []);
    
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSection, setActiveSection] = useState("home");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const section = ROUTE_CONFIG[location.pathname + location.hash] || 
                   ROUTE_CONFIG[location.pathname] || 
                   "home";
    setActiveSection(section);
  }, [location]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      navigate("/");
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }, 800);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  const getIconClass = (section) => 
    `w-6 h-6 ${activeSection === section ? 
      "text-blue-600 dark:text-blue-400" : 
      "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`;
    useEffect(() => {
        const path = location.pathname;
        if (path === "/flood_page") {
            setActiveSection("flood_page");
        } else if (path === "/traffic") {
            setActiveSection("traffic");
        } else if (path === "/smart_waste_management_page") {
            setActiveSection("smart_waste_management_page");
        } else if (path === "/homepage") {
            setActiveSection("home");
        } else if (path === "/homepage#policy") {
            setActiveSection("features");
        } else if (path === "/homepage#feedback") {
            setActiveSection("transportation");
        } else if (path === "/homepage#profile") {
            setActiveSection("profile");
        }
    }, [location.pathname]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem("isAuthenticated");
            navigate("/");
        }
    };

    const toggleDarkMode = () => {
        document.documentElement.classList.add("transition-colors");
        document.documentElement.classList.add("duration-300");
        
        document.documentElement.classList.toggle("dark");
        setIsDarkMode((prevMode) => !prevMode);
        
        setTimeout(() => {
            document.documentElement.classList.remove("transition-colors");
            document.documentElement.classList.remove("duration-300");
        }, 300);
    };

  return (
    <>
    
      <nav className={`w-20 ${isDarkMode ? "bg-gray-800":"bg-white"} transition-all duration-300 shadow-md flex flex-col items-center py-4 fixed min-h-screen z-30`}>
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.path}
            icon={<item.icon className={getIconClass(item.section)} />}
            onClick={() => {
              navigate(item.path);
              setActiveSection(item.section);
            }}
            isActive={activeSection === item.section}
            aria-label={item.label}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          />
        ))}

            <div className="mt-auto flex flex-col items-center">
                <NavButton
                    icon={
                        isDarkMode ? (
                            <Moon className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                        ) : (
                            <Sun className="w-6 h-6 text-yellow-400 hover:text-yellow-500 transition-colors duration-200" />
                        )
                    }
                    onClick={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mb-4"
                />

                <NavButton
                    icon={<LogOut className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600" />}
                    onClick={handleLogoutClick}
                    aria-label="Logout"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                />
            </div>
      </nav>

      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={handleCancelLogout}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Modal Header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />

              {/* Modal Body */}
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 mb-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                    <LogOut className="w-8 h-8 text-red-500 dark:text-red-400" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to leave?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Are you sure you want to sign out? You'll need to log in again to access your account.
                  </p>

                  <div className="flex w-full gap-3">
                    <button
                      onClick={handleCancelLogout}
                      disabled={isLoggingOut}
                      className="flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                        border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                        hover:bg-gray-50 dark:hover:bg-gray-700/50 disabled:opacity-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmLogout}
                      disabled={isLoggingOut}
                      className="flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all duration-200
                        bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600
                        shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isLoggingOut ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging out...
                        </>
                      ) : (
                        <>
                          <LogOut className="w-4 h-4" />
                          Logout
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
    return (
        <nav className={`w-20 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-md flex flex-col items-center py-4 fixed min-h-screen z-20 transition-colors duration-300`}>
            <NavButton
                icon={<Home className={`w-6 h-6 ${activeSection === "home" ? "text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/homepage");
                    setActiveSection("home");
                }}
                isActive={activeSection === "home"}
                aria-label="Home"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <NavButton
                icon={<FileText className={`w-6 h-6 ${activeSection === "features" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/homepage#policy");
                    setActiveSection("features");
                }}
                isActive={activeSection === "features"}
                aria-label="Features"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <NavButton
                icon={<Map className={`w-6 h-6 ${activeSection === "transportation" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/homepage#feedback");
                    setActiveSection("transportation");
                }}
                isActive={activeSection === "transportation"}
                aria-label="Transportation"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <NavButton
                icon={<Users className={`w-6 h-6 ${activeSection === "profile" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/homepage#profile");
                    setActiveSection("profile");
                }}
                isActive={activeSection === "profile"}
                aria-label="Profile"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <NavButton
                icon={<CloudRain className={`w-6 h-6 ${activeSection === "flood_page" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/flood_page");
                    setActiveSection("flood_page");
                }}
                isActive={activeSection === "flood_page"}
                aria-label="flood_page"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <NavButton
                icon={<Car className={`w-6 h-6 ${activeSection === "traffic" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/traffic");
                    setActiveSection("traffic");
                }}
                isActive={activeSection === "traffic"}
                aria-label="traffic"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <NavButton
                icon={<Recycle className={`w-6 h-6 ${activeSection === "smart_waste_management_page" ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-black"}`} />}
                onClick={() => {
                    navigate("/smart_waste_management_page");
                    setActiveSection("smart_waste_management_page");
                }}
                isActive={activeSection === "smart_waste_management_page"}
                aria-label="smart_waste_management_page"
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            />

            <div className="mt-auto flex flex-col items-center">
                <NavButton
                    icon={
                        isDarkMode ? (
                            <Moon className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                        ) : (
                            <Sun className="w-6 h-6 text-yellow-400 hover:text-yellow-500 transition-colors duration-200" />
                        )
                    }
                    onClick={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 mb-4"
                />

                <NavButton
                    icon={<LogOut className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-600 transition-colors duration-200" />}
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                />
            </div>
        </nav>
    );
}