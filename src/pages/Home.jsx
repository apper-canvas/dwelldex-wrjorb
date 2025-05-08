import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

export default function Home() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  
  // Define icon components
  const GridIcon = getIcon('LayoutGrid');
  const MapIcon = getIcon('Map');
  const HomeIcon = getIcon('Home');
  const InfoIcon = getIcon('Info');
  const CompassIcon = getIcon('Compass');
  const SearchIcon = getIcon('Search');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20
      }
    }
  };

  const toggleView = (mode) => {
    setViewMode(mode);
    toast.info(`Switched to ${mode} view`, {
      icon: mode === 'grid' ? <GridIcon className="h-5 w-5" /> : <MapIcon className="h-5 w-5" />,
    });
  };

  return (
    <div className="space-y-6">
      <section className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white p-6 md:p-10"
        >
          <div className="absolute inset-0 bg-black opacity-30 z-0"></div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Find Your Perfect Property with DwellDex
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">
              Browse thousands of listings, connect with agents, and find your dream home - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                className="btn bg-white text-primary hover:bg-surface-100 focus:ring-white flex items-center justify-center"
                onClick={() => toast.success("Feature will be available soon!")}
              >
                <SearchIcon className="mr-2 h-5 w-5" />
                <span>Start Searching</span>
              </button>
              <button 
                className="btn bg-transparent border-2 border-white hover:bg-white/10 focus:ring-white flex items-center justify-center"
                onClick={() => toast.info("You'll be able to list your property soon!")}
              >
                <HomeIcon className="mr-2 h-5 w-5" />
                <span>List Your Property</span>
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100">Featured Properties</h2>
        
        <div className="flex items-center space-x-2 bg-surface-100 dark:bg-surface-800 p-1 rounded-lg">
          <button
            className={`p-2 rounded-md flex items-center justify-center transition-colors ${
              viewMode === 'grid'
                ? 'bg-white dark:bg-surface-700 shadow-sm'
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
            onClick={() => toggleView('grid')}
            aria-label="Grid view"
          >
            <GridIcon className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-md flex items-center justify-center transition-colors ${
              viewMode === 'map'
                ? 'bg-white dark:bg-surface-700 shadow-sm'
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
            }`}
            onClick={() => toggleView('map')}
            aria-label="Map view"
          >
            <MapIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MainFeature viewMode={viewMode} />
      
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
            <CompassIcon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Extensive Property Network</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Access thousands of listings across the country, with new properties added daily.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary">
            <SearchIcon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Advanced Search Tools</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Filter properties by location, price, amenities, and more to find your perfect match.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-accent/10 dark:bg-accent/20 text-accent">
            <InfoIcon className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Detailed Information</h3>
          <p className="text-surface-600 dark:text-surface-400">
            View comprehensive property details, high-quality photos, and floor plans.
          </p>
        </motion.div>
      </motion.section>
    </div>
  );
}