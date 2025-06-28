import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Robust Image component with error handling, loading states, and accessibility features
 * Resolves image loading errors with fallback mechanisms and retry capabilities
 */
const Image = ({ 
  src, 
  alt = '', 
  className = '', 
  fallbackSrc = null,
  placeholder = true,
  lazy = true,
  onLoad = null,
  onError = null,
  retryCount = 2,
  ...props 
}) => {
  const [imageState, setImageState] = useState('loading');
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const imgRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!src) {
      setImageState('error');
      return;
    }

    setImageState('loading');
    setCurrentSrc(src);
    setRetryAttempts(0);
  }, [src]);

  const handleLoad = (e) => {
    if (!mountedRef.current) return;
    
    setImageState('loaded');
    if (onLoad) {
      onLoad(e);
    }
  };

  const handleError = (e) => {
    if (!mountedRef.current) return;

    console.warn(`Image failed to load: ${currentSrc}`);
    
    // Try fallback image first
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    // Retry with original source if we have attempts left
    if (retryAttempts < retryCount && currentSrc === src) {
      setTimeout(() => {
        if (mountedRef.current) {
          setRetryAttempts(prev => prev + 1);
          setCurrentSrc(`${src}?retry=${retryAttempts + 1}`);
        }
      }, 1000 * (retryAttempts + 1)); // Progressive delay
      return;
    }

    // All attempts failed
    setImageState('error');
    if (onError) {
      onError(e);
    }
  };

  const baseClasses = `block ${className}`;

  // Loading placeholder
  if (imageState === 'loading' && placeholder) {
    return (
      <motion.div 
        className={`${baseClasses} bg-gray-200 animate-pulse flex items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        {...props}
      >
        <div className="text-gray-400 text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2 bg-gray-300 rounded animate-pulse"></div>
          <div className="text-sm">Loading...</div>
        </div>
      </motion.div>
    );
  }

  // Error state
  if (imageState === 'error') {
    return (
      <motion.div 
        className={`${baseClasses} bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        {...props}
      >
        <div className="text-gray-500 text-center p-4">
          <div className="w-8 h-8 mx-auto mb-2">
            <svg 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              className="w-full h-full"
            >
              <path 
                fillRule="evenodd" 
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <div className="text-sm">Image not available</div>
        </div>
      </motion.div>
    );
  }

  // Successfully loaded image
  return (
    <motion.img
      ref={imgRef}
      src={currentSrc}
      alt={alt}
      className={baseClasses}
      onLoad={handleLoad}
      onError={handleError}
      loading={lazy ? 'lazy' : 'eager'}
      initial={{ opacity: 0 }}
      animate={{ opacity: imageState === 'loaded' ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    />
  );
};

export default Image;