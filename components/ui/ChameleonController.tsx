"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush } from "lucide-react";

const CHAMELEON_THEMES = [
  { name: "Midnight", color: "#0B1320", text: "Minuit", icon: "🌌" },
  { name: "Gold Royal", color: "#2B210E", text: "Or Royal", icon: "👑" },
  { name: "Emerald", color: "#081C15", text: "Émeraude", icon: "🌲" },
  { name: "Oud Amber", color: "#221108", text: "Ambre", icon: "🔥" },
  { name: "Velvet Charcoal", color: "#0F172A", text: "Charbon", icon: "🖤" }
];

export function ChameleonController() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Midnight");
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    if (window.innerWidth > 1024) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const changeTheme = (themeName: string, color: string) => {
    setActiveTheme(themeName);
    document.documentElement.style.setProperty("--color-midnight", color);
    document.body.style.backgroundColor = color;
  };

  const currentThemeColor = CHAMELEON_THEMES.find(t => t.name === activeTheme)?.color || "#0B1320";

  return (
    <>
      {/* Desktop Luxury Ambient Glow Cursor Tracker */}
      {isDesktop && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${currentThemeColor}18, transparent 40%)`,
          }}
        />
      )}

      <div className="fixed bottom-6 start-6 z-50 flex items-center gap-3">
        {/* Dynamic Theme Options Drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -20 }}
              className="glass p-2.5 rounded-2xl flex items-center gap-2 shadow-2xl backdrop-blur-xl border border-chogam-gold/25"
            >
              {CHAMELEON_THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => changeTheme(theme.name, theme.color)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm border transition-all duration-300 relative ${
                    activeTheme === theme.name 
                      ? "border-chogam-gold scale-110 shadow-lg shadow-chogam-gold/20" 
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: theme.color }}
                  title={theme.text}
                >
                  <span>{theme.icon}</span>
                  {activeTheme === theme.name && (
                    <motion.span 
                      layoutId="activeThemeOutline"
                      className="absolute -inset-1 rounded-full border border-chogam-gold/40"
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-12 h-12 rounded-full bg-[#0B1320]/80 border border-chogam-gold/30 hover:border-chogam-gold flex items-center justify-center text-chogam-gold transition-all duration-300 backdrop-blur-md shadow-2xl"
          aria-label="Changer le thème de couleur"
        >
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Paintbrush size={20} />
          </motion.div>
        </button>
      </div>
    </>
  );
}
