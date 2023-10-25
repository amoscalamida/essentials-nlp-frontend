import React, { useState } from 'react';
import { cantonal_coats_of_arms } from './resultResources';
import { BlobsModern } from './Blobs';

import axios, { AxiosError } from 'axios';

const codespaceContainer = "sturdy-space-invention-5vq9px9r969fvx7"
// const backendUrl = process.env.API_URL == null ? `https://${codespaceContainer}-5000.app.github.dev` : process.env.API_URL;
const backendUrl = "https://clownfish-app-xnr6n.ondigitalocean.app/"
function MainContent() {
    // have the blobs in the background and then in the foreground switch between the input form / thinking / result
    const [input, setInput] = useState(true);
    const [thinking, setThinking] = useState(false);
    const [result, setResult] = useState(false);
    const [animateBlobs, setAnimateBlobs] = useState("none");
    const [resultProps, setResultProps] = useState({});
    const [userInput, setUserInput] = useState("");
    const [error, setError] = useState(false);
    const [currentStatus, setCurrentStatus] = useState({ status: "Idle", statusColor: "gray" });

    const defaultBlobProps = [
        { color: '#ffa801', position: { x: 40, y: 80 }, size: 100 }, // orange
        { color: '#0fbcf9', position: { x: -20, y: 10 }, size: 150 }, // blue
    ];

    const defaultCanvasPosition = { position: "left", offsetTop: 200, offsetLeft: 0 };

    const [blobProps, setBlobProps] = useState(defaultBlobProps);
    const [canvasPosition, setCanvasPosition] = useState(defaultCanvasPosition);

    // change the blob props and canvas position based on the state of the app
    React.useEffect(() => {
        if (input) {
            setBlobProps(defaultBlobProps);
            setCanvasPosition({ position: "left", offsetTop: 100, offsetLeft: 0 });
            setAnimateBlobs("mouse");
        } else if (thinking) {
            setCurrentStatus({ status: "Processing", statusColor: "#0fbcf9" });
            setBlobProps([
                { color: '#0fbcf9', position: { x: 0, y: 0 }, size: 250 }, // blue
                { color: '#ffa801', position: { x: 0, y: 0 }, size: 100 }, // orange
            ]);
            setCanvasPosition({ position: "center", offsetTop: 200, offsetLeft: -200 });
            setAnimateBlobs("auto");
        } else if (result) {
            setCanvasPosition(defaultCanvasPosition);
            setAnimateBlobs("none");
        }
    }, [input, thinking, result]);

    const navigateTo = (page) => {
        if (page === 'home') {
            setInput(true);
            setThinking(false);
            setResult(false);
        } else if (page === 'thinking') {
            setInput(false);
            setThinking(true);
            setResult(false);
        } else if (page === 'result') {
            setInput(false);
            setThinking(false);
            setResult(true);
        }
    }

    const submitText = () => {

        // reset error
        setError(null);

        // trim and remove new lines
        let sanitizedInput = userInput.trim().replace(/(\r\n|\n|\r)/gm, "")
        setUserInput(sanitizedInput);



        navigateTo('thinking');

        // send the user input to the backend using axios
        const axiosRequest = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        axiosRequest.post(
            `${backendUrl}/model/predict`,
            { "text": sanitizedInput }).then(
                (response) => {
                    console.log(response);

                    const canton = response.data.canton.toLowerCase();
                    const certainty = response.data.certainty;

                    const blobProps = cantonal_coats_of_arms[canton].blob_properties;
                    setTimeout(() => {
                        setCurrentStatus({ status: "Completed", statusColor: "#0F8125" });
                        setResultProps({
                            "design": cantonal_coats_of_arms[canton],
                            "certainty": certainty
                        });
                        setBlobProps(blobProps);
                        navigateTo('result');
                    }, 2000);
                }).catch((error) => {
                    console.log(error);


                    setTimeout(() => {
                        if (error === AxiosError.ERR_NETWORK) {
                            setError({
                                "message": "Verify that the back-end server is reachable",
                                "status": error.code,
                                "color": "#ffa801"
                            })
                        } else {
                            setError({
                                "message": error.message,
                                "status": error.code,
                                "color": "#E8423F"
                            })
                        }

                        navigateTo('home');
                    }, 2000);
                });


    }

    const newRequest = () => {
        setUserInput("");
        setError(null);
        navigateTo('home');
        const timeout = setTimeout(() =>
            setResultProps({}), 200);

    }

    return (
        <div className='flex flex-col w-full z-0 relative'>
            {input && <InputForm userInput={userInput} setUserInput={setUserInput} />}
            {(userInput && !input) && <UserInputPreview newRequest={newRequest} userInput={userInput} currentStatus={currentStatus} />}
            {thinking && <Thinking input={userInput} />}
            {result && <Result resultProps={resultProps} input={userInput} />}
            {input && <div className='flex justify-end'>
                <button
                    className={`${userInput.length > 3 ? "opacity-100" : "opacity-0"} hover:opacity-50 transition-opacity border border-slate-600 text-black px-4 py-2 rounded-xl mt-6`}
                    onClick={submitText}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    Ask the AI
                </button>
            </div>}
            <BlobsModern blobs={blobProps} canvasPosition={canvasPosition} animateBlobs={animateBlobs} />
            {error && <div className='absolute top-0 right-0 border border-slate-600 p-4 rounded-xl mt-6 mr-6 bg-transparent text-light text-xl    
                '>
                <h3 className='text-md font-medium' style={{ color: error.color }}>{error.message}</h3>
                <p className='text-sm font-medium '>{error.status}</p>

            </div>}
        </div>
    );

}

