import { createContext, useEffect, useState } from "react";
import axios from "axios";    // axios used to call api
import {toast} from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    
  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [ doctors, setDoctors] = useState([]);

  const [ token, setToken ] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);  // state variable for token

  const [ userData, setUserData ] = useState(false);


  // api to get doctors data

  const getDoctorsData = async () => {
    try {
      
      const { data } = await axios.get( `${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  // api to get the user data and sve it in the setUserData state variable

  const loadUserProfileData = async () => {
    try {

      const { data } = await axios.get(
        `${backendUrl}/api/user/my-profile`,
        {
          headers: {
            token
          },
        }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }



  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };


  useEffect(() => {
    getDoctorsData();
  },[])


  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  },[token])


  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
