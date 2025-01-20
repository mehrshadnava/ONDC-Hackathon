import React, { useEffect, useRef } from 'react';
import "./header.css";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button, Row } from 'reactstrap';
import logo from '../../assets/images/logo.png';



const nav__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  }
];

  const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const ToggleMenu = () => menuRef.current.classList.toggle('show__menu');


  return (
  <header className="header" ref={headerRef}>
  
      <Row>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">

          {/* ============ logo =========== */}
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="logo-text">KiranaBazaar</span>
          </div>

          {/* ============ logo end =========== */}

          {/* ============ menu start =========== */}
          <div className="navigation" ref={menuRef} onClick={ToggleMenu}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={navClass =>
                        navClass.isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ============ menu end =========== */}
            
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {
                  (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to='/login'>Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to='/selling'>Start selling</Link>
                      </Button>
                    </>
                  )
                }
              </div>

              <span className="mobile__menu" onClick={ToggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
      </Row>

  </header>
  );
};


export default Header