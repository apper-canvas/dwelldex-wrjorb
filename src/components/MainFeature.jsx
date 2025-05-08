import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

export default function MainFeature({ viewMode }) {
  // State for filter and properties
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceRange: 'any',
    bedrooms: 'any',
    status: 'any',
  });
  
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]);
  
  // Define icon components
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const MapPinIcon = getIcon('MapPin');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Bath');
  const RulerIcon = getIcon('Ruler');
  const HeartIcon = getIcon('Heart');
  const HeartFilledIcon = getIcon('HeartHandshake');
  const DollarSignIcon = getIcon('DollarSign');
  const SearchIcon = getIcon('Search');
  const TagIcon = getIcon('Tag');
  const FilterIcon = getIcon('Filter');
  const MapIcon = getIcon('Map');
  const CompassIcon = getIcon('Compass');
  
  // Mock properties data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockProperties = [
        {
          id: 1,
          title: "Modern Apartment with City View",
          description: "Stunning apartment with panoramic city views, modern finishes, and open floor plan",
          type: "apartment",
          status: "for-rent",
          price: 2500,
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          yearBuilt: 2019,
          image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          address: {
            street: "123 Main St",
            city: "San Francisco",
            state: "CA",
            zipCode: "94105",
            country: "USA"
          }
        },
        {
          id: 2,
          title: "Spacious Family Home",
          description: "Beautiful family home with large backyard, updated kitchen, and spacious bedrooms",
          type: "house",
          status: "for-sale",
          price: 750000,
          bedrooms: 4,
          bathrooms: 3,
          area: 2800,
          yearBuilt: 2005,
          image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          address: {
            street: "456 Oak Drive",
            city: "Austin",
            state: "TX",
            zipCode: "73301",
            country: "USA"
          }
        },
        {
          id: 3,
          title: "Luxury Penthouse",
          description: "Exclusive penthouse with private terrace, high-end appliances, and breathtaking views",
          type: "apartment",
          status: "for-sale",
          price: 1200000,
          bedrooms: 3,
          bathrooms: 3.5,
          area: 2200,
          yearBuilt: 2020,
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          address: {
            street: "789 Skyline Blvd",
            city: "Miami",
            state: "FL",
            zipCode: "33101",
            country: "USA"
          }
        },
        {
          id: 4,
          title: "Charming Cottage",
          description: "Cozy cottage with character, updated while maintaining historic charm",
          type: "house",
          status: "for-rent",
          price: 1800,
          bedrooms: 2,
          bathrooms: 1,
          area: 1100,
          yearBuilt: 1935,
          image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          address: {
            street: "321 Maple Lane",
            city: "Portland",
            state: "OR",
            zipCode: "97204",
            country: "USA"
          }
        },
        {
          id: 5,
          title: "Downtown Loft",
          description: "Industrial chic loft in the heart of downtown with exposed brick and high ceilings",
          type: "apartment",
          status: "for-sale",
          price: 550000,
          bedrooms: 1,
          bathrooms: 1.5,
          area: 950,
          yearBuilt: 2008,
          image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          address: {
            street: "555 Urban St",
            city: "Chicago",
            state: "IL",
            zipCode: "60601",
            country: "USA"
          }
        },
        {
          id: 6,
          title: "Mountain Retreat",
          description: "Secluded mountain home with stunning views, perfect for nature lovers",
          type: "house",
          status: "for-rent",
          price: 3200,
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          yearBuilt: 2015,
          image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
          address: {
            street: "123 Pine Road",
            city: "Denver",
            state: "CO",
            zipCode: "80202",
            country: "USA"
          }
        }
      ];
      
      setProperties(mockProperties);
      setFilteredProperties(mockProperties);
      setLoading(false);
    }, 1500);
  }, []);
  
  // Filter properties when filters change
  useEffect(() => {
    if (properties.length === 0) return;
    
    let results = [...properties];
    
    // Filter by location (city)
    if (filters.location) {
      results = results.filter(property => 
        property.address.city.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Filter by property type
    if (filters.type && filters.type !== 'any') {
      results = results.filter(property => property.type === filters.type);
    }
    
    // Filter by price range
    if (filters.priceRange && filters.priceRange !== 'any') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      results = results.filter(property => {
        if (property.status === 'for-rent') {
          return property.price >= min && (max ? property.price <= max : true);
        } else {
          return property.price >= min * 1000 && (max ? property.price <= max * 1000 : true);
        }
      });
    }
    
    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const minBedrooms = parseInt(filters.bedrooms);
      results = results.filter(property => property.bedrooms >= minBedrooms);
    }
    
    // Filter by status
    if (filters.status && filters.status !== 'any') {
      results = results.filter(property => property.status === filters.status);
    }
    
    setFilteredProperties(results);
  }, [filters, properties]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    toast.success("Filters applied successfully!", {
      icon: <FilterIcon className="h-5 w-5" />
    });
  };
  
  const toggleFavorite = (id) => {
    setFavoriteIds(prev => {
      if (prev.includes(id)) {
        toast.info("Removed from favorites", {
          icon: <HeartIcon className="h-5 w-5" />
        });
        return prev.filter(itemId => itemId !== id);
      } else {
        toast.success("Added to favorites", {
          icon: <HeartFilledIcon className="h-5 w-5" />
        });
        return [...prev, id];
      }
    });
  };
  
  const formatPrice = (price, status) => {
    return status === 'for-rent'
      ? `$${price.toLocaleString()}/month`
      : `$${price.toLocaleString()}`;
  };
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card overflow-visible"
      >
        <div className="p-5 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800">
          <div className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Find Your Perfect Property</h3>
          </div>
        </div>
        
        <form onSubmit={handleFilterSubmit} className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label htmlFor="location" className="label">
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="h-4 w-4" />
                  <span>Location</span>
                </div>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Enter city name"
                value={filters.location}
                onChange={handleFilterChange}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="label">
                <div className="flex items-center gap-1.5">
                  <HomeIcon className="h-4 w-4" />
                  <span>Property Type</span>
                </div>
              </label>
              <select
                id="type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="any">Any Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="priceRange" className="label">
                <div className="flex items-center gap-1.5">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Price Range</span>
                </div>
              </label>
              <select
                id="priceRange"
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="any">Any Price</option>
                <option value="0-2000">Up to $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000-">$10,000+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="bedrooms" className="label">
                <div className="flex items-center gap-1.5">
                  <BedDoubleIcon className="h-4 w-4" />
                  <span>Bedrooms</span>
                </div>
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="any">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="label">
                <div className="flex items-center gap-1.5">
                  <TagIcon className="h-4 w-4" />
                  <span>Status</span>
                </div>
              </label>
              <select
                id="status"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="input"
              >
                <option value="any">Any Status</option>
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
              </select>
            </div>
          </div>
          
          <div className="mt-5">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <SearchIcon className="h-5 w-5" />
              <span>Search Properties</span>
            </button>
          </div>
        </form>
      </motion.div>
      
      {/* Properties */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-surface-600 dark:text-surface-400">Loading properties...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <SearchIcon className="h-12 w-12 mx-auto text-surface-400" />
                  <h3 className="mt-4 text-xl font-semibold">No properties found</h3>
                  <p className="mt-2 text-surface-600 dark:text-surface-400">
                    Try adjusting your search filters
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="card group hover:shadow-lg dark:hover:border-primary/50 transition-all duration-300"
                      layout
                    >
                      <div className="relative aspect-property-card overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 z-10">
                          <button
                            onClick={() => toggleFavorite(property.id)}
                            className="p-2 rounded-full bg-white/90 dark:bg-surface-800/90 hover:bg-white dark:hover:bg-surface-800 transition-colors shadow-md"
                            aria-label={favoriteIds.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            {favoriteIds.includes(property.id) ? (
                              <HeartFilledIcon className="h-5 w-5 text-red-500" />
                            ) : (
                              <HeartIcon className="h-5 w-5 text-surface-600 group-hover:text-red-500 transition-colors" />
                            )}
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-opacity-80 text-white capitalize mb-2">
                            {property.status === 'for-rent' ? (
                              <span className="bg-secondary px-2 py-0.5 rounded-md">For Rent</span>
                            ) : (
                              <span className="bg-accent px-2 py-0.5 rounded-md">For Sale</span>
                            )}
                          </div>
                          <h3 className="text-white font-semibold text-lg text-shadow">{property.title}</h3>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex items-center text-surface-500 dark:text-surface-400 mb-3 text-sm">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>
                            {property.address.city}, {property.address.state}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="font-bold text-lg text-primary dark:text-primary-light">
                            {formatPrice(property.price, property.status)}
                          </div>
                        </div>
                        
                        <div className="border-t border-surface-200 dark:border-surface-700 mt-3 pt-3 grid grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-1 text-surface-700 dark:text-surface-300">
                            <BedDoubleIcon className="h-4 w-4 text-surface-500" />
                            <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-surface-700 dark:text-surface-300">
                            <BathIcon className="h-4 w-4 text-surface-500" />
                            <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                          </div>
                          <div className="flex items-center gap-1 text-surface-700 dark:text-surface-300">
                            <RulerIcon className="h-4 w-4 text-surface-500" />
                            <span>{property.area} sqft</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 pt-0">
                        <button 
                          className="w-full btn-outline"
                          onClick={() => toast.info(`Viewing details for ${property.title}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card p-6 flex flex-col items-center justify-center min-h-[400px]"
            >
              <MapIcon className="h-16 w-16 text-primary/30 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
              <p className="text-surface-600 dark:text-surface-400 text-center max-w-md mb-4">
                Our interactive map view allows you to browse properties by location and see details at a glance.
              </p>
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={() => toast.info("Map view will be available in the next update!")}
              >
                <CompassIcon className="h-5 w-5" />
                <span>Explore Nearby</span>
              </button>
              
              {filteredProperties.length > 0 && (
                <div className="mt-8 w-full">
                  <h4 className="font-medium mb-3">Properties in this area:</h4>
                  <div className="space-y-2">
                    {filteredProperties.slice(0, 3).map(property => (
                      <div key={property.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={property.image} 
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h5 className="font-medium text-sm truncate">{property.title}</h5>
                          <div className="text-surface-600 dark:text-surface-400 text-xs flex items-center gap-1">
                            <MapPinIcon className="h-3 w-3" />
                            <span>{property.address.city}, {property.address.state}</span>
                          </div>
                          <div className="text-primary dark:text-primary-light font-semibold text-sm">
                            {formatPrice(property.price, property.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {filteredProperties.length > 0 && (
        <div className="text-center mt-8">
          <button
            className="btn-outline"
            onClick={() => toast.info("More properties will be available soon!")}
          >
            Load More Properties
          </button>
        </div>
      )}
    </div>
  );
}