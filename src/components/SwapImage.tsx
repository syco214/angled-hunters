import React, { useEffect, useState } from "react";
import { programs } from '@metaplex/js';
import { Connection } from '@solana/web3.js';
import { styled } from "@mui/system";
const {
    metadata: { Metadata },
  } = programs;

  
const NftImage = styled("img")({
    width: 200,
    height: 200,
    background: "#000",
  });
export default function SwapImage( props : any) {
    
    const conn = new Connection("https://solana-api.projectserum.com", 'processed');
    const [token, setToken] = useState('placeholder.png');

    useEffect(() => {
        if (token === "placeholder.png") {
            getToken();
        }
    }, []);

    const getToken = async () => {
        console.log('getting swap uri')
        if(props.id.length){
        const metadataPDA = await Metadata.getPDA(props.id);
        const onchainMetadata = (await Metadata.load(conn, metadataPDA)).data;
        const url = onchainMetadata.data.uri
        const response = await fetch(url);
        const data = await response.json();
        const image = data.image;
        setToken(image);
        } else {
            setToken('placeholder.png')
        }
    };

    return (
     <NftImage src={token} alt="swap hunter" />
    );
  }