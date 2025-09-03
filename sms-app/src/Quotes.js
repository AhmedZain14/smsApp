import { useEffect, useState } from 'react';
import LoginImage from './images/loginImage.gif'


function Quotes(){

    let [quotes, setQuotes] = useState();
    let [quote, setQuote] = useState(" ");

    const getQuotes = () => {
        fetch('http://localhost:3006/quotes'
        ,{
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        }
        )
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            setQuotes(data);
        });
    }

    useEffect(()=>{
        getQuotes();
        // (quotes && setQuote(quotes[Math.floor(Math.random() * quotes.length)]))
    }, [])

    useEffect( () => {
        (quotes && setQuote(quotes[Math.floor(Math.random() * quotes.length)]))
    }, [quotes]);
    

    return (
        <>
            <div className="quote">
                {/* <svg className='quote-background' viewBox="0 0 787.279 754.591">
                <g id="Quotes" transform="translate(-6.721 -177.858)">
                <path id="Path_5" data-name="Path 5" d="M179.051,132.073C112.014-34.579,506.635-38.7,461.352,92.566s92.673,105.82,118.354,129.288c93.814,81.868-80.644,215.106-149.5,292.719-49.787,51.393-192.246,136.42-228.93-31.91S-5.249,507.922.125,305.276C9.586,122.741,246.087,298.726,179.051,132.073Z" transform="translate(576.928 932.45) rotate(-160)" fill="rgba(118,158,236,0.15)"/>
                </g>
                </svg> */}
                <img alt="" src={LoginImage}/>
                <div className="quote-text">
                    <p>
                    {/* <span>" </span> */}
                    { (quote) ? quote : "" }
                    {/* The earlier you start
                    working on something,
                    the earlier you will see
                    results. */}
                    {/* <span> "</span> */}
                    </p>
                </div>
            </div>
        </>
    )

};



export default Quotes;
