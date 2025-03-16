import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";

const useDatabase = () => {
    const [error, setError] = useState<string | null>(null);

    const saveData = async (path: string, data: Record<string, any>) => {
        setError(null);
        try {
            const db = getDatabase();
            await set(ref(db, path), data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return { saveData, error };
};

export default useDatabase;
