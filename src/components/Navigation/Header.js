import React, { useState } from 'react';
import { IonIcon } from '@ionic/react'; 
import {Button,Modal} from 'react-bootstrap';
// import  from 'react-bootstrap/Modal';
import Login from '../../Login.js';


// React functional component for the Header
const Header = () => {
  // State for toggling the navigation
  const [isNavOpen, setNavOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // Function to handle opening the modal
  const openModal = () => {
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <>
    <header className="header" data-header>
      <div className="container">

        <a href="#" className="logo">
          <img src="./static/images/logo.svg" width="162" height="50" alt="EduWeb logo" />
        </a>

        <nav className={`navbar ${isNavOpen ? 'active' : ''}`} data-navbar>
          <div className="wrapper">
            <a href="#" className="logo">
              <img src="./static/images/logo.svg" width="162" height="50" alt="EduWeb logo" />
            </a>

            <button className="nav-close-btn" aria-label="close menu" data-nav-toggler onClick={toggleNav}>
              <IonIcon name="close-outline" aria-hidden="true"></IonIcon>
            </button>
          </div>

          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="#home" className="navbar-link" data-nav-link>Home</a>
            </li>
            <li className="navbar-item">
              <a href="#about" className="navbar-link" data-nav-link>About</a>
            </li>
            <li className="navbar-item">
              <a href="#courses" className="navbar-link" data-nav-link>Courses</a>
            </li>
            <li className="navbar-item">
              <a href="#blog" className="navbar-link" data-nav-link>Blog</a>
            </li>
            <li className="navbar-item">
              <a href="#" className="navbar-link" data-nav-link>Contact</a>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <button className="header-action-btn" aria-label="toggle search" title="Search">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg> */}
          <div className='d-flex'>
            <div>
              <img src="./static/images/Avatar.svg" width="50" height="50"/>
            </div>
            <div>
                <button  aria-label="cart" title="Cart" onClick={openModal}>

                  login/register 
              </button>
            </div>
            
          </div>
          </button>

          <button className="header-action-btn" aria-label="cart" title="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -30 600 600" width="35" height="35" fill="currentColor" >
            <path d="M24 0C10.7 0 0 10.7 0 24S10.7 48 24 48l45.5 0c3.8 0 7.1 2.7 7.9 6.5l51.6 271c6.5 34 36.2 58.5 70.7 58.5L488 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-288.3 0c-11.5 0-21.4-8.2-23.6-19.5L170.7 288l288.5 0c32.6 0 61.1-21.8 69.5-53.3l41-152.3C576.6 57 557.4 32 531.1 32L360 32l0 102.1 23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-64 64c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23L312 32 120.1 32C111 12.8 91.6 0 69.5 0L24 0zM176 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm336-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"/>
          </svg>
            <span className="btn-badge">0</span>
          </button>

          {/* <a href="#" className="btn has-before">
            <span className="span">Try for free</span>
            <IonIcon name="arrow-forward-outline" aria-hidden="true"></IonIcon>
          </a> */}

          <button className="header-action-btn" aria-label="open menu" data-nav-toggler onClick={toggleNav}>
            <IonIcon name="menu-outline" aria-hidden="true"></IonIcon>
          </button>
        </div>

        {/* Overlay for the mobile navigation */}
        {isNavOpen && <div className="overlay" data-nav-toggler data-overlay onClick={toggleNav}></div>}

      </div>
      {/* <Login show={showLogin}/> */}
    </header>
    <Login isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Header;
