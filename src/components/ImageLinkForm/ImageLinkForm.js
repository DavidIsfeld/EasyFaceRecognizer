import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit, onClearInput}) => {
    const clearLocalInput = () => {
        const inputField = document.getElementById('identifyForClear');
        inputField.value = '';
    }

    return (
        <div>
            <p className='f3'>
                {'This website will detect faces in your pictures. Give it a try by pasting in a link to an image!'}
            </p>
            <p className='f3'>
                {'Please make sure that the links end in an image format (.jpg, .png etc) as otherwise it may not work.'}
            </p>
            <p className='f3'>
                {'If using google images the way to do this is often to select images first before right clicking on them to get the link.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type="text" className='f4 pa2 w-70 center' id='identifyForClear' onChange={onInputChange} />
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={onButtonSubmit}
                    >
                        Detect
                    </button>
                    <button
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                        onClick={clearLocalInput}
                    >
                        Clear Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;