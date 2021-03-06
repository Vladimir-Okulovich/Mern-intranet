import React, { useEffect, useState } from 'react';
import LoadingView from './components/Loading'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
// import { withRouter } from 'react-router-dom'
import { checkSubdomain } from './redux/actions'



const Wrapper = ({ subdomain, checkSubdomain, children }) => {

    const [ isRegister, setIsRegister ] = useState(null);

    useEffect(() => {
        
        let hostname = window.location.host;
        let pathname = window.location.pathname;
        let isRegister = (hostname === 'localhost:3000' && (pathname==='/register' ||pathname==='register'))
        // alert(pathname);
        let subdomainFromUrl = hostname.split('.')[0];
        if (isRegister) {
            setIsRegister(true);
        } else {
            setIsRegister(false);
            checkSubdomain(subdomainFromUrl);
        }
            
    }, []);
    console.log(isRegister)
    if(isRegister) {
        return (<React.Fragment>
            {children}
        </React.Fragment>)
    } else if( isRegister === false) {
        if (subdomain.isAvailableSubdomain === null) {
            return (
                <div>
                    <LoadingView />
                </div>
            )
        } else if ( subdomain.isAvailableSubdomain ) {
            return (<React.Fragment>
                {children}
            </React.Fragment>)
        } else {
            return (
                <div>404 error</div>
            );
        }
    } else {
        return (
            <div>
                <LoadingView />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    subdomain: state.subdomain
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ checkSubdomain }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)