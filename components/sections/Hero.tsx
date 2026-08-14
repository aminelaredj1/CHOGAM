"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { GoldButton } from "@/components/ui/GoldButton";

export function Hero() {
  const { t, dir } = useI18n();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const bottleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Mouse-tracking 3D tilt with HIGHER sensitivity (increased angles from 8 to 22)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [22, -22]), {
    stiffness: 120, // Increased for ultra-responsiveness
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-22, 22]), {
    stiffness: 120, // Increased for ultra-responsiveness
    damping: 15,
  });
 
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
 
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
    },
  };
 
  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-chogam-midnight via-chogam-charcoal to-chogam-midnight select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      dir={dir}
    >
      {/* Radial spotlight */}
      <div className="absolute inset-0 radial-spotlight" />
 
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
 
      {/* Floating gold particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-chogam-gold/30"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
 
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center min-h-screen pt-28 pb-12 lg:py-0">
          {/* Text Column */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-start gap-4 md:gap-6 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: textY }}
          >
            {/* Eyebrow */}
            <motion.p className="eyebrow-text" variants={itemVariants}>
              {t("hero.eyebrow")}
            </motion.p>
 
            {/* Gold divider line */}
            <motion.div
              className="w-12 h-px bg-chogam-gold hidden lg:block"
              variants={itemVariants}
            />
 
            {/* Main Title */}
            <motion.h1
              className="heading-display text-4xl sm:text-6xl lg:text-8xl text-chogam-white leading-tight lg:leading-none"
              variants={itemVariants}
            >
              <span className="text-gold-gradient">{t("hero.title")}</span>
            </motion.h1>
 
            {/* Subtitle */}
            <motion.p
              className="font-sans text-sm md:text-lg text-chogam-goldSoft/70 max-w-md leading-relaxed px-4 lg:px-0"
              variants={itemVariants}
            >
              {t("hero.subtitle")}
            </motion.p>
 
            {/* Product tag */}
            <motion.div
              className="flex items-center gap-3 border border-chogam-gold/20 px-4 py-2"
              variants={itemVariants}
            >
              <span className="font-sans text-[10px] sm:text-xs text-chogam-goldSoft/50 tracking-widest uppercase">
                Eau de Parfum Pour Homme
              </span>
              <span className="w-px h-4 bg-chogam-gold/30" />
              <span className="font-serif text-xs sm:text-sm text-chogam-gold">100ml</span>
            </motion.div>
 
            {/* CTAs */}
            <motion.div className="flex justify-center lg:justify-start gap-3 w-full" variants={itemVariants}>
              <GoldButton variant="solid" size="md" href="/collection">
                {t("hero.cta")}
              </GoldButton>
              <GoldButton variant="outline" size="md" href="/product/chogam">
                Chogam
              </GoldButton>
            </motion.div>
 
            {/* Trust micro-signals */}
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-5 pt-2 px-2"
              variants={itemVariants}
            >
              {["Livraison gratuite", "Paiement à la livraison", "Authenticité"].map((tag) => (
                <div key={tag} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-chogam-gold" />
                  <span className="font-sans text-[10px] sm:text-xs text-chogam-goldSoft/50 tracking-wide">
                    {tag}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
 
          {/* Bottle Column — 3D parallax with Seamless Backdrop Fusion */}
          <motion.div
            className="relative flex items-center justify-center order-1 lg:order-2 h-[40vh] sm:h-[50vh] lg:h-full mt-4 lg:mt-0"
            style={{ y: bottleY, scale: bottleScale, opacity }}
          >
            <motion.div
              className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-[420px] lg:h-[480px] flex items-center justify-center"
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1200px",
              }}
            >
              {/* Dynamic Radial Ambient Light behind the bottle (Seamless backdrop fusion) */}
              <div 
                className="absolute w-[80%] h-[80%] rounded-full bg-radial-gradient from-chogam-gold/15 via-chogam-gold/3 to-transparent blur-3xl pointer-events-none"
                style={{
                  transform: "translateZ(-80px) scale(1.1)",
                }}
              />
 
              {/* Advanced 3D Realistic Soft Drop Shadow — Moves dynamically opposite to tilt */}
              <motion.div 
                className="absolute w-[60%] h-[15%] rounded-full bg-black/75 blur-2xl pointer-events-none bottom-4"
                style={{
                  transform: "translateZ(-100px) rotateX(85deg)",
                  opacity: 0.85,
                }}
              />
 
              {/* Bottle image Container with high-tech 3D layers and luxury tactile press spring effect */}
              <motion.div
                className="relative w-full h-full cursor-pointer select-none"
                style={{
                  transform: "translateZ(50px)",
                  transformStyle: "preserve-3d",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92, rotateZ: -1 }} // Interactive luxury press feedback
                transition={{ type: "spring", stiffness: 350, damping: 15 }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <Image
                  src="/products/bravento/bravento-hero-marble.png"
                  alt="شوجام — او دو بارفان بور أوم"
                  fill
                  className="object-contain filter contrast-[1.05] brightness-[1.02] mix-blend-lighten"
                  priority
                  sizes="(max-width: 768px) 80vw, 45vw"
                />
              </motion.div>>
              </motion.div>

              {/* Floating luxury glass badge detailing price */}
              <motion.div
                className="absolute -end-6 top-1/3 glass border border-chogam-gold/25 px-4 py-2.5 hidden lg:block backdrop-blur-md rounded-lg shadow-xl"
                style={{
                  transform: "translateZ(90px)",
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-sans text-[10px] text-chogam-goldSoft/60 tracking-widest uppercase">CHOGAM</p>
                <p className="font-serif text-sm text-chogam-gold font-bold mt-0.5">3 500 DZD</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 start-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
      >
        <span className="eyebrow-text text-chogam-goldSoft/40">
          {t("hero.scrollHint")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-chogam-gold/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}
