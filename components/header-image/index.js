import React from 'react';
import styles from './styles.module.css'



class HeaderImage extends React.Component {
  
  constructor(){
    super()
    this.state = {
    };
  }

  render() {
    return (
     <div className={styles.div + " " + this.props.className }> 
         <img src={this.props.url}/> 
         <p>{this.props.text}</p>
     </div>
    )
  }
}
export default HeaderImage