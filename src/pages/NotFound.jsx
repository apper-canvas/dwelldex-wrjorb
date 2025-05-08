import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  // Define icon components
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
        className="relative w-24 h-24 mb-6"
      >
        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <AlertTriangleIcon className="h-12 w-12 text-red-500 dark:text-red-400" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full animate-ping bg-red-100 dark:bg-red-900/30 rounded-full opacity-75"></div>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400"
      >
        404
      </motion.h1>
      
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl font-semibold mb-3 text-surface-800 dark:text-surface-100"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-surface-600 dark:text-surface-400 max-w-md mb-8"
      >
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <HomeIcon className="mr-2 h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}