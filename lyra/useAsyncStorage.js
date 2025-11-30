import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar valores desde AsyncStorage
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const item = await AsyncStorage.getItem(key);

        if (item && item !== "undefined") {
          setValue(JSON.parse(item));
        } else if (!Array.isArray(value)) {
          setValue(initialValue);
        }
      } catch (error) {
        console.error("Error cargando AsyncStorage:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadStoredData();
  }, [key]);

  // Guardar valores (ahora soporta función actualizadora)
  const setStorageValue = (newValueOrUpdater) => {
    // Usamos setValue con callback para garantizar la versión correcta de prev
    setValue((prev) => {
      // Obtener el siguiente valor real: si nos pasan función, ejecutarla con prev
      const nextRaw =
        typeof newValueOrUpdater === "function"
          ? newValueOrUpdater(prev)
          : newValueOrUpdater;

      const safeValue = Array.isArray(nextRaw) ? nextRaw : [];

      AsyncStorage.setItem(key, JSON.stringify(safeValue)).catch((error) =>
        console.error("Error guardando en AsyncStorage:", error)
      );

      return safeValue;
    });
  };

  return [value, setStorageValue, isLoaded];
}

export default useAsyncStorage;
