import { useEffect, useState } from "react";
import axios from "axios";
import UseCityContext from "../hooks/UseCityContext";
const { getCode } = require("country-list");

const TopNews = () => {
  const { currentCountry } = UseCityContext();
  const [renderArticles, setRenderArticles] = useState(null);
  //using newsapi.org
  useEffect(() => {
    let countryCode = getCode(currentCountry);
    let renderedArticle = null;

    const fetchTopNews = async () => {
      const res = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: countryCode,
          apiKey: "05c48832dcba46c5ae8390ea48ed051b",
        },
      });

      if (res != null) {
        renderedArticle = res.data.articles.map((item, index) => {
          let checkImgUrl =
            "https://previews.123rf.com/images/sarahdesign/sarahdesign1410/sarahdesign141000999/32210613-news-icon.jpg";
          if (item.urlToImage !== null) {
            checkImgUrl = item.urlToImage;
          }
          return (
            <div
              className="ui items m-5 bg-slate-100"
              onClick={() => openInNewTab(`${item.url}`)}
              key={index}
            >
              <div className="item p-4 divided">
                <div className="image Rounded">
                  <img src={checkImgUrl} />
                </div>
                <div className="content">
                  <a className="header">{item.title}</a>
                  <div className="description">
                    <p>{item.description}</p>
                  </div>
                  <div className="extra">Source: {item.source.name}</div>
                </div>
              </div>
            </div>
          );
        });
        setRenderArticles(renderedArticle);
      }
    };
    if (countryCode != null) {
      fetchTopNews();
    }
  }, [currentCountry]);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return <div className="pb-4">{renderArticles}</div>;
};

export default TopNews;
