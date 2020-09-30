import React from 'react';
import styles from './styles.module.css'
import RichText  from '../rich-text';



class InfoBox extends React.Component {
  
  constructor(){
    super()
    this.state = {
    };
  }

  render() {
    return (
     <div className={styles.div + " " + this.props.className }> 
         <img src={this.props.url}/> 
         <h3>{this.props.header}</h3>
         <RichText>{this.props.text}</RichText>
     </div>
    )
  }
}
export default InfoBox