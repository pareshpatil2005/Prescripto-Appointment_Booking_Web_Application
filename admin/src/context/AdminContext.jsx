import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const [doctors, setDoctors] = useState([]);

  const [ appointments, setAppointments ] = useState([]);

  const [ dashData, setDashData ] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/all-doctors`,
        {},
        {
          headers: {
            atoken: aToken, // Send the token using the correct field name expected by backend
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
        // console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  // api to change the availability

  const changeAvailability = async (docId) => {
    try {
      
      const { data } = await axios.post(
        `${backendUrl}/api/admin/change-availability`,
        {docId},
        {
          headers: {
            atoken: aToken, // Send the token using the correct field name expected by backend
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }


    } catch (error) {
      toast.error(error.message);
    }
  }


  // api call to get all appointments

  const getAllAppointments = async () => {
    try {

      const { data } = await axios.get(
        `${backendUrl}/api/admin/appointments`,
        {
          headers: {
            atoken: aToken, // Send the token using the correct field name expected by backend
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }

      
    } catch (error) {
      toast.error(error.message);
    }
  }


  // API call to cancel the appointment

  const appointmentCancel = async (appointmentId) => {
    try {
      
      const { data } = await axios.post(
        `${backendUrl}/api/admin/cancel-appointment`,
        {appointmentId},
        {
          headers: {
            atoken: aToken, // Send the token using the correct field name expected by backend
          },
      });

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }

    } catch (error) {
       toast.error(error.message);
    }
  }



  // API to get the dashboard data

  const getDashData = async () => {
    try {

      const { data } = await axios.get(
        `${backendUrl}/api/admin/dashboard`,
        {
          headers: {
            atoken: aToken, // Send the token using the correct field name expected by backend
          },
        }
      );

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }



  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    appointmentCancel,
    dashData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
