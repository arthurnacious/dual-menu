"use client";
import React, { useState, useEffect, useRef, FC } from "react";
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
  Globe,
} from "lucide-react";
import Link from "next/link";

type MenuItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  href?: string;
  children?: SubMenuItem[];
};

type SubMenuItem = {
  text: string;
  icon: LucideIcon;
  href?: string;
  children?: SubMenuItem[];
};

const SubMenuItems: FC<{ items: SubMenuItem[] }> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => {
        const hasChildren = item.children && item.children.length > 0;
        const [open, setOpen] = useState(false);

        return (
          <div key={index}>
            {hasChildren ? (
              <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-900 hover:text-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white duration-300"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    open ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <Link
                href={item.href || "#"}
                className="w-full flex justify-between items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 text-gray-900 hover:text-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white duration-300"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
              </Link>
            )}

            <AnimatePresence>
              {open && hasChildren && item.children && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="ml-6 mt-1 space-y-1"
                >
                  <SubMenuItems items={item.children} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
};

export default function DynamicSidebar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      icon: BarChart2,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      id: "users",
      icon: Users,
      label: "Users",
      children: [
        { text: "All Users", icon: Users, href: "/users" },
        { text: "Create New", icon: Users, href: "/users/create" },
        { text: "Teams", icon: Users, href: "/users/teams" },
      ],
    },
    { id: "sales", icon: DollarSign, label: "Sales", href: "/sales" },
    { id: "orders", icon: ShoppingBag, label: "Orders", href: "/orders" },
    {
      id: "globallist",
      icon: Globe,
      label: "GlobalList",
      children: [
        { text: "All Debtors", icon: Briefcase, href: "/debtors" },
        { text: "Outstanding", icon: Briefcase, href: "/debtors/outstanding" },
        {
          text: "Something else",
          icon: Briefcase,
          href: "/debtors/somethingelse",
        },
      ],
    },
    { id: "education", icon: BookOpen, label: "Education", href: "/education" },
    { id: "resources", icon: Layers, label: "Resources", href: "/resources" },
    { id: "meetings", icon: Calendar, label: "Meetings", href: "/meetings" },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      children: [
        {
          text: "Profile",
          icon: Settings,
          children: [
            {
              text: "Edit Profile",
              icon: Settings,
              href: "/settings/profile/edit",
            },
            {
              text: "View Profile",
              icon: Settings,
              href: "/settings/profile/view",
            },
          ],
        },
        {
          text: "Security",
          icon: Settings,
          href: "/settings/security",
        },
        {
          text: "Preferences",
          icon: Settings,
          href: "/settings/preferences",
        },
      ],
    },
  ];

  const handleMenuClick = (id: string, hasChildren: boolean, href?: string) => {
    if (hasChildren) {
      setActiveMenu((prev) => (prev === id ? null : id));
    } else if (href) {
      // Handle navigation for items without children
      window.location.href = href;
    }

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
              {menuItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.id} className="relative">
                    {hasChildren ? (
                      <motion.button
                        className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${
                          activeMenu === item.id
                            ? "bg-blue-600"
                            : "hover:bg-gray-300 dark:hover:bg-gray-800"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMenuClick(item.id, true)}
                        onMouseEnter={() => setActiveTooltip(item.id)}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <span className="text-gray-800 dark:text-white">
                          <item.icon className="w-4 h-4" />
                        </span>
                      </motion.button>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activeMenu === item.id
                            ? "bg-blue-600"
                            : "hover:bg-gray-300 dark:hover:bg-gray-800"
                        }`}
                        onMouseEnter={() => setActiveTooltip(item.id)}
                        onMouseLeave={() => setActiveTooltip(null)}
                      >
                        <span className="text-gray-800 dark:text-white">
                          <item.icon className="w-4 h-4" />
                        </span>
                      </Link>
                    )}

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
                );
              })}
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
            className="fixed left-16 w-64 h-full bg-gray-300 dark:bg-gray-800 z-40 shadow-xl"
          >
            <div className="p-4">
              <h3 className="text-xl font-medium mb-4 dark:text-gray-200 text-gray-800">
                {menuItems.find((item) => item.id === activeMenu)?.label}
              </h3>
              <div className="space-y-2">
                {menuItems.find((item) => item.id === activeMenu)?.children && (
                  <SubMenuItems
                    items={
                      menuItems.find((item) => item.id === activeMenu)
                        ?.children || []
                    }
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
