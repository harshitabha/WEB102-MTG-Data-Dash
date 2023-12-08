import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from "./Home";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;