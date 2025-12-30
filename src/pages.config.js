import Admin from './pages/Admin';
import Application from './pages/Application';
import Home from './pages/Home';
import PDFPreview from './pages/PDFPreview';
import employmentContract from './pages/employment-contract';
import fmHrd19 from './pages/fm-hrd-19';
import fmHrd27 from './pages/fm-hrd-27';
import pdpaForm from './pages/pdpa-form';
import userDashboard from './pages/user-dashboard';
import userLogin from './pages/user-login';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Application": Application,
    "Home": Home,
    "PDFPreview": PDFPreview,
    "employment-contract": employmentContract,
    "fm-hrd-19": fmHrd19,
    "fm-hrd-27": fmHrd27,
    "pdpa-form": pdpaForm,
    "user-dashboard": userDashboard,
    "user-login": userLogin,
}

export const pagesConfig = {
    mainPage: "Application",
    Pages: PAGES,
    Layout: __Layout,
};