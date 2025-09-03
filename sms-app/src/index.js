import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Pages
import ErrorPage from './pages/ErrorPage';
import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
// Components
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import DashboardContentOverview from './components/DashboardContentOverview';
import DashboardContentSetting from './components/DashboardContentSetting';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { store } from './state/store'
import { Provider } from 'react-redux'
import DashboardContentManageMedia from './components/DashboardContentManageMedia';
import DashboardContentManageMediaCreate from './components/DashboardContentManageMediaCreate';
import DashboardContentAccounts from './components/DashboardContentAccounts';
import DashboardContentWorkers from './components/DashboardContentWorkers';
import DashboardContentClasses from './components/DashboardContentClasses';
import DashboardContentReports from './components/DashboardContentReports';
import DashboardContentMessage from './components/DashboardContentMessage';
import DashboardContentNotes from './components/dashboardContentNotes';
import DashboardContentFinancialAccounts from './components/DashboardContentFinancialAccounts';
import DashboardContentFinancialReceipts from './components/DashboardContentFinancialReceipts';
import DashboardContentTeachers from './components/DashboardContentTeachers';
import DashboardContentCalc from './components/DashboardContentCalc';
import DashboardContentCamera from './components/DashboardContentCamera';
import DashboardContentPosts from './components/DashboardContentPosts';
import DashboardContentShowAccount from './components/DashboardContentShowAccount';
import DashboardContentShowReport from './components/DashboardContentShowReport';
import HomeContentOverview from './components/HomeContentOverview';
import HomeContentPosts from './components/HomeContentPosts';
import HomeContentMessages from './components/HomeContentMessages';
import HomeContentSetting from './components/HomeContentSetting';
import HomeContentCreateReport from './components/HomeContentCreateReport';
import HomeContentStudentClass from './components/HomeContentStudentClass';
import HomeContentStudentSubjects from './components/HomeContentStudentSubjects';
import HomeContentStudentClassRoom from './components/HomeContentStudentSubjectRoom';
import HomeContentCreateExam from './components/HomeContentCreateExam';
import DashboardContentExams from './components/DashboardContentExams';
import HomeContentCreateNote from './components/HomeContentCreateNote';
import HomeContentClassExam from './components/HomeContentClassExam';
import DashboardContentExamSolutions from './components/DashboardContentExamSolutions';
import DashboardContentShowExamSol from './components/DashboardContentShowExamSol';
import DashboardContentGrades from './components/DashboardContentGrades';
import HomeContentShowGrades from './components/HomeContentShowGrades';
import HomeContentParentGrades from './components/HomeContentParentGrades';
import DashboardContentAccountsCreate from './components/DashboardContentAccountsCreate';
import DashboardContentWorkersCreate from './components/DashboardContentWorkersCreate';
import DashboardContentTeachersCreate from './components/DashboardContentTeacherCreate';
import DashboardContentFinancialAccountsCreate from './components/DashboardContentFinancialAccountsCreate';
import DashboardContentFinancialReceiptsCreate from './components/DashboardContentFinancialReceiptsCreate';
import DashboardContentClassesCreate from './components/DashboardContentClassesCreate';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <HomeContentOverview/>},
      {path: "/home/overview", element: <HomeContentOverview/>},
      {path: "/home/posts", element: <HomeContentPosts/>},
      {path: "/home/messages", element: <HomeContentMessages/>},
      {path: "/home/account_setting", element: <HomeContentSetting/>},
      {path: "/home/create_report", element: <HomeContentCreateReport/>},
      {path: "/home/create_exam", element: <HomeContentCreateExam/>},
      {path: "/home/create_note", element: <HomeContentCreateNote/>},
      {path: "/home/class_exam", element: <HomeContentClassExam/>},
      {path: "/home/grades", element: <HomeContentShowGrades/>},
      {path: "/home/my_student_grades", element: <HomeContentParentGrades/>},
      {
      path: "/home/student_class",
      element: <HomeContentStudentClass/>,
      children: [
        {index: true, element: <HomeContentStudentSubjects/>},
        {path: "/home/student_class/room", element: <HomeContentStudentClassRoom />},
      ]
      }
    ]
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
    children: [
      {index: true, element: <DashboardContentOverview />},
      {path: "/dashboard/overview", element: <DashboardContentOverview />},
      {path: "/dashboard/setting", element: <DashboardContentSetting />},
      {path: "/dashboard/manage_media", element: <DashboardContentManageMedia />},
      {path: "/dashboard/manage_media/create_post", element: <DashboardContentManageMediaCreate />},
      {path: "/dashboard/accounts", element: <DashboardContentAccounts />},
      {path: "/dashboard/accounts/create_account", element: <DashboardContentAccountsCreate />},
      {path: "/dashboard/workers", element: <DashboardContentWorkers />},
      {path: "/dashboard/workers/create_worker", element: <DashboardContentWorkersCreate />},
      {path: "/dashboard/classes", element: <DashboardContentClasses />},
      {path: "/dashboard/classes/create", element: <DashboardContentClassesCreate />},
      {path: "/dashboard/reports", element: <DashboardContentReports />},
      {path: "/dashboard/message", element: <DashboardContentMessage />},
      {path: "/dashboard/notes", element: <DashboardContentNotes/>},
      {path: "/dashboard/financial_accounts", element: <DashboardContentFinancialAccounts/>},
      {path: "/dashboard/financial_accounts/create", element: <DashboardContentFinancialAccountsCreate/>},
      {path: "/dashboard/financial_receipts", element: <DashboardContentFinancialReceipts/>},
      {path: "/dashboard/financial_receipts/create", element: <DashboardContentFinancialReceiptsCreate/>},
      {path: "/dashboard/teachers", element: <DashboardContentTeachers/>},
      {path: "/dashboard/teachers/create_teacher", element: <DashboardContentTeachersCreate/>},
      {path: "/dashboard/calculator", element: <DashboardContentCalc/>},
      {path: "/dashboard/camera", element: <DashboardContentCamera/>},
      {path: "/dashboard/posts", element: <DashboardContentPosts/>},
      {path: "/dashboard/accounts/show", element: <DashboardContentShowAccount/>},
      {path: "/dashboard/reports/show", element: <DashboardContentShowReport/>},
      {path: "/dashboard/all_exams", element: <DashboardContentExams/>},
      {path: "/dashboard/exam_solutions", element: <DashboardContentExamSolutions/>},
      {path: "/dashboard/show_exam_solution", element: <DashboardContentShowExamSol/>},
      {path: "/dashboard/grades", element: <DashboardContentGrades/>},
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
