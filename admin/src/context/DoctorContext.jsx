import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");

    const [appointments, setAppointments] = useState([]);

    const [dashData, setDashData] = useState(false);

    const [profileData, setProfileData] = useState(false);


    // API call to get appointments on the doctor panel

    const getAppointments = async () => {
        try {
          const { data } = await axios.get(
            `${backendUrl}/api/doctor/appointments`,
            {
              headers: {
                dtoken: dToken, // Send the token using the correct field name expected by backend
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
            console.log(error);
            toast.error(error.message);
        }
    }


    // api to marked the appointment as completed 

    const completeAppointment = async (appointmentId) => {
      try {
      
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/complete-appointment`,
          {appointmentId},
          {
            headers: {
              dtoken: dToken, // Send the token using the correct field name expected by backend
            },
          }
        );

        if (data.success) {
          toast.success(data.message);
          getAppointments();

        } else {
          toast.error(data.message);
        }

      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
    }


    // api to cancel the appointment for doctor panel

    const cancelAppointment = async (appointmentId) => {
      try {
      
        const { data } = await axios.post(
          `${backendUrl}/api/doctor/cancel-appointment`,
          {appointmentId},
          {
            headers: {
              dtoken: dToken, // Send the token using the correct field name expected by backend
            },
          }
        );

        if (data.success) {
          toast.success(data.message);
          getAppointments();

        } else {
          toast.error(data.message);
        }

      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
    }



    // API to get the dashboard for the doctor panel

    const getDashData = async () => {
      try {

        const { data } = await axios.get(
          `${backendUrl}/api/doctor/dashboard`,
          {
            headers: {
              dtoken: dToken, // Send the token using the correct field name expected by backend
            },
          }
        )

        if (data.success) {
          setDashData(data.dashData);
          console.log(data.dashData);
        } else {
          toast.error(data.message);
        }

        
      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
    }

    // API to get the doctor profile

    const getProfileData = async () => {
      try {

        const { data } = await axios.get(
          `${backendUrl}/api/doctor/profile`,
          {
            headers: {
              dtoken: dToken, // Send the token using the correct field name expected by backend
            },
          }
        )

        if (data.success) {
          setProfileData(data.profileData);
          // console.log(data.profileData);

        } else {
          toast.error(data.message);
        }

        
      } catch (error) {
          console.log(error);
          toast.error(error.message);
      }
    }


    const value = {
        dToken, 
        setDToken, 
        backendUrl, 
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        dashData,
        setDashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;