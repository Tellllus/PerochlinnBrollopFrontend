import Head from 'next/head'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import Navigation from '../components/navigation'
import Card from '../components/card'
import styles from './css/osa.module.css'
import gql from 'graphql-tag';
import Query  from '../components/query';

export default function OSA() {

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

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
        console.log(process.env);
        console.log(process.env.API_URL);
        console.log(process.env.MAPS_API_KEY);
        console.log(process.env.EMAILJS_TOKEN);
        console.log(process.env.EMAILJS_OSA_TEMPLATE_ID);
        console.log(process.env.EMAILJS_USER_ID);
        sendEmail(data);
    }
    const sendEmail = data => {
        
    emailjs.send("default_service", "osa", data, process.env.EMAILJS_USER_ID)
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
    }

  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500;600;700&display=swap" rel="stylesheet"/>
        <title>Bröllop</title>
      </Head>
    
    <Query query={query} id={null}>
    {({ data: { navigation: {links} }}) => {
        return (
        <div>
            <Navigation elements={links}/>
        <main className={styles.wrapper}>
            
        <Card className={styles.card}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Förnamn" name="first_name" ref={register({required: true})} />

            <input type="text" placeholder="Efternamn" name="last_name" ref={register({required: true})} />

            <input type="text" placeholder="Epost" name="email" ref={register({required: true})} />
            
            <br/>

            <input type="radio" id="grill_ja" name="grill" value="Ja" ref={register({required: true})}/>
            <label for="grill_ja">Ja</label><br/>
            <input type="radio" id="grill_nej" name="grill" value="Nej"/>
            <label for="grill_nej">Nej</label><br/>
            
            <input type="radio" id="the_day_ja" name="the_day" value="Ja" ref={register({required: true})}/>
            <label for="the_day_ja">Ja</label><br/>
            <input type="radio" id="the_day_nej" name="the_day" value="Nej"/>
            <label for="the_day_nej">Nej</label><br/>

            <input type="radio" id="food_pref_ja" name="food_pref" value="Ja" ref={register({required: true})}/>
            <label for="food_pref_ja">Ja</label><br/>
            <input type="radio" id="food_pref_nej" name="food_pref" value="Nej"/>
            <label for="food_pref_nej">Nej</label><br/>


            <textarea name="food_pref_text" rows="4" cols="50"></textarea>
            
            <textarea name="message" rows="4" cols="50"></textarea>
            
            {/*<label>Meddelande</label>
            <textarea name="message"></textarea>*/}

            <input type="submit" value="Send"/>
        </form>
        </Card>
        </main>
        </div>    
    );
    }}
    </Query>
    </div> 
  );
}       