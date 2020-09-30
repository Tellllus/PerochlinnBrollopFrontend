import Head from 'next/head'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import emailjs from 'emailjs-com';
import Navigation from '../components/navigation'
import Card from '../components/card'
import styles from './css/osa.module.css'
import gql from 'graphql-tag';
import Query  from '../components/query';
import RichText  from '../components/rich-text';

export default function OSA() {

    const query = gql`
  {
    osa {
      header
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

    const onPrefchange = data => {
      if(data.target.value == "Ja"){
        document.getElementById('food_pref_text').hidden = false;
      }
      else{
        document.getElementById('food_pref_text').hidden = true;
      }
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
    {({ data: { osa: {header, page_content}, navigation: {links}} }) => {
        return (
        <div>
            <Navigation elements={links}/>
        <main className={styles.wrapper}>
            
        <Card className={styles.card}>
        <h1>
          {header}
        </h1>
        <RichText>
          {page_content}
        </RichText>

        <form onSubmit={handleSubmit(onSubmit)}>

        <label className={styles.pure_material_textfield_outlined}>
          <input type="text" placeholder=" "  name="first_name" ref={register({required: true})} />
          <span>Förnamn</span>
        </label>

           
        <label className={styles.pure_material_textfield_outlined}>
            <input type="text" placeholder=" " name="last_name" ref={register({required: true})} />
            <span>Efternamn</span>
        </label>
        <br/>
        <label className={styles.pure_material_textfield_outlined}>
            <input type="text" placeholder=" " name="email" ref={register({required: true})} />
            <span>Epost</span>
        </label>    
        <br/>
          
            <h4>Jag kommer delta på grillkväll</h4>
            <input type="radio" className={styles.radio} id="grill_ja" name="grill" value="Ja" ref={register({required: true})}/>
            <label for="grill_ja">  Ja</label><br/>
            <input type="radio" id="grill_nej" name="grill" value="Nej"/>
            <label for="grill_nej">Nej</label><br/>
            
            <h4>Jag kommer delta på bröllopet</h4>
            <input type="radio" id="the_day_ja" className={styles.radio} name="the_day" value="Ja" ref={register({required: true})}/>
            <label for="the_day_ja">Ja </label><br/>
            <input type="radio" id="the_day_nej" name="the_day" value="Nej"/>
            <label for="the_day_nej">Nej</label><br/>

            <h4>Specialkost/allergier</h4>
            <input type="radio" id="food_pref_ja" className={styles.radio} name="food_pref" value="Ja" onChange={onPrefchange} ref={register({required: true})}/>
            <label for="food_pref_ja">Ja </label><br/>
            <input type="radio" id="food_pref_nej" name="food_pref" value="Nej" onChange={onPrefchange}/>
            <label for="food_pref_nej">Nej</label><br/>

            <label className={styles.pure_material_textfield_outlined} >
              <textarea id="food_pref_text" name="food_pref_text" placeholder=" " rows="4" cols="50" ref={register({required: true})} hidden/>
              <span>Specifiera din Specialkost eller allergi</span>
            </label>
            <br/>

            <label className={styles.pure_material_textfield_outlined}>
              <textarea name="message" placeholder=" "  rows="4" cols="50" ref={register({required: true})}/>
              <span>Meddelande</span>
            </label>
            <br/>
            <input type="submit" value="Skicka OSA"/>
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