import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const CommonsContext = React.createContext(null);

export const withCommons = Component => props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <CommonsContext.Consumer>
            { () => <Component {...props} fullScreen={fullScreen} /> }
        </CommonsContext.Consumer>
    );
};

export default CommonsContext;