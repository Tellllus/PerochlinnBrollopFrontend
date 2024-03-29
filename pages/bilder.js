import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import HeaderImage from '../components/header-image'
import styles from './css/bilder.module.css'
import gql from 'graphql-tag';
import Query from '../components/query';
import RichText from '../components/rich-text';

export default function Home() {

  const query = gql`
  {
    bilder {
      data {
        attributes {
          header
          page_content
          pictures{  
            data{
              attributes {
                url
              }
            }
          }
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
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet" />
        <title>Bröllop</title>
      </Head>

      <Query query={query} id={null}>
        {({ data: { bilder: { data: { attributes: { header, pictures, page_content } } }, navigation: { data: { attributes: { navigation_element } } } } }) => {
          return (
            <div>
              <Navigation elements={navigation_element} />
              <main className={styles.wrapper}>

                <Card className={styles.card}>
                  <h1>
                    {header}
                  </h1>
                  <RichText >{page_content}</RichText>
                  {console.log(pictures)}

                  {pictures.data.map((element => {
                    return (
                      <div className={styles.row}>
                        <img src={process.env.API_URL + element.attributes.url} />
                      </div>
                    )
                  }))}
                </Card>
              </main>
            </div>

          );
        }}
      </Query>

    </div>
  )
}