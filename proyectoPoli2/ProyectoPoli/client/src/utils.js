import { useState, useEffect, createContext } from "react";


export function RandomTextReveal({ text }){
  const [revealedText, setRevealedText] = useState('');
  const specialChars = [...'!@£$%&}{":;?><][+=-_qwertyuiopasdfghjklzxcvbnm'.split('')];
  
  useEffect(() => {
    const revealText = () => {

      let intervalId;

      const updateText = () => {
        const randomText = text
          .split('')
          .map((char) => (Math.random() > 0.5 ? char : getRandomChar()))
          .join('');

        setRevealedText(randomText);
      };

      intervalId = setInterval(updateText, 50);

      setTimeout(() => {
        clearInterval(intervalId);
        setRevealedText(text);
      }, 1000);
    };

    const getRandomChar = () => {
      const randomIndex = Math.floor(Math.random() * specialChars.length);
      return specialChars[randomIndex];
    };

    revealText();
  }, [text]);

  return <div>{revealedText}</div>;
};




export function useVh(){
  const [vh, setVh] = useState(window.innerHeight/100);
  
  useEffect(() => {
    const handleWindowResize = () => {
      setVh(window.innerHeight/100)
      console.log(window.innerHeight/100);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return vh;
}

export const VhContext = createContext(null);

export const ChangePageContext = createContext(null);

export const SetSettingPageContext = createContext(null);

export const SetHeladeraContext = createContext(null);