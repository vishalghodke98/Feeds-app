import { BrowserRouter, Route, Link } from "react-router-dom";
import Todo from '../src/views/Todo';

const routes = [
    {
        path: '/homepage',
        component: Todo
    }
]

class Route extends Comment {
    render() {
        const routesComponets = routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />);
        return (
            <div>
                <BrowserRouter>
                    {routesComponets, () => console.log('route')}
                    <div />
                </BrowserRouter>
                <BrowserRouter>
                
                </BrowserRouter>
            </div>
        )
    }
}

export default Route;