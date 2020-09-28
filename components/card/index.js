import React from 'react';
import styles from './styles.module.css'



class Card extends React.Component {
  
  constructor(){
    super()
    this.state = {
    };
  }

  render() {
    return (
     <div style={{height: this.props.height || "auto"}} className={styles.div + " " + this.props.className}>{this.props.children}</div>
    )
  }
}
export default Card


