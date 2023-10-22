import React, { useState } from 'react';
import { cantonal_coats_of_arms } from './resultResources';
import { BlobsModern } from './Blobs';
import axios from 'axios';

const codespaceContainer = "sturdy-space-invention-5vq9px9r969fvx7"
function MainContent() {
    // have the blobs in the background and then in the foreground switch between the input form / thinking / result
    const [input, setInput] = useState(true);
    const [thinking, setThinking] = useState(false);
    const [result, setResult] = useState(false);
    const [animateBlobs, setAnimateBlobs] = useState("none");
    const [resultProps, setResultProps] = useState({});
    const [userInput, setUserInput] = useState("");

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

        // sanitize user input
        const sanitizedInput = userInput.replace(/[^a-zA-Z ]/g, "").toLowerCase();
        userInput !== sanitizedInput && setUserInput(sanitizedInput);

        navigateTo('thinking');

        // send the user input to the backend using axios
        const axiosRequest = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        axiosRequest.post("https://" + codespaceContainer + "-5000.app.github.dev/model/predict", { "text": userInput })
            .then((response) => {
                console.log(response);

                const canton = response.data.canton;
                const certainty = response.data.certainty;

                const blobProps = cantonal_coats_of_arms[canton].blob_properties;
                setCurrentStatus({ status: "Completed", statusColor: "#0F8125" });

                setResultProps({
                    "design": cantonal_coats_of_arms[canton],
                    "certainty": certainty
                });
                setBlobProps(blobProps);
                navigateTo('result');

            }).onError((error) => {
                console.log(error);
                navigateTo('home');
            });


    }

    return (
        <div className='flex flex-col w-full z-0 relative'>
            {input && <InputForm userInput={userInput} setUserInput={setUserInput} />}
            {(userInput && !input) && <UserInputPreview userInput={userInput} currentStatus={currentStatus} />}
            {thinking && <Thinking input={userInput} />}
            {result && <Result resultProps={resultProps} input={userInput} />}
            {input && <div className='flex justify-end'>
                <button
                    className={`${userInput.length > 3 ? "opacity-100" : "opacity-0"} transition-opacity border border-slate-600 text-slate-600 px-4 py-2 rounded-xl mt-6`}
                    onClick={submitText}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    Ask the AI
                </button>
            </div>}
            <BlobsModern blobs={blobProps} canvasPosition={canvasPosition} animateBlobs={animateBlobs} />
        </div>
    );

}

function UserInputPreview({ userInput, currentStatus }) {

    const { status, statusColor } = currentStatus || {};

    return (
        <div className="h-24">
            <p className="text-lg font-medium">Your Input <span className='ml-3 border rounded-full font-normal px-3 text-sm leading-3' style={{ color: statusColor, borderColor: statusColor }}>{status}</span></p>
            <div className='mt-2 py-3 border-b border-t border-slate-600 p-0 bg-transparent text-light text-lg'>
                {userInput}
            </div>
        </div>
    );
}

function InputForm({ userInput, setUserInput }) {

    return (
        <div className='flex flex-col w-full sm:pl-12 md:pl-56 pt-20 sm:pt-40'>
            <p className='text-2xl font-medium mb-0'>Tell us how you talk</p>
            <p className='mb-6 text-xl font-medium'>Our AI will predict which dialect you speak</p>
            <div contentEditable onInput={(e) => setUserInput(e.target.innerText)} className='border-b border-slate-600 py-2 bg-transparent focus-visible:border-b-2 focus-visible:outline-none text-light text-xl md:text-2xl h-auto' >
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

function Result({ resultProps }) {
    const { design, certainty } = resultProps;
    const { name, svg, main_color, blob_properties } = design || {};

    // add a fade in to the svg after the blob animation is done

    setTimeout(() => {
        const svg = document.getElementById("canton-image");
        svg.style.opacity = 1;
    }, 800);

    return (
        <div className='flex flex-col gap-y-6 md:flex-row w-full pl-0 md:pl-10 md:pt-28 pt-24'>
            <div className='flex justify-center'>
                <div className='w-1/2'>
                    <img src={svg} alt={name} className='transition-opacity ease-in-out opacity-0 duration-500' id='canton-image' />
                </div>
            </div>
            <div className='flex flex-col w-full text-center md:text-left'>
                <p className='text-xl font-medium  mb-0'>We are {Math.round(certainty * 100)}% certain, that you are speaking</p>
                <p className='text-4xl font-medium' style={{ color: main_color }}>{name} dialect</p>
            </div>
        </div>
    );
}

export default MainContent;  