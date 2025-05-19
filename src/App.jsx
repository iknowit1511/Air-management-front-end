import { Routes, Route } from 'react-router-dom';
import RegisterPage from './components/auth/registerPage';
import LoginPage from './components/auth/loginPage';
import Navbar from './components/common/navbar';
import HomePage from './components/home/home';
import ProfilePage from './components/profile/profilePage';
import EditProfile from './components/profile/editProfilePage';
import SearchFlight from './components/booking/searchflight';
import AdminPage from './components/admin/adminPage';
import ManageUser from './components/admin/manageUser';
import ManageFlight from './components/admin/manageFlight';
import './index.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/search-flights" element={<SearchFlight />} />



          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<ManageUser />} />
          <Route path="/admin/flights" element={<ManageFlight />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;