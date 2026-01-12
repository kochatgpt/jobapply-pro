import Admin from './pages/Admin';
import Application from './pages/Application';
import Home from './pages/Home';
import PDFPreview from './pages/PDFPreview';
import criminalCheckForm from './pages/criminal-check-form';
import employmentContract from './pages/employment-contract';
import insuranceEnrollment from './pages/insurance-enrollment';
import pdpaForm from './pages/pdpa-form';
import spsForm from './pages/sps-form';
import userDashboard from './pages/user-dashboard';
import userLogin from './pages/user-login';
import fmHrd19 from './pages/fm-hrd-19';
import fmHrd30 from './pages/fm-hrd-30';
import fmHrd27 from './pages/fm-hrd-27';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Admin": Admin,
    "Application": Application,
    "Home": Home,
    "PDFPreview": PDFPreview,
    "criminal-check-form": criminalCheckForm,
    "employment-contract": employmentContract,
    "insurance-enrollment": insuranceEnrollment,
    "pdpa-form": pdpaForm,
    "sps-form": spsForm,
    "user-dashboard": userDashboard,
    "user-login": userLogin,
    "fm-hrd-19": fmHrd19,
    "fm-hrd-30": fmHrd30,
    "fm-hrd-27": fmHrd27,
}

export const pagesConfig = {
    mainPage: "Application",
    Pages: PAGES,
    Layout: __Layout,
};