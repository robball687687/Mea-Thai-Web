import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function App() {
  const [menuData, setMenuData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [orderLink, setOrderLink] = useState("https://polite-mud-02f9f1a0f.6.azurestaticapps.net"); // fallback
  const [loading, setLoading] = useState(true); // add this
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isOrderingEnabled, setIsOrderingEnabled] = useState(true);

  useEffect(() => {
    axios
      .get("https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCPOSWebMenu")
      .then((res) => {
        const categories = res.data.menuItemCategories || [];

        const structuredMenu = categories
          .filter((cat) => cat.menuItems?.length > 0)
          .map((cat) => ({
            category: cat.categoryName,
            items: cat.menuItems
              .filter((m) => m.item?.active)
              .map((m) => ({
                name: m.item.itemName,
                price: `$${m.item.itemPrice.toFixed(2)}`,
                description: m.item.itemDesc,
                image: m.item.itemImage,
              })),
          }));

        setMenuData(structuredMenu);
        if (structuredMenu.length) setActiveCategory(structuredMenu[0].category);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load WebMenu:", err);
      });

      // fetch online ordering status
      axios
      .get("https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/value/Mea-Online-Ordering-Website-On-Off?name=Mea-Online-Ordering-Website-On-Off")
      .then((res) => {
        const rawValue = res.data?.toString().trim().toLowerCase();
    
        const isOff = rawValue === "off" || rawValue === "0" || rawValue === "false";
    
        //console.log("Ordering toggle value:", rawValue);
        setIsOrderingEnabled(!isOff); // OFF means disabled
      })
      .catch((err) => {
        console.error("Failed to fetch ordering toggle:", err);
        setIsOrderingEnabled(true); // fallback to ON
      });

      // fetch order link
      axios
      .get("https://rmrthemeaonlineorderingwebapi.azurewebsites.net/api/TCVariable/link")
      .then((res) => {


        const onlineLink = res.data;
        //console.log(res.data);
        setOrderLink(onlineLink);
        
      })
      .catch((err) => {
        console.error("Failed to fetch order link:", err);
      });

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToMenu = () => {
    const section = document.getElementById("menu");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center relative">
      {/* Top Navigation */}
      <header className="w-full bg-black bg-opacity-80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <h1 className="text-xl font-bold text-white">The Mea Thai Cuisine</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-4 text-white text-sm md:text-base">
            {["Delivery", "Menu", "FAQ", "Trailer", "About", "Contact"].map((section) => (
              <button
                key={section}
                onClick={() =>
                  document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-red-400 transition"
              >
                {section}
              </button>
            ))}
          </nav>

          {/* Desktop Order Button */}
          {/* <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition"
          >
            Order Online
          </a> */}

          {isOrderingEnabled && (
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition"
            >
              Order Online
            </a>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {mobileNavOpen && (
          <div className="md:hidden bg-black text-white flex flex-col items-center gap-2 py-4 transition-all duration-300 ease-in-out z-40">
            {["Delivery", "Menu", "Special", "FAQ", "Trailer", "About", "Contact"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setMobileNavOpen(false);
                  document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-lg py-2 hover:text-red-400"
              >
                {section}
              </button>
            ))}
            <a
              href={orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition"
            >
              Order Online
            </a>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <div className="relative w-full h-[75vh] overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://rmrstorage.blob.core.windows.net/videomeathai/1022637517-hd.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center space-y-6">
          <motion.img
            src="https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png"
            alt="Restaurant Logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-68 md:w-92"
          />
          <motion.button
            onClick={scrollToMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-6 py-3 rounded-full text-lg shadow hover:bg-red-700 transition"
          >
            View Menu ↓
          </motion.button>
        </div>
      </div>

      {/* Delivery Section */}
      <section id="delivery" className="w-full max-w-4xl px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Delivery</h2>
        <p className="text-lg text-gray-800">
          We offer fast and fresh delivery through DoorDash, and Grubhub.
          Order now and enjoy authentic Thai cuisine at your doorstep!
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href="https://order.online/business/the-mea-thai-cuisine-13045370" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-6 py-2 rounded-full shadow hover:bg-red-700 transition">DoorDash</a>
          <a href="https://themeathaicuisine.dine.online/" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-6 py-2 rounded-full shadow hover:bg-purple-700 transition">Grubhub</a>
        </div>
      </section>

      {/* Menu Section */}
      <div id="menu" className="w-full max-w-4xl px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-red-500">Menu</h2>
          <a
            href="https://rmrstorage.blob.core.windows.net/measite/MeaMenu2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 text-white px-4 py-2 rounded-full shadow hover:bg-red-700 transition text-sm"
          >
            Download Menu PDF
          </a>
        </div>
        {!isMobile && (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {menuData.map((section) => (
              <button
                key={section.category}
                onClick={() => setActiveCategory(section.category)}
                className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition ${
                  activeCategory === section.category
                    ? "bg-red-600 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {section.category}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : 
        (isMobile
          ? menuData
          : menuData.filter((section) => section.category === activeCategory)
        ).map((section, i) => (
          <div key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mb-10"
            >
              <div className="flex items-center justify-center">
                <span className="text-3xl font-extrabold text-red-600 border-b-4 border-red-500 px-6 pb-1 uppercase tracking-widest bg-white z-10 relative">
                  {section.category}
                </span>
              </div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-200 z-0" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="relative bg-gray-50">
  {/* Aspect ratio box: 4:3 looks nice for food; change to aspect-square if you prefer */}
  <div className="aspect-[4/3] w-full overflow-hidden">
    <img
      src={item.image}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://rmrstorage.blob.core.windows.net/measite/MeaLogoBlackTrans.png";
      }}
      alt={item.name}
      loading="lazy"
      className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
    />
  </div>

  {/* Subtle rim to make white plates pop on light backgrounds */}
  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
</div>
                  <div className="p-4">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <p className="text-gray-600">{item.description}</p>                      
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
          }




          
        </div>
      </div>

      

      
      {/* FAQ Section */}
    <section id="faq" className="w-full max-w-4xl px-4 py-12 text-center">
      <h2 className="text-3xl font-bold text-red-500 mb-4">FAQ</h2>
      <div className="text-gray-800 text-left space-y-6">
        <ul className="faq-list space-y-4">
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">What are your hours?</div>
            <div className="faq-answer">We are open from 11:30AM to 3PM. We then close for a one hour break and reopen at 4PM. On Monday through Thursday we close at 9PM (Last order 8:30PM). On Friday and Saturday we close at 9:30PM (Last order 9PM).</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you take reservations?</div>
            <div className="faq-answer">We do not take reservations but we do accept call ahead seating. Please just call thirty minutes before you would like to dine in.</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you serve beer and wine?</div>
            <div className="faq-answer">Yes we have a full liquor license so we serve beer, wine, and liquor. Please keep in mind we do not have a full bar, but we do have many mixed drinks available such as Mai Tai's, Scorpion Bowls etc... We have Thai beer (Singha / Leo) in stock as well as many local breweries like Second Wind and Mayflower brewing. Lastly our wine is hand selected by our third party wine expert to make sure we have the best pairings with our meals.</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you have gluten free options?</div>
            <div className="faq-answer">Yes, many of our entrees can be made gluten free and some already are. Our pad thai and all of our curries are gluten free as is! For most other entrees we can make them gluten free by using gluten free soy sauce. Please inform your server when ordering!</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">I like "X" on your menu but I don’t want it with "X", can you leave it out?</div>
            <div className="faq-answer">Yes, everything we serve is made to order. Please inform us of any changes you would like to your meal and if you have any allergies!</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">I don't like spicy food, what can I eat?</div>
            <div className="faq-answer">When we designed our menu we made sure that half of every menu category has an equal amount of non-spicy dishes. So let’s say you’re craving a noodle dish. If you wanted something not spicy we have Pad Thai, Pad See Ew, and Pad Woonsen. If you wanted something with a bit more kick we have Basil Pad Thai, Pad Khee Mao, and Pad Singapore noodle. So yes, we have many non-spicy options.</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you deliver?</div>
            <div className="faq-answer">
              Yes we deliver via{" "}
              <a href="https://themeathaicuisine.dine.online" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Grub Hub</a>{" "}
              and{" "}
              <a href="https://order.online/business/the-mea-thai-cuisine-13045370" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">DoorDash</a>.
            </div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you offer catering meals?</div>
            <div className="faq-answer">Yes, please call a few days ahead and we can talk to you about catering options.</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you offer coupons?</div>
            <div className="faq-answer">Yes, please join our mailing list to receive weekly coupons.</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Do you have sushi / chicken fingers / lo mein / fortune cookies?</div>
            <div className="faq-answer">No, we only offer authentic Thai food. Sorry!</div>
          </li>
          <li className="faq-item">
            <div className="faq-question font-semibold text-lg">Hi, can you make Pad Thai veggie with no noodles, only green peppers, onions. Add red curry sauce, add brown rice and pineapple?</div>
            <div className="faq-answer">No, sorry! While we do allow some substitutions, at this point you're creating a new dish. We take pride in our menu and prefer not to make custom off-menu creations that could reflect poorly on our brand.</div>
          </li>
        </ul>
      </div>
    </section>

      {/* Trailer Section */}
      <section id="trailer" className="w-full max-w-4xl px-4 py-12 text-center">
    <h2 className="text-3xl font-bold text-red-500 mb-4">Trailer</h2>

    {/* Video */}
    {/* <video className="mx-auto w-full max-w-xl rounded-xl shadow mb-8" controls>
      <source
        src="https://rmrstorage.blob.core.windows.net/videomeathai/1022637517-hd.mp4"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video> */}

    {/* Trailer Description */}
    <p className="text-lg text-gray-800 mb-6">
      Our custom-built 18 ft food trailer is ready to serve authentic Thai food at public festivals,
      private parties, corporate events, and more. Contact us to learn more about booking the trailer
      for your next event!
    </p>

    {/* Image Gallery */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <img
        src="https://rmrstorage.blob.core.windows.net/bb1/MeaTrailer2.jpg"
        alt="Food Trailer Side View"
        className="rounded-xl shadow object-cover w-full h-64"
      />
      <img
        src="https://rmrstorage.blob.core.windows.net/bb1/MeaTrailer1.jpg"
        alt="Food Trailer Serving Window"
        className="rounded-xl shadow object-cover w-full h-64"
      />
      {/* <img
        src="/images/trailer3.jpg"
        alt="Food Trailer at Event"
        className="rounded-xl shadow object-cover w-full h-64"
      />
      <img
        src="/images/trailer4.jpg"
        alt="Food Trailer Setup"
        className="rounded-xl shadow object-cover w-full h-64"
      /> */}
    </div>
  </section>

      {/* About Section */}
      <section id="about" className="w-full max-w-4xl px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">About</h2>
        <p className="text-lg text-gray-800 space-y-4 text-left">
          The Mea Thai Cuisine is a small family owned restaurant in Plymouth MA. With one of the owners growing up in Plymouth and the other originally from Thailand.
          <br /><br />
          "Mea" translates to "Wife" in Thai. Our slogan is "Thai food by Thai Wife". Our owner Mika came up with this slogan as she prepared lunch for her husband Rob (the other owner) most days for his work lunch.
          <br /><br />
          Mika (The Wife) received her Masters degree in culinary in Thailand. Many of her recipes we serve come from her families recipes she learned growing up in Bangkok. She strives to put as much attention to detail in every aspect of the food and making sure that it is consistent.
          <br /><br />
          Before starting this business we came up with the following guidelines:
          <ul className="list-disc list-inside mt-4">
            <li>Serve authentic Thai food.</li>
            <li>Use fresh and authentic ingredients no matter the price point.</li>
            <li>Treat our employees with respect and how we as owners would like to be treated.</li>
            <li>Close on Sundays for Family Day and so our employees can spend time with their family.</li>
            <li>Close from 3-4PM every day to provide ample time for ourselves and employees to eat or rest.</li>
            <li>Provide customer service the way we would like to be treated.</li>
            <li>Be ourselves.</li>
          </ul>
          <br />
          If it comes to a time that we are missing any of these guidelines, this site will probably be down because at that point we will not want to still be in business.
          <br /><br />
          We appreciate every customer we receive and thank you for supporting us!
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full max-w-4xl px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Contact</h2>
        <p className="text-gray-800">
          📍 60 Court St. Plymouth MA<br />📞 (978) 763-3044<br />📧 robball687@gmail.com
        </p>
      </section>

      {/* Desktop Order Now Button */}
      <a
        href={orderLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:inline-block bg-red-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:bg-red-700 transition"
      >
        Order Online
      </a>

      {/* Mobile Floating Order Button */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center md:hidden z-50">
        <a
          href={orderLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          Order Online
        </a>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
          title="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;