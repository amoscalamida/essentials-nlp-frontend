import React, { useState } from 'react';

export const BlobsModern = ({ blobs, canvasPosition, animateBlobs }) => {


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
                x: blob.position.x - (direction.x * 0.01),
                y: blob.position.y - (direction.y * 0.01)
            }
        };
    }

    // 5. Update the blob position
    const updateBlobPosition = (blob, mousePosition) => {

        const direction = {
            // direction relative to center of window if position is center, else relative to top left
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

            window.addEventListener('mousemove', (event) => setMousePosition({ x: event.clientX, y: event.clientY }));
            return () => window.removeEventListener('mousemove', (event) => setMousePosition({ x: event.clientX, y: event.clientY }));
        }
    }, [animateBlobs]);

    return (
        <div className={`absolute w-full max-h-full flex -z-10 -mt-8 md:mt-0 blob-container ${animateBlobs === 'auto' ? 'animate-blobs-auto' : ''}`} style={{
            top: canvasPosition.offsetTop,
            left: canvasPosition.offsetLeft,
        }}>
            {awareBlobs.map((blob, index) => (<div
                key={index}
                id={"blob-" + index}
                className={`blob blur-xl relative flex-shrink rounded-full`}
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