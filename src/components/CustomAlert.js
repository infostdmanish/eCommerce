import React from 'react';
import { Alert} from 'react-bootstrap';

function CustomAlert(props) {
    return (
        (props.alertMsg)?
        <Alert className={`alert alert-${props.alertMsg.type} alert-dismissible fade show`} style={{ zIndex:1, position: 'absolute', top: '50px', right: '0px' }}  >
            {props.alertMsg.msg}
        </Alert>:''
    
        
    )
}

export default CustomAlert;