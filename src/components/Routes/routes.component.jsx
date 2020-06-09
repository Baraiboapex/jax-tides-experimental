import React from 'react'

import {ReactComponent as Logo} from '../../assets/jax_tides.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'

import PageNavBar from '../PageComponents/page-navbar/page-navbar.component';
import TidePage from '../../pages/tide-page/tide-page.component';
import WindPage from '../../pages/wind-speeds-page/wind-speeds-page.component';
import WaterTempPage from '../../pages/water-temp-page/water-temp-page.component';

export default function JTRouter(){
    return(
        <Router>
            <br/>
            <PageNavBar 
                brandName="JaxTides"
                logo={<Logo className="jax-tides-logo"/>}
                render={(navExpanded, closeNav) => (
                    <React.Fragment>
                        <div className="link p-1"><Link to ="/" onClick={()=>(navExpanded ? closeNav() : null)}><i className="fas fa-water">&nbsp;</i>Tides</Link></div>
                        <div className="link p-1"><Link to ="/watertemp" onClick={()=>(navExpanded ? closeNav() : null)}><i className="fas fa-thermometer-three-quarters"></i>&nbsp;Water Temp</Link></div>
                        <div className="link p-1"><Link to ="/windspeeds" onClick={()=>(navExpanded ? closeNav() : null)}><i className="fas fa-wind"></i>&nbsp;Wind Speeds</Link></div>
                    </React.Fragment>
                )}
            />
            <br/>
            <Switch>
                <Route exact path="/">
                    <TidePage/>
                </Route>
                <Route exact path="/watertemp">
                    <WaterTempPage/>
                </Route>
                <Route exact path="/windspeeds">
                    <WindPage/>
                </Route>
            </Switch>
        </Router>
    );
}