import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import SmallImage from '../components/small-image'
import styles from './css/brollopsdagen.module.css'
import gql from 'graphql-tag';
import Query  from '../components/query';
import RichText  from '../components/rich-text';
import InfoBox from '../components/info-box';

export default function Home() {

  const query = gql`
  {
    brollopsdagen {
      header
      church_image{
        url
      }
      villa_image{
        url
      }
      car_image{
        url
      }
      clothes_image{
        url
      }
      kids_image{
        url
      }
      photo_image{
        url
      }
      hashtag_image{
        url
      }
      church_header
      church_text
      villa_header
      villa_text
      car_header
      car_text
      clothes_header
      clothes_text
      kids_header
      kids_text
      photo_header
      photo_text
      hashtag_header
    }
    navigation {
      links{
        ... on ComponentNavigationNavigationElement {
        link_text
        link_url
      	}
      }
    }
  }
`
  return (
   
  
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"/>
        <title>Bröllop</title>
      </Head>

      <Query query={query} id={null}>
      {({ data: {brollopsdagen: {header, church_image, villa_image, car_image, clothes_image, kids_image, photo_image, church_header, church_text, villa_header, villa_text,
      car_header, car_text, clothes_header, clothes_text, kids_header, kids_text, photo_header, photo_text, hashtag_header}, navigation: {links} }}) => {
        return (
          <div>
             <Navigation elements={links}/>
            <main className={styles.wrapper}>
              
            <Card className={styles.card}>
                <h1>
                  {header}
                </h1>
              
              <div className={styles.row}>
              <InfoBox className={styles.left} url={process.env.API_URL + church_image.url} header ={church_header} text={church_text}/>
              <InfoBox className={styles.right} url={process.env.API_URL + villa_image.url} header ={villa_header} text={villa_text}/>
              </div>
              <div className={styles.row}>
              <InfoBox  className={styles.left} url={process.env.API_URL + car_image.url} header ={car_header} text={car_text}/>
              <InfoBox className={styles.right} url={process.env.API_URL + clothes_image.url} header ={clothes_header} text={clothes_text}/>
              </div>
              <div className={styles.row}>
              <InfoBox  className={styles.left} url={process.env.API_URL + kids_image.url} header ={kids_header} text={kids_text}/>
              <InfoBox className={styles.right} url={process.env.API_URL + clothes_image.url} header ={clothes_header} text={clothes_text}/>
              </div>
              
              </Card>
            </main>
          </div>
          
        );
      }}
      </Query>
    
    </div> 
  )
}       