import Image from "next/image";

function Stats() {
  const articles = 
  [
    {
      image: "/brand.webp",
      alt: "Brand_recognition",
      header: "Brand Recognition",
      text: "Enhance Your Brand Recognition With Every Link. Generic Links Have No Impact. Branded Links Build Trust In Your Content."
    },
    {
      image: "/details.webp",
      alt: "detailed_records",
      header: "Detailed Records",
      text: "Access Insights Into Who Clicks Your Links. Understanding When And Where Engagement Occurs Helps You Make Better Decisions."
    },
    {
      image: "/customize.webp",
      alt: "fully_customizable",
      header: "Fully Customizable",
      text: "Boost Brand Visibility And Content Discovery With Customizable Links, Amplifying Audience Engagement."
    }
  ]
  
      
  const articleInfo = articles.map((data) => (
    <article
      key={data.header}
      className="bg-white rounded-xl px-5 py-8 w-[320px] h-[250px] relative"
    >
      <div className="h-16 w-16 rounded-full bg-DarkViolet flex items-center justify-center absolute -top-8">
        <Image src={data.image} alt={data.alt} width={35} height={35} />
      </div>
      <h3 className="mb-3 text-DarkViolet font-bold text-lg mt-9">
        {data.header}
      </h3>
      <p className="text-sm text-GrayishViolet leading-6 max-w-[260px]">
        {data.text}
      </p>
    </article>
  ));
  return (
    <section className="flex flex-col items-center bg-Gray mt-8 pb-20">
      <Shortener />
      <div className="text-center w-[450px]">
        <h2 className="font-bold text-3xl text-VeryDarkBlue">
          Advanced Stats
        </h2>
        <p className="text-GrayishViolet leading-relaxed text-base mt-5">
        Monitor The Performance Of Your Links Across The Web Using Our Advanced Statistics Dashboard.
        </p>
      </div>

      <hr />

      <div className="flex mt-16 justify-evenly w-full">{articleInfo}</div>
    </section>
  );
}

export function Shortener() {
  return (
    <>
      <div className="bg-[url(../../public/background2.webp)] bg-center bg-contain bg-no-repeat py-[72px] self-center lg:w-3/5 relative bottom-24">
        <form className="flex justify-center gap-5 w-full">
          <input
            type="text"
            placeholder="short-ify your link here..."
            className="w-3/4 p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan"
          />
          <button type="submit" className="px-8 rounded-lg">
            Short-IFY It!
          </button>
        </form>
        <div className="wrongUrlContainer">
          <small id="wrong_url"></small>
        </div>
      </div>
    </>
  );
}

export default Stats;