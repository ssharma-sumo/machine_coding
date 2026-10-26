import React from 'react';
import './simpleModal.css';


const Modal = (props) => { 
    const { title, content, onClose, isVisible } = props
    if (!isVisible) { 
        return null;
    }
    return (
        <div className='backdrop' onClick={onClose} >
            <div className='wrapper'>
                <div className='content'>
                    <div className="header">
                        <div>
                            { title }
                        </div>
                        <div onClick={onClose}>
                            X
                        </div>
                    </div>
                    <div className='body'>
                        { content }
                    </div>
                </div>
            </div>
        </div>
    )
}

export const SimpleModal = () => { 
    const [show, setShow] = React.useState(false);


    return (
        <div>
            <button onClick={() => { setShow(true) }}>
                Show Modal
            </button>
            <Modal
                isVisible={show}
                content={"this is modal"}
                title="this is title"
                onClose={() => { setShow(false) }}
            />
        </div>
    )
}