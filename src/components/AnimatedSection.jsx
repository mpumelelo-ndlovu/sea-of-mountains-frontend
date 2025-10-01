import React from 'react';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, className, style }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  return (
    <section ref={ref} className={`${className} transition-all duration-1000 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={style}>
      {children}
    </section>
  );
};

export default AnimatedSection;
