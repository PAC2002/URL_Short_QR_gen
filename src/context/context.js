import { createContext, useContext, useState } from "react";

const urlContext = createContext();

const UrlProvider = ({ children }) => {
    const [inputUrl, setInputUrl] = useState("");
    const [Qrcode, setQRcode] = useState("");
    const [shortURL, setShortURL] = useState("");
    const [copied, setCopied] = useState(false);
    return (<>
        <urlContext.Provider value={{ inputUrl, setInputUrl, Qrcode, setQRcode, shortURL, setShortURL, copied, setCopied }}>
            {children}
        </urlContext.Provider>
    </>)
}
export const UrlState = () => { return useContext(urlContext); }
export default UrlProvider;
