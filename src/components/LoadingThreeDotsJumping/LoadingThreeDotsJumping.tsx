'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import './LoadingThreeDotsJumping.css';
import { useEffect, useState } from 'react';

function LoadingThreeDotsJumping() {
  const [isLight, setIsLight] = useState(false);

  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    const body = document.body;
    setIsLight(body.classList.contains('light-theme'));
    const observe = new MutationObserver(() => {
      setIsLight(body.classList.contains('light-theme'));
    });
    observe.observe(body, { attributes: true, attributeFilter: ['class'] });
    return () => observe.disconnect();
  }, []);

  return (
    <motion.div
      className="container-dots"
      animate="jump"
      transition={{ staggerChildren: 0.2 }}
    >
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="dot"
          variants={dotVariants}
          style={{ backgroundColor: isLight ? '#171857' : '' }}
        />
      ))}
    </motion.div>
  );
}

export default LoadingThreeDotsJumping;
