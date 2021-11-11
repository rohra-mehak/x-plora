
import React, {useEffect} from 'react';
import './Home.css';
import LFRONT from './assets/LMountainsFront.png';
import LMIDDLE from './assets/LMountainsMid.png';
import RFRONT from './assets/RMountainsFront.png';
import RMIDDLE from './assets/RMountainsMid.png';
import BACK from './assets/MountainsBack.png';
import ASTRONAUT from './assets/Astranaut.png';
import EARTH from './assets/Earth.png'
import axios from 'axios';
import STARS from './assets/stars.png'

import * as ScrollMagic from 'scrollmagic';
import {TweenMax, TimelineMax, set} from "gsap";
import {ScrollMagicPluginGsap} from "scrollmagic-plugin-gsap";
import {useSelector, useDispatch} from 'react-redux';
import {malePrefix, femalePrefix, customPrefix} from './homePageSlicer';
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);


function Homepage () {
    const prefixFromState = useSelector((state) => state.homePage.prefix );

    console.log(prefixFromState);
    useEffect(() => {

    let controller =  new ScrollMagic.Controller();
    let timeline = new TimelineMax();

    timeline
    // .to('#LFront', 2, {y: -80})
    // .to('#RFront', 2, {y: -80}, '-=2')
    .to('#LMid', 2, {y: 100}, '-=2')
    .to('#RMid', 2, {y: 100},  '-=2')
    .to('#back', 2, {y: 220}, '-=2')

    .fromTo('#star',3, {y:-200}, {y:300}, '-=2')

    .to('#astranaut', 2, {y: -100}, '-=3')
    .to('#text', 1, {opacity: 0}, '-=2')
    .to('#earth', 2, { x: -202, y:-150, rotate: 20}, '-=3')
    // .to('header',2, { filter: blur('2px') });
    // .to('#next', 10, {trasnlateY: -100}, '-=2')

    let scene = new ScrollMagic.Scene({
        triggerElement: "section",
        duration: "70%",
        triggerHook: 0,
    })
    .setTween(timeline)
    .setPin(".main-sec")
    .addTo(controller);


    // console.log(this.prefixFromState);
    }, [])
   
    
    const dispatch = useDispatch();
    
    function customFetchPrefix(){

        // axios({
        //     url : 'http://localhost:8000/register',
        //     method: 'POST',
        //     data: {
        //         "user": {
        //             "username": "Parmar",
        //             "first_name": "Jr",
        //             "last_name": "Sr",
        //             "email": "JrSr@gmail.com",
        //             "password": "JrSr"
        //         },
        //         "profession": "Proffesor",
        //         "Name_of_Organization": "Pwr"
        //     }

        // }).then(res => {
        //     console.log(res);
        //     dispatch(customPrefix('None'));
        // });
        axios.get('http://localhost:8000/users')
        .then(res=> {
            console.log(res);
            dispatch(customPrefix('None'));
        } );
    }


    return (
        <div className='container_body'>
            <header>
                <a href="." className="logo">X-plora</a>
                <ul>
                    <li><a href="." className="active">Home</a></li>
                    <li><a href="#next">Featues</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href=".">Register</a></li>
                </ul>
            </header>

            <section className='main_sec'> 
                <img src={STARS} id='star' alt='.' />
                <img src={BACK} alt='.' id='back' />
                <img src={EARTH} id='earth' alt='.' />
                <img src={LMIDDLE} id='LMid' alt='.' />
                <img src={RMIDDLE} id='RMid' alt='.' />
                <img src={ASTRONAUT} id='astranaut' alt='.' />
                <img src={LFRONT} id='LFront' alt='.' />
                <img src={RFRONT} id='RFront' alt='.' />
                <h2 id="text">X-PLORA</h2>
            </section>

            <section id='next'>
                <button onClick={() => dispatch(malePrefix())}>Add Male Prefix</button>
                <button onClick={() => dispatch(femalePrefix())}>Add Female Prefix</button>
                <button onClick={customFetchPrefix}>Add custom Prefix</button>
                <h1> {prefixFromState} Anon </h1>
            </section>

            <section id="contact">
                <h1>Contact</h1>
            </section>


           
        </div>
    );
    }

  


export default Homepage;
