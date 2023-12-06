import firestore from '@react-native-firebase/firestore';
import { ICondominium } from '../types/condominium/condominium';




const getAllData = async (idcompany: string = "") => {
    try {
        console.log("XDDD")
        const dataRef = firestore().collection("Condominiums");
        //    const queryResult = dataRef.where("idcompany", "==", idcompany);
        //const querySnapshot = await queryResult.get();
        const querySnapshot = await dataRef.get();
        const data = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as ICondominium),
            id: doc.id,
        }));
        return data;
    } catch (error: any) {
        console.error("Error al traer data:", error);
        throw new Error("No se pudo traer la data");
    }
};

const getData = async (id: string) => {
    const docRef = firestore().collection("Condominiums").doc(id);
    const docSnap = await docRef.get();
    const data = {
        ...(docSnap.data() as ICondominium),
        id: docSnap.id,
    } as ICondominium;
    return data;
};

const insertData = async (data: ICondominium) => {
    try {
        const doc = await firestore().collection("Condominiums").add(data);
        return doc.id;
    } catch (error: any) {
        console.error("Error al insertar:", error);
        throw new Error("No se pudo insertar");
    }
};

const deleteData = async (id: string) => {
    try {
        const docRef = firestore().collection("Condominiums").doc(id);
        await docRef.delete();
    } catch (error: any) {
        console.error("Error al eliminar:", error);
        throw new Error("No se pudo eliminar");
    }
};

const updateData = async (data: ICondominium) => {
    try {
        const id = data.id;
        delete data.id;
        const docRef = firestore().collection("Condominiums").doc(id);
        await docRef.update(data as any);
    } catch (error: any) {
        console.error("Error al actualizar", error);
        throw new Error("No se pudo actualizar");
    }
};


export default {
    getAllData,
    getData,
    insertData,
    updateData,
    deleteData,
};
