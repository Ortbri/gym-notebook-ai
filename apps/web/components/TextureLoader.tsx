// import { useEffect, useState } from 'react';

// export default function TextureLoader() {
//   // State to track if we're in the browser
//   const [isBrowser, setIsBrowser] = useState(false);
  
//   useEffect(() => {
//     // Mark that we're now in the browser
//     setIsBrowser(true);
    
//     // Create a small version of the texture on demand
//     const image = new Image();
//     image.src = '/textures/paipa.jpg'; // Original large texture
    
//     image.onload = () => {
//       try {
//         // Create a canvas to resize the image
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');
        
//         // Set dimensions to 1/4 the original size
//         canvas.width = image.width / 4;
//         canvas.height = image.height / 4;
        
//         // Draw the image at the smaller size
//         ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        
//         // Convert to data URL (smaller file size)
//         const smallImageUrl = canvas.toDataURL('image/jpeg', 0.5); // 50% quality
        
//         // Apply as background to all elements with .paipa-texture class
//         const elements = document.querySelectorAll('.paipa-texture');
//         elements.forEach(el => {
//           if (el instanceof HTMLElement) {
//             el.style.backgroundImage = `url(${smallImageUrl})`;
//           }
//         });
        
//         // Add loaded class to enable the texture
//         document.body.classList.add('loaded');
//       } catch (e) {
//         console.error('Error creating optimized texture:', e);
//         // Fallback - just add the loaded class to use the original texture
//         document.body.classList.add('loaded');
//       }
//     };
    
//     // If image fails to load, still add the loaded class
//     image.onerror = () => {
//       document.body.classList.add('loaded');
//     };
    
//     return () => {
//       // Cleanup
//       image.onload = null;
//       image.onerror = null;
//     };
//   }, []);
  
//   if (!isBrowser) return null;
  
//   return <div className="paipa-texture" />;
// } 