
import { useEffect, useState, useRef } from 'react';

export default function CursorEffects() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  // Create trailing dots for cursor trail
  const numTrails = 20;
  
  useEffect(() => {
    // Initialize the trails ref array
    trailsRef.current = Array(numTrails).fill(null).map((_, i) => {
      const div = document.createElement('div');
      div.className = 'fixed w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent opacity-0 pointer-events-none z-50 transition-all';
      document.body.appendChild(div);
      return div;
    });

    // Cleanup function to remove all trail elements
    return () => {
      trailsRef.current.forEach(trail => {
        if (trail && document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
    };
  }, []);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trails with a delay
      trailsRef.current.forEach((trail, index) => {
        if (!trail) return;
        
        setTimeout(() => {
          const fadeOpacity = 1 - (index / numTrails);
          const scale = 1 - (index / numTrails) * 0.6;
          
          trail.style.opacity = fadeOpacity.toString();
          trail.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px) scale(${scale})`;
        }, index * 20);
      });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Add button hover effect 
    const handleLinkHoverEvents = () => {
      const allLinks = document.querySelectorAll('a, button');
      
      allLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          if ((link as HTMLElement).tagName === 'BUTTON') {
            setButtonHovered(true);
          } else {
            setLinkHovered(true);
          }
        });
        
        link.addEventListener('mouseleave', () => {
          setButtonHovered(false);
          setLinkHovered(false);
        });
      });
    };

    // Add magnetic effect to buttons
    const addMagneticEffect = () => {
      const buttons = document.querySelectorAll('button');
      
      buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          
          if (distance < 50) {
            const maxTranslate = 5;
            const translateX = (x - centerX) / centerX * maxTranslate;
            const translateY = (y - centerY) / centerY * maxTranslate;
            
            button.style.transform = `translate(${translateX}px, ${translateY}px)`;
          }
        });
        
        button.addEventListener('mouseleave', () => {
          button.style.transform = 'translate(0, 0)';
        });
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    addMagneticEffect();

    // Re-attach link hover events when DOM changes
    const observer = new MutationObserver(() => {
      handleLinkHoverEvents();
      addMagneticEffect();
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
    });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  const styles = {
    cursor: {
      left: `${position.x}px`,
      top: `${position.y}px`,
      opacity: hidden ? 0 : 1,
      width: clicked ? '24px' : linkHovered ? '32px' : buttonHovered ? '64px' : '24px',
      height: clicked ? '24px' : linkHovered ? '32px' : buttonHovered ? '64px' : '24px',
      backgroundColor: clicked ? 'rgba(79, 70, 229, 0.4)' : 'rgba(79, 70, 229, 0.15)',
      border: clicked ? '2px solid rgba(79, 70, 229, 0.8)' : '1px solid rgba(79, 70, 229, 0.8)',
    },
    cursorTrail: {
      left: `${position.x}px`,
      top: `${position.y}px`,
      opacity: hidden ? 0 : 0.75
    }
  };

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none z-[999] mix-blend-difference transition-all duration-200 backdrop-blur-sm"
        style={styles.cursor}
      />
      <div 
        ref={cursorTrailRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[998] transform -translate-x-1/2 -translate-y-1/2"
        style={styles.cursorTrail}
      />
      <style jsx global>{`
        * {
          cursor: none;
        }
      `}</style>
    </>
  );
}