function UserInputPreview({ userInput, currentStatus, newRequest }) {

    const { status, statusColor } = currentStatus || {};

    return (
        <div className="h-24">
            <div className='flex flex-row justify-between'>
            <p className="text-lg font-medium">Your Input <span className='ml-3 border rounded-full font-normal px-3 text-sm leading-3' style={{ color: statusColor, borderColor: statusColor }}>{status}</span></p>
            <button className='w-fit border hover:opacity-50 transition-opacity border-slate-600 text-black px-2 py-1 rounded-xl text-sm' onClick={newRequest}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>


                    Try a different text
                </button>
            </div>
            <div className='flex flex-row justify-between mt-2 py-3 border-b border-t border-slate-600 p-0 bg-transparent'>
                <div className='text-light text-lg text-left'
                >
                    {userInput}
                </div>

            </div>

        </div>
    );
}

function InputForm({ userInput, setUserInput }) {

    return (
        <div className='flex flex-col w-full sm:pl-12 md:pl-56 pt-20 sm:pt-40'>
            <p className='text-2xl font-medium mb-0'>Tell us how you talk</p>
            <p className='mb-6 text-xl font-medium'>Our AI will predict which dialect you speak</p>
            <div contentEditable spellCheck="false" autoCorrect="false" onInput={(e) => setUserInput(e.target.innerText)} className='border-b border-slate-600 py-2 bg-transparent focus-visible:border-b-2 focus-visible:outline-none text-light text-xl md:text-2xl h-auto' >
            </div>
        </div>
    );
}

function Thinking() {
    return (
        <div className='flex flex-col w-full pt-48'>
            <div className='flex justify-center'>
                <p className='text-2xl font-medium mb-6'>Thinking...</p>
            </div>
        </div>
    );
}

