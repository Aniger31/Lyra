import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

function useAsyncStorage(key, initialValue){
    const [value, setValue] = useState(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    //Primero Cargaremos el valor (asincrono)
    useEffect(() => {
        const loadStoredData = async () => {
            try{
                const item = await AsyncStorage.getItem(key);
                if (item !== null && item !== "undefined") {
                    setValue(JSON.parse(item));
                } else {
                    setValue(initialValue);
                }

            }catch(error){
                console.error("Error cargando AsyncStorage:", error);
            }finally{
                setIsLoaded(true); //Indica que la carga inicial terminó
            }
        };
        loadStoredData();
    }, [key]);

    // Guardamos el valor cuando cambie
    const setStorageValue = (newValue)=> {
        //se actualiza el estado de React inmediatamente
        setValue(newValue);
        if (newValue === undefined || newValue === null) {
            console.warn("AsyncStorage intentó guardar null/undefined. Operación cancelada.");
            return;
        }
        //se guarda el valor en el AsyncStorage
        AsyncStorage.setItem(key, JSON.stringify(newValue)).catch(error => console.error("Error guardando en AsyncStorage:",error));
    }

    return [value,setStorageValue,isLoaded];
}
export default useAsyncStorage;