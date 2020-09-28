import React from 'react';
import styles from './styles.module.css'
import ReactDOM from 'react-dom';
import Countdown from "react-countdown";

class Countdown1 extends React.Component {
  
  constructor(){
    super()
    this.state = {
    };
  }

renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      
      return (
          <div> </div>
      );
    } else {
      // Render a countdown
      return (
        
        <span className={styles.counter + " " + this.props.className}>
          {days} {hours < 10 ? "0"+hours : hours}:{ minutes < 10 ? "0"+minutes : minutes}:{seconds < 10 ? "0"+seconds : seconds}
          <br/>
          <div className={styles.labels}>
            <span lassName={styles.counter}>Dagar</span> <span>Timmar</span> <span>Minuter</span> <span>Sekunder</span>
          </div>
          
        </span>
        
      );
    }
  };

  render() {
    return (
     <div>
          <Countdown date={this.props.date} renderer={this.renderer} />
     </div>
    )
  }
}
export default Countdown1


