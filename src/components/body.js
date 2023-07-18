import FormControl from './formControll';
import React, { useEffect } from 'react';
import { UrlState } from '../context/context';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useToast } from '@chakra-ui/react';
function Body() {
    const toast = useToast();
    const { Qrcode, shortURL, copied, setCopied } = UrlState();
    useEffect(() => {
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1500)
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [copied])
    const SettingCopying = () => {
        setCopied(true);
        toast({
            title: "copied",
            description: "url copied",
            duration: "1500",
            isClosable: true,
            position: "top",
            status: 'success'
        })
    }
    return (
        <>  <div className='Body'>
            <FormControl />
            <div className="outPut">

                {shortURL && <><div className='shortUrl'>
                    <span>{shortURL}</span>
                    <CopyToClipboard text={shortURL} onCopy={SettingCopying}>
                        <button className={copied ? "copied" : "notCopied"}>Copy ShortURL</button>
                    </CopyToClipboard>

                </div></>}

                {Qrcode && <><div className='qr'>
                    <img src={Qrcode} alt='QrCode' />
                    <a href={Qrcode} download="qrCode.png" id='download'>Download</a>
                </div>
                </>
                }

            </div>
        </div>
        </>
    )
}
export default Body;