import React, { useState } from 'react';
import HoverDropdown from '../../components/customComponents/HoverDropdown';

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const optionsArray1 = [1, 23, 4, 5];
const optionsArray2 = [{ label: 'Option A', value: 'A' }, { label: 'Option B', value: 'B' }];

const Home = () => {
  const handleOptionSelect = (option) => {
    console.log('Selected option:', option);
  };

  return (
    <section className="section hero has-bg-image w-10 " id="home" aria-label="home" style={{"background-image": "url('./static/images/hero-bg.svg')"}}>
        <div className="container">

          <div className="hero-content">

            <h1 className="h1 section-title">
              The Best Program to <span className="span">Enroll</span> for Exchange
            </h1>

            <p className="hero-text">
              Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.
            </p>

            <a href="#" className="btn has-before">
              <span className="span">Find courses</span>

              <ion-icon name="arrow-forward-outline" aria-hidden="true"></ion-icon>
            </a>

          </div>

          <figure className="hero-banner">

            <div className="img-holder one" style={{"--width": "270", "--height": "300"}}>
              <img src="./static/images/hero-banner-1.jpg" width="270" height="300" alt="hero banner" className="img-cover" />
            </div>

            <div className="img-holder two" style={{width: "240", height: "370"}}>
              <img src="./static/images/hero-banner-2.jpg" width="240" height="370" alt="hero banner" className="img-cover" />  
            </div>

            <img src="./static/images/hero-shape-1.svg" width="380" height="190" alt="" className="shape hero-shape-1" />

            <img src="./static/images/hero-shape-2.png" width="622" height="551" alt="" className="shape hero-shape-2" /> 
          </figure>
        </div>
      </section>

  );
};

export default Home;
