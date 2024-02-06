import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000/";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}cities`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("There was a loading error...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);


  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}cities/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setCurrentCity(data);
    } catch (error) {
      console.error("There was an error creating city:", error);
    } finally {
      setIsLoading(false);
    }
  }

 async function createCity(newCity) {
   try {
     setIsLoading(true);
     const res = await fetch(`${BASE_URL}cities`, {
       method: "POST",
       body: JSON.stringify(newCity),
       headers: { "Content-Type": "application/json" },
     });

     if (!res.ok) {
       throw new Error(`HTTP error! Status: ${res.status}`);
     }

     const data = await res.json();
     setCities((cities) => [...cities, data]);
   } catch (error) {
     console.error("Error fetching data:", error);
   } finally {
     setIsLoading(false);
   }
 }

 async function deleteCity(id) {
   try {
     setIsLoading(true);
     await fetch(`${BASE_URL}cities/${id}`, {
       method: "delete",
     });

     setCities((cities) => cities.filter((city) => city.id !== id));
   } catch (error) {
     console.error("There was an error delelting city:", error);
   } finally {
     setIsLoading(false);
   }
 }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity,createCity ,deleteCity}}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("Cities Context was used outside the CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
