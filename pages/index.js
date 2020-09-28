import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import RichText from '../components/rich-text'
import styles from './css/index.module.css'
import Countdown from '../components/countdown'
import gql from 'graphql-tag';
import Query  from '../components/query';

export default function Home() {

  const query = gql`
  {
    startsida {
      header
      header_image{
        url
      }
      text_on_header_image
      countdown_date
      page_content
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
      {({ data: { startsida: {header, header_image, text_on_header_image, countdown_date, page_content}, navigation: {links}} }) => {
        
        return (
          <div>
            <Navigation elements={links}/>

            <Countdown className={styles.counter} date={new Date(countdown_date)}/>
            <main className={styles.wrapper}>
              
              <div className={styles.img}>
              <img src={process.env.API_URL  + header_image.url}></img>
              {text_on_header_image.split('\n').map((item, i) => (<p key={"header-image-text"+i}>{item}</p>))}
              </div>
          
              <Card className={styles.card}>
                <h1>
                  {header}
                </h1>
                <RichText>
                  {page_content}
                </RichText>
              </Card>
            </main>
          </div>
        );
      }}
      </Query>
    
    </div> 
  )
}       


            