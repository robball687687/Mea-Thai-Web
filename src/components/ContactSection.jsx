import React from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";

const ContactSection = () => (
  <ThaiSection id="contact" className="bg-white">
    <ThaiHeading kicker="Say hello">Contact</ThaiHeading>
    <p className="text-gray-800 text-center">
      📍 60 Court St. Plymouth, MA
      <br />
      📞 (978) 763-3044
      <br />
      📧 robball687@gmail.com
    </p>
  </ThaiSection>
);

export default ContactSection;
