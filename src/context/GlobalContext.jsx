
import { useState, useContext, createContext, useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [historias, setHistorias] = useState([]) //ME GUARDO EL JSON ENTERO PARA HACER LAS CARTAS
    const [dataHistoria, setDataHistoria ] = useState()

    const actualizarHistoria = async (dataHistoria) => {
        try {
            const response = await fetch(`https://json-server-seven-gilt.vercel.app/historias/${dataHistoria.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataHistoria)
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`)
            }
    
            const data = await response.json()
            console.log('Historia actualizada:', data)
    
            await obtenerHistoria();
        } catch (error) {
            console.error('Error actualizando la historia:', error)
        }
    }

    const obtenerHistoria = async () => {
        try {
            const response = await fetch('https://json-server-seven-gilt.vercel.app/historias', { method: 'GET' });
            const data = await response.json();
            
            if (Array.isArray(data)) {
                setHistorias(data);
            } else {
                console.error('Data is not an array:', data);
            }
    
            console.log('DataGet: ', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const borrarHistoria = async (id) => {
        try {
            const response = await fetch(`https://json-server-seven-gilt.vercel.app/historias/${id}`, { method: 'DELETE' });
            
            if (!response.ok) {
                throw new Error('Error al borrar la historia');
            }
              
            setHistorias(prevHistorias => prevHistorias.filter(historia => historia.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const anadirHistoria = async ()  =>{
        try {
            const response = await fetch(`https://json-server-seven-gilt.vercel.app/historias`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataHistoria)
            });
            
            if (response.ok) {
                const data = await response.json();
                setHistorias(prevHistorias => [...prevHistorias, data]);
                console.log('Historia añadida:', data);
            } else {
                console.error('Error al borrar la historia');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <GlobalContext.Provider value={{ historias, setHistorias, dataHistoria, setDataHistoria,
                                        actualizarHistoria, obtenerHistoria, borrarHistoria, anadirHistoria}}>
            {children}
        </GlobalContext.Provider>
    )    
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}
