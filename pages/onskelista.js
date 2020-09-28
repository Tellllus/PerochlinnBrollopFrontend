import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import HeaderImage from '../components/header-image'
import styles from './css/onskelista.module.css'
import gql from 'graphql-tag';
import Query  from '../components/query';
import RichText  from '../components/rich-text';

export default function Home() {

  const query = gql`
  {
    onskelista {
      header
      header_image{
        url
      }
      text_on_header_image
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
      {({ data: { onskelista: {header, header_image, text_on_header_image, page_content}, navigation: {links} }}) => {
        return (
          <div>
             <Navigation elements={links}/>
            <main className={styles.wrapper}>
              
              <div className={styles.img}>
              <HeaderImage className={styles.headerImage} url={"http://localhost:1337" + header_image.url} text=""/>
              {text_on_header_image.split('\n').map((item, i) => (<p key={"header-image-text"+i}>{item}</p>))}
              </div>
          
              <Card className={styles.card}>
                <h1>
                  {header}
                </h1>
                <RichText>{page_content}</RichText>
              </Card>
            </main>
          </div>
          
        );
      }}
      </Query>
    
    </div> 
  )
}       


            