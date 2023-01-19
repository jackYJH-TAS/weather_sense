import { useEffect, useState } from "react";
import axios from "axios";

const TodayQuotes = () => {
  const [quotes, setQuotes] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const fetchTodayQuote = async () => {
      const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": "8fdMqPmoesAUbGN8xXODHA==QlofoIiRduwGsW36",
        },
        params: {
          //category: "inspirational",
        },
      });
      //console.log(res.data[0]);
      setQuotes(res.data[0].quote);
      setAuthor(res.data[0].author);
    };
    fetchTodayQuote();
  }, []);
  return (
    <div className=" m-5 ">
      <article className="message is-info antialiased ">
        <div className="message-body w-7/8">
          {quotes} <br />
          <div className="text-right">
            --- <b>{author}</b>
          </div>
          <div className="text-right"> Inspirated by api-ninjas.com </div>
        </div>
      </article>
    </div>
  );
};

export default TodayQuotes;
