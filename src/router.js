import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Admin from './admin'
import App from './App'
import Login from './pages/login'
import Home from './pages/home'
import Button from './pages/ui/button'
import Nomatch from './pages/Nomatch'
import Modal from './pages/ui/modal'
import Loading from './pages/ui/loading'
import Notification from './pages/ui/notification'
import Message from './pages/ui/message'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import Register from './pages/form/register'
import Basic from './pages/table/basic'
import High from './pages/table/high'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/details'
import Preview from './pages/preview'
import Tree from './pages/table/tree'
import User from './pages/user'
import Rich from './pages/rich'
import Permission from './pages/permission'
import Line from './pages/echarts/line'
import Pie from './pages/echarts/pie'
import Bar from './pages/echarts/bar'

export default class IRouter extends React.Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/common" render={()=>
                           <Common>
                               <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                           </Common>
                            } />
                       <Route path="/" render={() =>
                           <Admin>
                           <Switch>
                               <Route path="/home" component={Home} />
                               <Route path="/ui/buttons" component={Button} />
                               <Route path="/ui/modals" component={Modal} />
                               <Route path="/ui/loadings" component={Loading} />
                               <Route path="/ui/notification" component={Notification} />                                
                               <Route path="/ui/messages" component={Message} />
                               <Route path="/ui/tabs" component={Tab} />                                
                               <Route path="/ui/gallery" component={Gallery} />   
                               <Route path="/ui/carousel" component={Carousel} />  
                               <Route path="/charts/pie" component={Pie} />
                               <Route path="/charts/bar" component={Bar} />  
                               <Route path="/charts/line" component={Line} />  
                               <Route path="/form/login" component={FormLogin} />   
                               <Route path="/form/reg" component={Register} />   
                               <Route path="/table/basic" component={Basic} />  
                               <Route path="/table/tree" component={Tree} />   
                               <Route path="/table/high" component={High} />
                               <Route path="/city" component={City} />
                               <Route path="/order" component={Order} />
                               <Route path="/preview" component={Preview} />
                               <Route path="/user" component={User} />                               
                               <Route path="/rich" component={Rich} />                                                               
                               <Route path="/permission" component={Permission} />                                                                                               
                               <Redirect to="/home" />
                                <Route component={Nomatch}/>
                               </Switch>
                           </Admin>
                       } />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}