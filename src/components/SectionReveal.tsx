import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const sectionRevealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 45, 
    scale: 0.985 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const itemCascadeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 28 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

export const SectionReveal: React.FC<SectionRevealProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  id 
}) => {
  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -40px 0px' }}
      variants={{
        hidden: { 
          opacity: 0, 
          y: 42, 
          scale: 0.985 
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            delay: delay,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string; stagger?: number }> = ({
  children,
  className = '',
  stagger = 0.08
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.04
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const RevealCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  return (
    <motion.div
      variants={itemCascadeVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
