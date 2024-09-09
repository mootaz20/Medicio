import { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import './GallerySlider.css';

const photo = [
  { id: 1, img: 'assets/img/gallery/gallery-1.jpg' },
  { id: 2, img: 'assets/img/gallery/gallery-2.jpg' },
  { id: 3, img: 'assets/img/gallery/gallery-3.jpg' },
  { id: 4, img: 'assets/img/gallery/gallery-4.jpg' },
  { id: 5, img: 'assets/img/gallery/gallery-5.jpg' },
  { id: 6, img: 'assets/img/gallery/gallery-6.jpg' },
  { id: 7, img: 'assets/img/gallery/gallery-7.jpg' },
  { id: 8, img: 'assets/img/gallery/gallery-8.jpg' },
];

const GallerySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages,setVisibleImages] = useState(5); 
  const [sliderWidth,setSliderWidth] = useState(208 * visibleImages + 74);
  const ulRef = useRef(null);
  const totalImages = photo.length;

  const getCircularIndex = (index) => {
    return (index + totalImages) % totalImages;
  };

  const getVisiblePhotos = () => {
    const halfVisible = Math.floor(visibleImages / 2);
    if (currentIndex === totalImages - 1) {
      return photo.slice(-visibleImages);
    }
    return [...Array(totalImages)].map((_, i) => {
      const photoIndex = getCircularIndex(currentIndex - halfVisible + i);
      return photo[photoIndex];
    });
  };


  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

 
  
  useEffect(() => {
    const updateSliderDimensions = () => {
      const width = window.innerWidth;
      let newVisibleImages;
      let newSliderWidth;
    
      if (width < 576) {
        newVisibleImages = 1;
        newSliderWidth = 220;
      } else if (width >= 576 && width < 768) {
        newVisibleImages = 3;
        newSliderWidth = 440;
      } else if (width >= 768 && width < 992) {
        newVisibleImages = 3;
        newSliderWidth = 670;
      } else if (width >= 992 && width < 1200) {
        newVisibleImages = 5;
        newSliderWidth = 890;
      } else {
        newVisibleImages = 5;
        newSliderWidth = 1110;
      }
    
      setVisibleImages(newVisibleImages);
      setSliderWidth(newSliderWidth);
    };

    updateSliderDimensions();
    window.addEventListener('resize', updateSliderDimensions);
    return () => window.removeEventListener('resize', updateSliderDimensions);
  }, []);

  useEffect(() => {
    if (ulRef.current) {
      const imageWidth = 224; 
      const halfVisible = Math.floor(visibleImages / 2);
      let offset;
  
      if (currentIndex < halfVisible) {
        offset = 0;
      } else if (currentIndex >= totalImages - halfVisible) {
        offset = (currentIndex - halfVisible);
      } else {
        offset = (currentIndex - halfVisible) * imageWidth;
      }
  
      ulRef.current.style.transform = `translateX(-${Math.max(0, offset)}px)`;
    }
  }, [currentIndex, visibleImages, totalImages]);
  
  
  
  
  


  return (
    <>
      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="gallerySlider mx-auto" style={{ width: `${sliderWidth}px`, overflow: 'hidden' }}>
            <ul
        
              className="list-unstyled position-relative d-flex gap-3"
              style={{ width: `${224 * totalImages}px` }} 
            >
              {getVisiblePhotos().map((p, index) => (
                <li ref={ulRef} key={index} className={`${index === Math.floor(visibleImages / 2) ? 'active1' : ''}`}>
                  <img src={p.img} alt={p.id} width="208px" height="155px" />
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>

      <Row className="mt-3 justify-content-center">
        <Col xs="auto">
          <div className="custom-indicators">
            <ul className="list-inline text-center">
              {photo.map((_, index) => (
                <li
                  key={index}
                  className={`list-inline-item ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => handleIndicatorClick(index)}
                >
                  <span className={`${index === currentIndex ? 'bg-color' : ''} indicator-circle rounded-circle`}></span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default GallerySlider;


// const GallerySlider = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [visibleImages, setVisibleImages] = useState(5);
//   const [sliderWidth,setSliderWidth] = useState(208 * visibleImages + 74); 
//   const ulRef = useRef(null);
//   const totalImages = photo.length;

//   const handleIndicatorClick = (index) => {
//     setIsTransitioning(true);
//     setCurrentIndex(index);
//   };

//   const handleTransitionEnd = () => {
//     setIsTransitioning(false);

//     if (currentIndex === totalImages) {
//       setCurrentIndex(0);
//       ulRef.current.style.transition = 'none';
//       ulRef.current.style.transform = `translateX(0px)`;
//     } else if (currentIndex === -1) {
//       setCurrentIndex(totalImages - 1);
//       ulRef.current.style.transition = 'none';
//       ulRef.current.style.transform = `translateX(-${(totalImages - 1) * 208}px)`;
//     }
//   };

//   useEffect(() => {
//     if (!isTransitioning) {
//       ulRef.current.style.transition = 'transform 0.5s ease-in-out';
//     }

//     ulRef.current.style.transform = `translateX(-${currentIndex * 224}px)`;
//   }, [currentIndex]);

  
  //   useEffect(() => {
  //   const updateSliderDimensions = () => {
  //     const width = window.innerWidth;
  //     let newVisibleImages;
  //     let newSliderWidth;
    
  //     if (width < 576) {
  //       newVisibleImages = 1;
  //       newSliderWidth = 228;
  //     } else if (width >= 576 && width < 768) {
  //       newVisibleImages = 3;
  //       newSliderWidth = 440;
  //     } else if (width >= 768 && width < 992) {
  //       newVisibleImages = 3;
  //       newSliderWidth = 670;
  //     } else if (width >= 992 && width < 1200) {
  //       newVisibleImages = 5;
  //       newSliderWidth = 890;
  //     } else {
  //       newVisibleImages = 5;
  //       newSliderWidth = 1110;
  //     }
    
  //     setVisibleImages(newVisibleImages);
  //     setSliderWidth(newSliderWidth);
  //   };
    
  //   updateSliderDimensions();
  //   window.addEventListener('resize', updateSliderDimensions);
  //   return () => window.removeEventListener('resize', updateSliderDimensions);
  // }, []);

//   return (
//       <>
//       <Row className="justify-content-center">
//         <Col xs={12}>
//           <div className="gallerySlider mx-auto" style={{ width: `${sliderWidth}px`, overflow: 'hidden' }}>
//             <ul
//               ref={ulRef}
//               className="list-unstyled position-relative d-flex gap-3"
//               onTransitionEnd={handleTransitionEnd}
//             >
//               {photo.map((p, index) => (
//                 <li key={index} className={`${index === currentIndex ? 'active2' : ''}`}>
//                   <img src={p.img} alt={p.id} width="208px" height="155px" />
//                 </li>
//               ))}
//               {photo.map((p, index) => (
//                 <li key={`${index}-duplicate`}>
//                   <img src={p.img} alt={p.id} width="208px" height="155px" />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </Col>
//       </Row>

//       <Row className="mt-3 justify-content-center">
//         <Col xs="auto">
//           <div className="custom-indicators">
//             <ul className="list-inline text-center">
//               {photo.map((_, index) => (
//                 <li
//                   key={index}
//                   className={`list-inline-item ${index === currentIndex ? 'active' : ''}`}
//                   onClick={() => handleIndicatorClick(index)}
//                 >
//                   <span className={`${index === currentIndex ? 'bg-color' : ''} indicator-circle rounded-circle`}></span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </Col>
//       </Row>
//       </>
//   );
// };

// export default GallerySlider;