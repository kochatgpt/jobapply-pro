import Admin from './pages/Admin';
import Application from './pages/Application';
import Home from './pages/Home';
import PDFPreview from './pages/PDFPreview';
import UserDashboard from './pages/UserDashboard';
import UserLogin from './pages/UserLogin';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Application": Application,
    "Home": Home,
    "PDFPreview": PDFPreview,
    "UserDashboard": UserDashboard,
    "UserLogin": UserLogin,
}

export const pagesConfig = {
    mainPage: "Application",
    Pages: PAGES,
    Layout: __Layout,
};