import React from "react";
import ThaiSection from "./layout/ThaiSection";
import ThaiHeading from "./layout/ThaiHeading";

const AboutSection = () => (
  <ThaiSection id="about" className="bg-white">
    <ThaiHeading kicker="Our story">About</ThaiHeading>
    <div className="text-lg text-gray-800 space-y-4 max-w-3xl mx-auto">
      <p>
        The Mea Thai Cuisine is a small family-owned restaurant in Plymouth, MA. “Mea” translates to
        “Wife” in Thai—our slogan is “Thai food by Thai Wife.”
      </p>
      <p>
        Mika received her Master’s in culinary arts in Thailand. Many dishes come from family recipes
        she learned growing up in Bangkok, prepared with care and consistency.
      </p>
      <p>Our guidelines:</p>
      <ul className="list-disc list-inside">
        <li>Serve authentic Thai food.</li>
        <li>Use fresh, authentic ingredients.</li>
        <li>Treat employees with respect.</li>
        <li>Sunday is Family Day.</li>
        <li>Daily 3–4 PM break for staff meal/rest.</li>
        <li>Provide the service we’d want ourselves.</li>
        <li>Be ourselves.</li>
      </ul>
      <p>We’re grateful for your support. Kob khun ka/krub! 🙏</p>
    </div>
  </ThaiSection>
);

export default AboutSection;
