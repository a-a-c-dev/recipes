import React from 'react';
import ErrorIcon from '../assets/error-icon.svg'

export const Error =React.memo(({err}) => {
    return (
        <div className="error">
            <div className="icon-container"><img src={ErrorIcon} alt="error"/></div>
            <h3 role="error-header">{err}</h3>
      </div>
    )
})