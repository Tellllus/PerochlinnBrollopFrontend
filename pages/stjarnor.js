import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import HeaderImage from '../components/header-image'
import styles from './css/stjarnor.module.css'
import gql from 'graphql-tag';
import Query from '../components/query';
import RichText from '../components/rich-text';


export default function Home() {

  const query = gql`{
    stjarnor {
      data {
        attributes {
          header
          page_content
          header_images {
            data{
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`

  /*
  navigation {
    links{
      ... on ComponentNavigationNavigationElement {
      link_text
      link_url
      }
    }
  }
}
`*/
  return (


    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700&display=swap" rel="stylesheet" />
        <title>Bröllop</title>
      </Head>

      <Query query={query} id={null}>
        {({ data: { stjarnor: { data: { attributes: { header, header_images, page_content } } } } }) => {

          return (
            <div>
              {/* <Navigation elements={links}/>*/}
              <main className={styles.wrapper}>

                <div className={styles.imageContainer}>
                  {
                    header_images.data.map(image => (
                      <img src={process.env.API_URL + image.attributes.url} />
                    ))
                  }
                </div>

                <Card className={styles.card}>
                  <h1>
                    {header}
                  </h1>
                  <RichText >{page_content}</RichText>
                </Card>
              </main>
            </div>

          );
        }}
      </Query>

    </div>
  )
}


