"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BarChart2,
  ShoppingBag,
  DollarSign,
  Briefcase,
  BookOpen,
  Layers,
  Calendar,
  Grid,
  Settings,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

type MenuItem = {
  id: string;
  icon: LucideIcon;
  label: string;
};

type SubMenuItem = {
  text: string;
  icon: LucideIcon;
  href: string;
};

type SecondaryMenus = Record<string, SubMenuItem[]>;

export default function DynamicSidebar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { id: "dashboard", icon: BarChart2, label: "Dashboard" },
    { id: "users", icon: Users, label: "Users" },
    { id: "sales", icon: DollarSign, label: "Sales" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "education", icon: BookOpen, label: "Education" },
    { id: "resources", icon: Layers, label: "Resources" },
    { id: "meetings", icon: Calendar, label: "Meetings" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const secondaryMenus: SecondaryMenus = {
    dashboard: [
      { text: "Overview", icon: BarChart2, href: "/dashboard" },
      { text: "Analytics", icon: BarChart2, href: "/dashboard/analytics" },
      { text: "Reports", icon: BarChart2, href: "/dashboard/reports" },
    ],
    users: [
      { text: "All Users", icon: Users, href: "/users" },
      { text: "Create New", icon: Users, href: "/users/create" },
      { text: "Teams", icon: Users, href: "/users/teams" },
    ],
    sales: [
      { text: "Revenue", icon: DollarSign, href: "/sales/revenue" },
      { text: "Transactions", icon: DollarSign, href: "/sales/transactions" },
      { text: "Products", icon: DollarSign, href: "/sales/products" },
    ],
    orders: [
      { text: "Recent Orders", icon: ShoppingBag, href: "/orders" },
      { text: "Processing", icon: ShoppingBag, href: "/orders/processing" },
      { text: "Shipped", icon: ShoppingBag, href: "/orders/shipped" },
    ],
    projects: [
      { text: "Active Projects", icon: Briefcase, href: "/projects" },
      { text: "Create Project", icon: Briefcase, href: "/projects/create" },
      { text: "Archive", icon: Briefcase, href: "/projects/archive" },
    ],
    education: [
      { text: "Courses", icon: BookOpen, href: "/education/courses" },
      { text: "Tutorials", icon: BookOpen, href: "/education/tutorials" },
      { text: "Resources", icon: BookOpen, href: "/education/resources" },
    ],
    resources: [
      { text: "Templates", icon: Layers, href: "/resources/templates" },
      { text: "Assets", icon: Layers, href: "/resources/assets" },
      { text: "Library", icon: Layers, href: "/resources/library" },
    ],
    meetings: [
      { text: "Schedule", icon: Calendar, href: "/meetings/schedule" },
      { text: "Upcoming", icon: Calendar, href: "/meetings/upcoming" },
      { text: "Past", icon: Calendar, href: "/meetings/past" },
    ],
    settings: [
      { text: "Profile", icon: Settings, href: "/settings/profile" },
      { text: "Security", icon: Settings, href: "/settings/security" },
      { text: "Preferences", icon: Settings, href: "/settings/preferences" },
    ],
  };

  const handleMenuClick = (id: string) => {
    setActiveMenu((prev) => (prev === id ? null : id));
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        secondaryRef.current &&
        !secondaryRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Primary Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: -200 }}
            animate={{ x: 0 }}
            exit={{ x: -200 }}
            transition={{ type: "tween" }}
            className="w-16 dark:bg-gray-900 bg-gray-200 text-white border-r border-gray-400 dark:border-gray-800 items-center flex flex-col items-centermd:relative py-4 z-50 h-screen"
          >
            <div className="mb-8">
              <Link
                href="/"
                className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center"
              >
                <Grid size={18} />
              </Link>
            </div>

            <div className="flex flex-col gap-6 items-center">
              {menuItems.map((item) => (
                <div key={item.id} className="relative">
                  <motion.button
                    className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${
                      activeMenu === item.id
                        ? "bg-blue-600"
                        : "hover:bg-gray-300 dark:hover:bg-gray-800"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMenuClick(item.id)}
                    onMouseEnter={() => setActiveTooltip(item.id)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <span className="text-gray-800 dark:text-white">
                      <item.icon className="w-4 h-4" />
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {activeTooltip === item.id && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute left-14 top-1 bg-gray-700 text-white text-sm py-1 px-2 rounded whitespace-nowrap z-50"
                      >
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2">
                          <div className="w-0 h-0 border-y-4 border-y-transparent border-r-4 border-r-gray-700"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secondary Menu Overlay */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key={activeMenu}
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -220, opacity: 0 }}
            transition={{ type: "tween" }}
            ref={secondaryRef}
            className="fixed left-16 w-64 h-full bg-gray-300 dark:bg-gray-800  z-40 shadow-xl"
          >
            <div className="p-4">
              <h3 className="text-xl font-medium mb-4 dark:text-gray-200 text-gray-800">
                {menuItems.find((item) => item.id === activeMenu)?.label}
              </h3>
              <div className="space-y-2">
                {secondaryMenus[activeMenu].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-900 hover:text-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white duration-300"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
