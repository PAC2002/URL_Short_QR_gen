import React from 'react';

function Button({ clicked, title }) {
    return (<>
        <button type='submit' className='Butn' onClick={clicked}>{title}</button>
    </>)
}
export default Button;