function Result({ resultProps, input }) {
    const { design, certainty } = resultProps;
    const { name, id, svg, main_color } = design || {};

    // add the possibility to capture the actual canton as provided by the user
    const [userCanton, setUserCanton] = useState(null);
    const [userCantonVisible, setUserCantonVisible] = useState(false);

    // add a fade in to the svg after the blob animation is done
    setTimeout(() => {
        const svg = document.getElementById("canton-image");
        svg.style.opacity = 1;
    }, 800);

    const confirmCorrectPrediction = () => {

        // send the user input to the backend using axios
        const axiosRequest = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        axiosRequest.post(
            `${backendUrl}/data/save`,
            { "text": input, "canton": id }).then(
                (response) => {
                    console.log(response);
                    setUserCantonVisible(false);
                    setUserCanton(id);
                }).catch((error) => {
                    console.log(error);
                });

    }

    const submitUserCanton = () => {
        // send the user input to the backend using axios
        const axiosRequest = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        axiosRequest.post(
            `${backendUrl}/data/save`,
            { "text": input, "canton": userCanton }).then(
                (response) => {
                    console.log(response);
                    setUserCantonVisible(false);

                }).catch((error) => {
                    console.log(error);
                });
    }

    return (
        <div className='flex flex-col gap-y-6 md:flex-row w-full pl-0 md:pl-10 md:pt-28 pt-16'>
            <div className='flex justify-center'>
                <div className='w-1/2'>
                    <img src={svg} alt={name} className='transition-opacity ease-in-out opacity-0 duration-500' id='canton-image' />
                </div>
            </div>
            <div className='flex flex-col w-full text-center md:text-left items-center'>
                {certainty < 0.5 && <div className='flex flex-row justify-center md:justify-start'>
                    <div className=' text-powerfulOrange-500 px-2 py-1 rounded-xl mt-6 ml-4 border border-powerfulOrange-500'>
                        <p className='text-sm font-medium'>Low certainty ({Math.round(certainty * 100)}%)</p>
                    </div>
                </div>}
                <p className='text-xl font-medium  mb-0'>
                    {certainty < 0.5 && "We are not sure, but you might speak"}
                    {certainty >= 0.5 && "We are " + Math.round(certainty * 100) + "% certain, that you are speaking"}
                </p>
                <p className='text-4xl font-medium' style={{ color: main_color }}>{name} dialect</p>
                <>
                    {(!userCanton || userCantonVisible) && <div className='flex gap-2'><button className='w-fit border hover:opacity-50 transition-opacity border-slate-600 text-black px-2 py-1 rounded-xl mt-6 ml-4' onClick={confirmCorrectPrediction}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>

                        Yes, that's right!
                    </button><button
                        className={`w-fit border border-slate-600 hover:opacity-50 text-black px-2 py-1 rounded-xl mt-6 ${userCantonVisible ? "bg-black text-white" : "bg-transparent"} transition-all ease-in-out duration-500}`}
                        onClick={() => {setUserCantonVisible(true); setTimeout(() => document.getElementById("userCanton").scrollIntoView({behavior: "smooth"}), 1000)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 inline">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>

                            Did we get it wrong?
                        </button></div>}
                    {userCantonVisible && <div id={"userCanton"} className='flex flex-col mt-6 justify-center'>
                        <p className='text-xl font-medium mb-0'>What dialect is the text you typed?</p>
                        <div className='flex flex-row'>
                            <select defaultValue="" placeholder="Plase select a canton" className='border-b bg-transparent border-slate-600 text-black px-4 py-2 mt-6 focus-within:outline-none focus-visible:outline-none' onChange={(e) => setUserCanton(e.target.value)}>
                                <option value="" disabled>Please select a canton</option>
                                {Object.entries(cantonal_coats_of_arms).map(([key, value]) => {
                                    if (value.name === name) { return null };
                                    return <option key={key} value={key}>{value.name}</option>
                                })}
                            </select>
                            {userCanton && <button className='w-fit border hover:opacity-50 transition-opacity border-slate-600 text-black px-4 py-2 rounded-xl mt-6 ml-4' onClick={submitUserCanton}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>

                                Confirm
                            </button>}
                        </div>
                    </div>}
                    {(userCanton && !userCantonVisible) && <div className='flex flex-col mt-6'>
                        <p className='text-xl font-medium mb-0'>Thank you for your feedback!</p>
                        <p className='text-lg font-medium mb-0'>We will use it to improve our model.</p>
                    </div>
                    }
                </>
            </div>
        </div>
    );
}

export default MainContent;  