// src/components/OptimizedImage.jsx
import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const OptimizedImage = ({ 
    src, 
    alt, 
    className = '', 
    placeholderSrc = null,
    loading = 'lazy',
    sizes = null,
    srcSet = null 
}) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    const [imgSrcSet, setImgSrcSet] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const { elementRef, isVisible } = useIntersectionObserver({
        threshold: 0.01,
        rootMargin: '50px'
    });

    React.useEffect(() => {
        if (isVisible && src !== imgSrc) {
            const img = new Image();
            img.src = src;
            if (srcSet) {
                img.srcset = srcSet;
            }
            
            img.onload = () => {
                setImgSrc(src);
                setImgSrcSet(srcSet);
                setIsLoaded(true);
            };
            
            img.onerror = () => {
                setHasError(true);
            };
        }
    }, [isVisible, src, srcSet, imgSrc]);

    if (hasError) {
        return (
            <div 
                ref={elementRef}
                className={`bg-gray-200 flex items-center justify-center ${className}`}
                role="img"
                aria-label={alt}
            >
                <span className="text-gray-400 text-sm">Failed to load image</span>
            </div>
        );
    }

    return (
        <div ref={elementRef} className="relative">
            <img
                src={imgSrc}
                srcSet={imgSrcSet}
                sizes={sizes}
                alt={alt}
                loading={loading}
                className={`${className} ${!isLoaded ? 'blur-sm' : ''} transition-all duration-300`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
            />
            {!isLoaded && placeholderSrc && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
            )}
        </div>
    );
};

export default OptimizedImage;