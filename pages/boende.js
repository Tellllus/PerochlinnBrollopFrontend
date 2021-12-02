import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import HeaderImage from '../components/header-image'
import styles from './css/boende.module.css'
import gql from 'graphql-tag';
import Query from '../components/query';
import RichText from '../components/rich-text';

export default function Home() {

  const query = gql`{
   
      boende{
           data {
           attributes {
             header
             header_image {
              data {
                attributes {
                  url
                }
              }
            }
            text_on_header_image
            page_content
           }
          }
     }
     navigation{
      data {
       attributes {
         navigation_element {
           link_url
           link_text
         }
       }
     }
    }
    }`;

  const a = "https://www.google.com/maps/embed/v1/place?key=" + process.env.MAPS_API_KEY + "&q=Stenungsbaden+Yacht+Club";
  return (


    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>Bröllop</title>
      </Head>

      <Query query={query} id={null}>
        {({
          data: {
            boende: {
              data: {
                attributes: {
                  header,
                  header_image: {
                    data: { attributes: { url } }
                  },
                  text_on_header_image,
                  page_content
                }
              }
            },
            navigation: { data: { attributes: { navigation_element } } }
          }
        }) => {
          return (
            <div>
              <Navigation elements={navigation_element} />
              <main className={styles.wrapper}>

                <div className={styles.img}>
                  <HeaderImage className={styles.headerImage} url={process.env.API_URL + url} text={text_on_header_image} />
                </div>

                <Card className={styles.card}>
                  <h1>
                    {header}
                  </h1>
                  <RichText >{page_content}</RichText>

                  <iframe src={a} className={styles.map} />

                </Card>
              </main>
            </div>

          );
        }}
      </Query>

    </div>
  )
}