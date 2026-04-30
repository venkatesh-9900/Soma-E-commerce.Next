"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative inline-block" style={{ marginBottom: '8px' }}>
      
      {/* HEART BUTTON */}
      <motion.button
        onClick={() => setLiked(!liked)}
        whileTap={{ scale: 1.3 }}
        whileHover={{ scale: 1.1 }}
        className="favorite-btn"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        <motion.div
          animate={{
            scale: liked ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            style={{
              width: '20px',
              height: '20px',
              transition: 'color 0.3s, fill 0.3s',
              color: liked ? '#ef4444' : 'inherit',
              fill: liked ? '#ef4444' : 'transparent',
            }}
            className={liked ? "" : "text-gray-700 dark:text-white"}
          />
        </motion.div>
      </motion.button>

      {/* CELEBRATION PARTICLES */}
      {liked && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {[...Array(6)].map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const distance = 25;
            return (
              <motion.span
                key={i}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#f87171',
                  borderRadius: '50%'
                }}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1,
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )
          })}
        </motion.div>
      )}

    </div>
  );
}
