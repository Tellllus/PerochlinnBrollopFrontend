import React from 'react';
import { useEffect, useState, useRef } from "react"
import styles from './styles.module.css'
import Link from 'next/link'



class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollingLock: true,
      mobileMenu: false
    };
    // example how to bind object in React ES6
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    let lockPoint = 0;
    if (window.scrollY > lockPoint && !this.state.scrollingLock) {
      this.setState({
        scrollingLock: true
      });
    } else if (window.scrollY < lockPoint && this.state.scrollingLock) {
      this.setState({
        scrollingLock: false
      });
    }
  }

  toggleHamburger() {
    this.setState({
      mobileMenu: !this.state.mobileMenu
    });
  }

  render() {
    return (
      <div>

        <div className={[styles.hamburger, this.state.mobileMenu ? styles.hamburgerActive : ""].join(" ")} onClick={this.toggleHamburger}>
          <span className={styles.hamburgerIcon} />
        </div>

        <nav className={[styles.nav, this.state.scrollingLock ? styles.sticky : "", this.state.mobileMenu ? styles.active : ""].join(" ")} >
          <ul className={styles.ul}>
            {this.props.elements.map(element => (
              <li className={styles.li} key={element.link_text}>
                <Link href={element.link_url}>
                  <a className={styles.a}>{element.link_text}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.spacer}>
        </div>
      </div>

    )
  }
}
export default Navigation


