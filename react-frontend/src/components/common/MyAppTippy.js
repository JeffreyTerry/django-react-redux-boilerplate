import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import './MyAppTippy.scss';

// A custom-styled tooltip component built on top of Tippy. See the Tippy docs for usage information.
const MyAppTippy = ({ children, theme, ...props }) => {
    return <Tippy
        theme={theme || 'myapp'}
        {...props}>
        {children}
    </Tippy>;
}

export default MyAppTippy;