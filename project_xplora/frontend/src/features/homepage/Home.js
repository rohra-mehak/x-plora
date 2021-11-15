
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

    useEffect(() => {

    let controller =  new ScrollMagic.Controller();
    let timeline = new TimelineMax();

    timeline
    // .to('#LFront', 2, {y: -80})
    // .to('#RFront', 2, {y: -80}, '-=2')
    .to('#LMid', 2, {y: 100}, '-=2')
    .to('#RMid', 2, {y: 100},  '-=2')
    .to('#back', 2, {y: 180}, '-=2')

    .fromTo('#star',3, {y:-200}, {y:300}, '-=2')

    .to('#astranaut', 2, {y: -100}, '-=3')
    .to('#text', 1, {opacity: 0}, '-=2')
    .to('#earth', 2, { x: -202, y:-150, rotate: 20}, '-=3')
    .fromTo('#loader', 2, {opacity: 0, x:-200}, {opacity: 1, x:0}, '-=1')
    .fromTo('#Content', 2, {opacity: 0}, {opacity: 1}, '-=3')
    .to('#next', 2, {boxShadow: '0px -20px 60px rgb(155, 2, 134)'},'-=4')
    let scene = new ScrollMagic.Scene({
        triggerElement: "section",
        duration: "120%",
        triggerHook: 0,
    })
    .setTween(timeline)
    // .setPin(".main_sec")
    .addTo(controller);


    // console.log(this.prefixFromState);
    }, [])
   
    const dispatch = useDispatch();
    
    function customFetchPrefix(){
        axios({
            url : 'http://localhost:8000/token-auth/',
            method: 'POST',
            data: {
                 
                    "username": "POpe",
                    "password": "stud123!"
            }
        

        }).then(res => {
            console.log(res);
            dispatch(customPrefix('None'));
        });
        // axios.get('http://localhost:8000/users')
        // .then(res=> {
        //     console.log(res);
        //     dispatch(customPrefix('None'));
        // } );
    }


    return (
        <div className='container_body'>
            
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
                <div id="mainContainer">
                    <div id='containerOne'>
                        <div id='loader'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <h2>1</h2>
                        </div>
                        <div id='Content'> Describe your Dataset </div>
                    </div> 
                    <div id='containerTwo'>
                    <div id='loader'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <h2>2</h2>
                        </div>
                        <div id='Content'> Track your EDA </div>
                    </div> 
                    <div id='containerThree'>
                    <div id='loader'>
                            <span></span>
                            <span></span>
                            <span></span>
                            <h2>3</h2>
                        </div>
                        <div id='Content'> Get your Visulizations </div>
                    </div> 
                </div>
            </section>

            <section id="Login">
                <div id="l_container">Login</div>
                <div id="r_container">Register</div>
            </section>


           
        </div>
    );
    }

  


export default Homepage;
