/* eslint-disable jsx-a11y/alt-text */
import "./Contact.css";
import { useEffect, componentDidMount, componentWillUnmount } from "react";
import Phone from "./phone.png";
import Phone2 from "./phone2.png";

import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import * as ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax, set } from "gsap";
import STARS from "./stars.png";
// ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

export default function Contact() {
  //   useEffect(() => {
  //     // ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

  //     let controller = new ScrollMagic.Controller();
  //     let timeline = new TimelineMax();

  //     timeline.to("#Phone1", 3, { y: 1000 });
  //     //   .to("#Phone3", 100, { y: "-11000px" }, "-=100")
  //     //   .to("#Phone2", 100, { y: "-8000px" }, "-=110");

  //     let scene = new ScrollMagic.Scene({
  //       triggerElement: "#workd",
  //       duration: "100%",
  //       triggerHook: 0,
  //     })
  //       .setTween(timeline)
  //       .addTo(controller);
  //   }, []);

  return (
    <section className="ContactMain" id="Contact">
      <img src={Phone2} id="Phone1" />
      <img src={Phone} id="Phone2" />
      <img src={Phone} id="Phone3" />
      <img src={Phone2} id="Phone4" />
      <img src={Phone2} id="Phone5" />
      <img src={STARS} id="stars" />

      <div className="contactContainer">
        <div className="phone">
          <img src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-phone-contact-us-flatart-icons-lineal-color-flatarticons.png" />
          <h2 id="phone">+48 729636533</h2>
        </div>

        <div className="email">
          <img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/64/000000/external-email-advertising-kiranshastry-lineal-color-kiranshastry-3.png" />
          <h2 id="phone">contact@xplora.com</h2>
        </div>
      </div>
    </section>
  );
}
