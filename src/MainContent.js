import React, { useState } from 'react';

function MainContent() {
    // have the blobs in the background and then in the foreground switch between the input form / thinking / result
    const [input, setInput] = useState(true);
    const [thinking, setThinking] = useState(false);
    const [result, setResult] = useState(false);
    const [animateBlobs, setAnimateBlobs] = useState("none");

    // Zurich Blue # 0F05A0
    const defaultBlobProps = [
        { color: '#ffa801', position: { x: 40, y: 80 }, size: 100 }, // orange
        { color: '#0fbcf9', position: { x: -20, y: 10 }, size: 150 }, // blue
    ];

    const defaultCanvasPosition = { position: "left", offsetTop: 100, offsetLeft: 0 };

    const [blobProps, setBlobProps] = useState(defaultBlobProps);
    const [canvasPosition, setCanvasPosition] = useState(defaultCanvasPosition);

    // change the blob props and canvas position based on the state of the app
    React.useEffect(() => {
        if (input) {
            setBlobProps(defaultBlobProps);
            setCanvasPosition(defaultCanvasPosition);
            setAnimateBlobs("mouse");
        } else if (thinking) {
            setBlobProps([
                { color: '#0fbcf9', position: { x: 0, y: 0 }, size: 250 }, // blue
                { color: '#ffa801', position: { x: 0, y: 0 }, size: 100 }, // orange
            ]);
            setCanvasPosition({ position: "center", offsetTop: 0, offsetLeft: -100 });
            setAnimateBlobs("auto");
        } else if (result) {
            setBlobProps([
                { color: '#FFFFFF', position: { x: 40, y: 80 }, size: 150 }, // white
                { color: '#0F05A0BB', position: { x: -20, y: 10 }, size: 150 }, // blue
            ]);
            setCanvasPosition(defaultCanvasPosition);
            setAnimateBlobs("none");
        }
    }, [input, thinking, result]);

    return (
        <div className='flex flex-col w-full z-0 relative'>
            {input && <InputForm />}
            {thinking && <Thinking />}
            {result && <Result />}
            <div className='flex justify-end'>
                <button className='bg-slate-600 text-white px-4 py-2 rounded-lg mt-6' onClick={() => {
                    setInput(false);
                    setThinking(true);
                    setTimeout(() => {
                        setThinking(false);
                        setResult(true);
                    }, 3000);
                }}>Submit</button>
            </div>
            <BlobsModern blobs={blobProps} canvasPosition={canvasPosition} animateBlobs={animateBlobs} />
        </div>
    );

}

const BlobsModern = ({ blobs, canvasPosition, animateBlobs }) => {


    // reset blob positions when blobs change
    React.useEffect(() => {
        setBlobProps(blobs);
    }, [blobs]);

    const [awareBlobs, setBlobProps] = useState(blobs);

    // animate blobs can have three values: none, auto, mouse
    // none: no animation
    // auto: blobs animate randomly
    // mouse: blobs animate based on mouse position

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const moveBlobs = (blob, direction) => {
        return {
            ...blob,
            position: {
                x: blob.position.x - (direction.x * 0.1),
                y: blob.position.y - (direction.y * 0.1)
            }
        };
    }

    // 5. Update the blob position
    const updateBlobPosition = (blob, mousePosition) => {

        const direction = {
            // direction relative to center of window
            x: window.innerWidth / 2 - mousePosition.x,
            y: window.innerHeight / 2 - mousePosition.y
        };
        return moveBlobs(blob, direction);
    }

    // 7. Update the blob positions
    const updateBlobPositions = (awareBlobs, mousePosition) => {
        return awareBlobs.map(blob => updateBlobPosition(blob, mousePosition));
    }

    React.useEffect(() => {
        if (animateBlobs === 'mouse') {
            setBlobProps(updateBlobPositions(awareBlobs, mousePosition));
        }
    }, [mousePosition]);

    // 9. Update the blob positions on mouse move
    React.useEffect(() => {
        if (animateBlobs === 'mouse') {
            // make the mouse move smoother (less updates)

            const updateMousePositionDebounced = debounce((event) => setMousePosition({ x: event.clientX, y: event.clientY }), 500);
            window.addEventListener('mousemove', updateMousePositionDebounced);
            return () => window.removeEventListener('mousemove', updateMousePositionDebounced);
        }
    }, [animateBlobs]);

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    return (
        <div className={`absolute w-full max-h-full -z-10 blob-container ${animateBlobs === 'auto' ? 'animate-blobs-auto' : ''}`} style={{
            top: canvasPosition.offsetTop,
            left: canvasPosition.offsetLeft,
        }}>
            {awareBlobs.map((blob, index) => (<div
                key={index}
                className={`blob blur-xl inline-block relative rounded-full`}
                style={{
                    width: `${blob.size}px`,
                    height: `${blob.size}px`,
                    backgroundColor: blob.color || '#ffa801', // Default color
                    transitionDelay: `${index * 0.2}s`, // Delay each blob's animation

                    // position as offset from center if position is center, else position it left
                    left: canvasPosition.position === 'center' ? `calc(50% - ${blob.position.x}px)` : `calc(10px + ${blob.position.x}px)`,
                    top: canvasPosition.position === 'center' ? `calc(50% - ${blob.position.y}px)` : `calc(10px + ${blob.position.y}px)`,
                }}></div>))}
        </div>
    );

};

function InputForm() {

    return (
        <div className='flex flex-col w-full sm:pl-12 md:pl-56 pt-20 sm:pt-40'>
            <p className='text-2xl font-medium mb-0'>Tell us how you talk</p>
            <p className='mb-6 text-xl font-medium'>Our AI will predict which dialect you speak</p>
            <textarea className='border-b border-slate-600 p-2 bg-transparent focus-visible:border-b-2 focus-visible:outline-none' />
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

function Result() {
    return (
        <div className='flex flex-col w-full sm:pl-40 md:pl-80 md:pt-36 sm:pt-72'>
            <p className='text-xl font-medium  mb-0'>We are 76% certain, that you are speaking</p>
            <p className='text-4xl font-medium text-blue-500'>Zurich dialect</p>
        </div>
    );
}

export default MainContent;  