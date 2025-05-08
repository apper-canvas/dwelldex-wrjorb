import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const AddPropertyForm = ({ onClose, onAddProperty }) => {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    type: 'house',
    status: 'for-sale',
    price: '',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    yearBuilt: new Date().getFullYear(),
    image: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    }
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define icon components
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const MapPinIcon = getIcon('MapPin');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Bath');
  const RulerIcon = getIcon('Ruler');
  const DollarSignIcon = getIcon('DollarSign');
  const CalendarIcon = getIcon('Calendar');
  const FileImageIcon = getIcon('FileImage');
  const TagIcon = getIcon('Tag');
  const XIcon = getIcon('X');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProperty({
        ...property,
        [parent]: {
          ...property[parent],
          [child]: value
        }
      });
    } else {
      setProperty({ ...property, [name]: value });
    }
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validate = () => {
    const errors = {};
    
    if (!property.title.trim()) errors.title = 'Title is required';
    if (!property.description.trim()) errors.description = 'Description is required';
    if (!property.price) errors.price = 'Price is required';
    if (isNaN(property.price) || Number(property.price) <= 0) errors.price = 'Price must be a positive number';
    if (!property.area) errors.area = 'Area is required';
    if (isNaN(property.area) || Number(property.area) <= 0) errors.area = 'Area must be a positive number';
    if (!property.address.street.trim()) errors['address.street'] = 'Street address is required';
    if (!property.address.city.trim()) errors['address.city'] = 'City is required';
    if (!property.address.state.trim()) errors['address.state'] = 'State is required';
    if (!property.address.zipCode.trim()) errors['address.zipCode'] = 'Zip code is required';
    if (!property.image.trim()) errors.image = 'Image URL is required';
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare the new property object
      const newProperty = {
        ...property,
        id: Date.now(), // Generate a unique ID (in a real app, this would come from the backend)
        price: Number(property.price),
        area: Number(property.area),
        bedrooms: Number(property.bedrooms),
        bathrooms: Number(property.bathrooms),
        yearBuilt: Number(property.yearBuilt)
      };
      
      // In a real application, you would make an API call here
      // Simulate API call with timeout
      setTimeout(() => {
        onAddProperty(newProperty);
        toast.success('Property added successfully!');
        onClose();
        setIsSubmitting(false);
      }, 800);
    } catch (error) {
      toast.error('Failed to add property. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="bg-white dark:bg-surface-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex justify-between items-center p-5 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HomeIcon className="h-5 w-5 text-primary" />
            <span>Add New Property</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            aria-label="Close"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(90vh-9rem)] p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Details Section */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <HomeIcon className="h-5 w-5 text-primary" />
                  <span>Property Details</span>
                </h3>
                
                <div>
                  <label htmlFor="title" className="label">Property Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={property.title}
                    onChange={handleChange}
                    placeholder="e.g., Modern Apartment with City View"
                    className={`input ${formErrors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                  />
                  {formErrors.title && <p className="mt-1 text-red-500 text-sm">{formErrors.title}</p>}
                </div>
                
                <div>
                  <label htmlFor="description" className="label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={property.description}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe the property..."
                    className={`input ${formErrors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                  ></textarea>
                  {formErrors.description && <p className="mt-1 text-red-500 text-sm">{formErrors.description}</p>}
                </div>
              </div>
              
              {/* Property Type and Status */}
              <div>
                <label htmlFor="type" className="label flex items-center gap-1.5">
                  <BuildingIcon className="h-4 w-4" />
                  <span>Property Type</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={property.type}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="status" className="label flex items-center gap-1.5">
                  <TagIcon className="h-4 w-4" />
                  <span>Property Status</span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={property.status}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="for-sale">For Sale</option>
                  <option value="for-rent">For Rent</option>
                </select>
              </div>
              
              {/* Price and Details */}
              <div>
                <label htmlFor="price" className="label flex items-center gap-1.5">
                  <DollarSignIcon className="h-4 w-4" />
                  <span>Price {property.status === 'for-rent' ? '(per month)' : ''}</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={property.price}
                  onChange={handleChange}
                  placeholder="e.g., 250000"
                  className={`input ${formErrors.price ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {formErrors.price && <p className="mt-1 text-red-500 text-sm">{formErrors.price}</p>}
              </div>
              
              <div>
                <label htmlFor="bedrooms" className="label flex items-center gap-1.5">
                  <BedDoubleIcon className="h-4 w-4" />
                  <span>Bedrooms</span>
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={property.bedrooms}
                  onChange={handleChange}
                  className="input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="bathrooms" className="label flex items-center gap-1.5">
                  <BathIcon className="h-4 w-4" />
                  <span>Bathrooms</span>
                </label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={property.bathrooms}
                  onChange={handleChange}
                  className="input"
                >
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="area" className="label flex items-center gap-1.5">
                  <RulerIcon className="h-4 w-4" />
                  <span>Area (sq ft)</span>
                </label>
                <input
                  type="number"
                  id="area"
                  name="area"
                  value={property.area}
                  onChange={handleChange}
                  placeholder="e.g., 1500"
                  className={`input ${formErrors.area ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {formErrors.area && <p className="mt-1 text-red-500 text-sm">{formErrors.area}</p>}
              </div>
              
              <div>
                <label htmlFor="yearBuilt" className="label flex items-center gap-1.5">
                  <CalendarIcon className="h-4 w-4" />
                  <span>Year Built</span>
                </label>
                <select
                  id="yearBuilt"
                  name="yearBuilt"
                  value={property.yearBuilt}
                  onChange={handleChange}
                  className="input"
                >
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              {/* Address Information */}
              <div className="md:col-span-2">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                  <span>Property Location</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address.street" className="label">Street Address</label>
                    <input
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={property.address.street}
                      onChange={handleChange}
                      placeholder="e.g., 123 Main St"
                      className={`input ${formErrors['address.street'] ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {formErrors['address.street'] && <p className="mt-1 text-red-500 text-sm">{formErrors['address.street']}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address.city" className="label">City</label>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={property.address.city}
                      onChange={handleChange}
                      placeholder="e.g., San Francisco"
                      className={`input ${formErrors['address.city'] ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {formErrors['address.city'] && <p className="mt-1 text-red-500 text-sm">{formErrors['address.city']}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address.state" className="label">State</label>
                    <input
                      type="text"
                      id="address.state"
                      name="address.state"
                      value={property.address.state}
                      onChange={handleChange}
                      placeholder="e.g., CA"
                      className={`input ${formErrors['address.state'] ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {formErrors['address.state'] && <p className="mt-1 text-red-500 text-sm">{formErrors['address.state']}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="address.zipCode" className="label">Zip Code</label>
                    <input
                      type="text"
                      id="address.zipCode"
                      name="address.zipCode"
                      value={property.address.zipCode}
                      onChange={handleChange}
                      placeholder="e.g., 94105"
                      className={`input ${formErrors['address.zipCode'] ? 'border-red-500 dark:border-red-500' : ''}`}
                    />
                    {formErrors['address.zipCode'] && <p className="mt-1 text-red-500 text-sm">{formErrors['address.zipCode']}</p>}
                  </div>
                </div>
              </div>
              
              {/* Image URL */}
              <div className="md:col-span-2">
                <label htmlFor="image" className="label flex items-center gap-1.5">
                  <FileImageIcon className="h-4 w-4" />
                  <span>Image URL</span>
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={property.image}
                  onChange={handleChange}
                  placeholder="e.g., https://images.unsplash.com/photo-1523217582562-09d0def993a6"
                  className={`input ${formErrors.image ? 'border-red-500 dark:border-red-500' : ''}`}
                />
                {formErrors.image && <p className="mt-1 text-red-500 text-sm">{formErrors.image}</p>}
                <p className="mt-1 text-surface-500 dark:text-surface-400 text-sm">
                  Enter a valid image URL. For testing, you can use images from Unsplash, Pixabay, or Burst.
                </p>
              </div>
            </div>
          </form>
        </div>
        
        <div className="p-4 border-t border-surface-200 dark:border-surface-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-outline"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <span>Add Property</span>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPropertyForm;