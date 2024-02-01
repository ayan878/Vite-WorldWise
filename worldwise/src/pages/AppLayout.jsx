import styles from './AppLayout.module.css'
import SideBar from "../components/SideBar";
import Map from '../components/Map';
import { Outlet } from 'react-router-dom';
function AppLayout() {
  return <div className={styles.app}>
    <SideBar/>
    <Outlet/>
    <Map/>
  </div>;
}

export default AppLayout;
