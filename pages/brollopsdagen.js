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
      infobox{
        ... on ComponentBrollopBrollopInfoBox {
          header
          image{
            url
          }
          text
        }
      }
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

 const chunk = (array, size) => {
  return array.reduce((chunks, item, i) => {
    if (i % size === 0) {
      chunks.push([item]);
    } else {  
      chunks[chunks.length - 1].push(item);
    }
    return chunks;
  }, []);
}
  return (
   
  
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet"/>
        <title>Bröllop</title>
      </Head>

      <Query query={query} id={null}>
      {({ data: {brollopsdagen: {header, infobox}, navigation: {links} }}) => {
        
        {
          console.log(chunk(infobox,2))
        }
        return (
          <div>
             <Navigation elements={links}/>
            <main className={styles.wrapper}>
              
            <Card className={styles.card}>
                <h1>
                  {header}
                </h1>

                <div className={styles.infoboxes}>
                  {chunk(infobox,2).map( (element) => {
                      let first = element[0]
                      let second = element[1]
                      return(
                        <div className={styles.row}>
                          <InfoBox className={styles.left} url={process.env.API_URL + first.image.url} header ={first.header} text={first.text}/> 
                          {second ? <InfoBox className={styles.right} url={process.env.API_URL + second.image.url} header ={second.header} text={second.text}/> : ""} 
                        </div>
                      ) 
                  })}
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