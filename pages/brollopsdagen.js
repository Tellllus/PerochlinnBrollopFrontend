import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import SmallImage from '../components/small-image'
import styles from './css/brollopsdagen.module.css'
import gql from 'graphql-tag';
import Query from '../components/query';
import RichText from '../components/rich-text';
import InfoBoxComponent from '../components/info-box';

export default function Home() {

  const query = gql`
  {
    brollop {
     data {
      attributes {
        header
        header_text
        hashtag_img {data {attributes {url}}}
        hashtag_text
        hashtag_header
        InfoBox {
          header
          image {
            data {
              attributes {
                url
              }
            }
          }
          text
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
        {({
          data: {
            brollop: {
              data: {
                attributes: {
                  header,
                  header_text,
                  InfoBox,
                  hashtag_img,
                  hashtag_header,
                  hashtag_text
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

                <Card className={styles.card}>
                  <h1>
                    {header}
                  </h1>

                  <p>{header_text}</p>

                  <div className={styles.infoboxes}>
                    {chunk(InfoBox, 2).map((element) => {
                      console.log(element)
                      let first = element[0]
                      let second = element[1]
                      return (
                        <div className={styles.row}>
                          <InfoBoxComponent className={styles.left} url={process.env.API_URL + first.image.data.attributes.url} header={first.header} text={first.text} />
                          {second ? <InfoBoxComponent className={styles.right} url={process.env.API_URL + second.image.data.attributes.url} header={second.header} text={second.text} /> : ""}

                        </div>
                      )
                    })}
                  </div>

                  <div className={styles.hashtag}>
                    <img src={process.env.API_URL + hashtag_img.data.attributes.url} />
                    <h3>{hashtag_header}</h3>
                    <RichText>{hashtag_text}</RichText>
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