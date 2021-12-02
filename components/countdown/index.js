import React from 'react';
import styles from './styles.module.css'
import ReactDOM from 'react-dom';
import Countdown from "react-countdown";

class Countdown1 extends React.Component {

  constructor() {
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

        <div className={styles.counter + " " + this.props.className}>
          <span className={styles.counterElement}>
            <span> {days}</span><br />
            <span className={styles.labels}>Dagar</span>
          </span>
          &nbsp;
          <span className={styles.counterElement}>
            <span>  {hours < 10 ? "0" + hours : hours}</span><br />
            <span className={styles.labels}>Timmar</span>
          </span>

          <span className={styles.counterElement}>
            <span>:</span><br />
            <span className={styles.labels}>&nbsp;</span>
          </span>

          <span className={styles.counterElement}>
            <span> {minutes < 10 ? "0" + minutes : minutes}</span><br />
            <span className={styles.labels}>Minuter</span>
          </span>

          <span className={styles.counterElement}>
            <span>:</span><br />
            <span className={styles.labels}>&nbsp;</span>
          </span>

          <span className={styles.counterElement}>
            <span> {seconds < 10 ? "0" + seconds : seconds}</span><br />
            <span className={styles.labels}>Sekunder</span>
          </span>
        </div>

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


