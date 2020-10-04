import Head from 'next/head'
import React from 'react';
import Navigation from '../components/navigation'
import Card from '../components/card'
import HeaderImage from '../components/header-image'
import styles from './css/stjarnor.module.css'
import gql from 'graphql-tag';
import Query  from '../components/query';
import RichText  from '../components/rich-text';


export default function Home() {

  const query = gql`
  {
    stjarnor {
      header
      header_image{
        url
      }
      image2{
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
      {({ data: { stjarnor: {header, header_image,image2, text_on_header_image, page_content}, navigation: {links} }}) => {

          console.log(header_image);

        return (
            <div>
            <Navigation elements={links}/>
           <main className={styles.wrapper}>
             
             <div className={styles.img}>
               <img src={header_image.url}/>
               <img src={image2.url}/>             
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


            