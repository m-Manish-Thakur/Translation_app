import React, { useState, useEffect } from "react";
import "./Translator.css";
import axios from "axios";

const Translator = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslateText] = useState("");
  const [sourceLan, setSourceLan] = useState("en");
  const [targetLan, setTargetLan] = useState("hi");
  const [isTranslating, setIsTranslating] = useState(false); // Track if a translation is in progress                                                                

  useEffect(() => {
    async function translateText() {

      if (sourceText === '') {
        setTranslateText('')
        return; // Don't make requests if the sourceText is empty or a translation is already in progress
      }

      try {
        const response = await axios.post("https://libretranslate.de/translate", {
          q: sourceText,
          source: sourceLan,
          target: targetLan,
          format: "text",
        });

        console.log(response.data.translatedText);
        setTranslateText(response.data.translatedText);
      } catch (error) {
        console.error("Translation error:", error);
      } 
    }

    const delay = 1000; // Adjust the delay as needed (e.g., 1000 ms = 1 request per second)
    const timer = setTimeout(translateText, delay);

    return () => clearTimeout(timer); // Clear the timer if the component unmounts or the effect is re-run
  }, [sourceText, sourceLan, targetLan]);
 
  return (
    <>
      <div id="translator">
        <header>
          <h2>Language Translator</h2>
        </header>
        <div className="container">
          <div className="item">
            <select
              value={sourceLan}
              onChange={(e) => setSourceLan(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="zh">Chiness</option>
              <option value="el">Greek</option>
              <option value="ja">Japanese</option>
              <option value="ru">Russian</option>
            </select>

            <textarea
              rows="9"
              placeholder="Enter text to translate"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
          </div>

          <div className="item">
            <select
              value={targetLan}
              onChange={(e) => setTargetLan(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="zh">Chiness</option>
              <option value="el">Greek</option>
              <option value="ja">Japanese</option>
              <option value="ru">Russian</option>
            </select>
            <div className="translatedText">{translatedText}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Translator;
