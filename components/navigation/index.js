import React from 'react';
import { useEffect, useState, useRef } from "react"
import styles from './styles.module.css'
import Link from 'next/link'



class Navigation extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      scrollingLock: false
    };
    // example how to bind object in React ES6
    this.handleScroll = this.handleScroll.bind(this)
  }

componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

handleScroll() {

  let lockPoint = 50;
  if (window.scrollY > lockPoint && !this.state.scrollingLock ){
    this.setState({
      scrollingLock: true
    });
  } else if (window.scrollY < lockPoint && this.state.scrollingLock) {
    this.setState({
      scrollingLock: false
    });
  }

}
  render() {
    return (
      <div>
        <nav className={[styles.nav, this.state.scrollingLock ? styles.sticky : ""].join(" ")} >
         <ul className={styles.ul}>
            {this.props.elements.map(element => (
                <li className={styles.li}>
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


