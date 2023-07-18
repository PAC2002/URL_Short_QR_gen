import React, { useState } from 'react';
import Button from './button';
import { useToast } from '@chakra-ui/react';
import validator from 'validator'
import QRcode from 'qrcode';
import { UrlState } from '../context/context';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

function FormControl() {
    const { inputUrl, setInputUrl, setQRcode, setShortURL } = UrlState();
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const Shrink = async (e) => {
        e.preventDefault();
        if (validator.isURL(inputUrl)) {
            try {
                setLoading(true);
                const res = await axios(`https://api.shrtco.de/v2/shorten?url=${inputUrl}`);
                setShortURL(res.data.result.full_short_link);

            } catch (error) {
                toast({
                    title: "Error",
                    duration: 1000,
                    description: "something unexpected occured in the server side",
                    position: "top-right",
                    isClosable: true,
                    status: "error"
                })
            } finally {
                setLoading(false);
            }

        } else {
            return toast({
                title: 'Error',
                description: "Please enter a valid Url",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }
    const qrCode = (e) => {
        e.preventDefault();
        setLoading(true);
        const url = inputUrl;
        if (validator.isURL(url)) {
            QRcode.toDataURL(url, {
                margin: 2,
                color: {
                    dark: '#000000ff',
                    light: '#ffffffff'
                }
            }, async (err, uri) => {
                if (err) {
                    return toast({
                        title: "Error",
                        description: "Something unexpected happens",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right"
                    })
                }
                setLoading(false);
                // console.log(uri);
                await setQRcode(uri);
            })

        } else {
            return toast({
                title: 'Error',
                description: "Please enter a valid Url",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    }



    return (<>
        <div className='Form'>
            <form id='inputs'>
                <input id="forminput" placeholder='Type or Paste your url' name='url' onChange={(e) => setInputUrl(e.target.value)} />
                <div className='buttons'>
                    <Button title="Shrink URL" clicked={(e) => Shrink(e)} />
                    {loading && <Spinner color="#B34360" />}
                    <Button title="Get QR code" clicked={(e) => qrCode(e)} />
                </div>
            </form>
        </div>

    </>);
}

export default FormControl;