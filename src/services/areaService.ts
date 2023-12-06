import firestore from '@react-native-firebase/firestore';
import { IArea } from '../types/area/area';


const getAllData = async () => {
    const dataRef = firestore().collection("Area");
    const querySnapshot = await dataRef.get();
    const data = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as IArea),
        id: doc.id,
    }));

    return data;
};

const getData = async (id: string) => {
    const docRef = firestore().collection("Area").doc(id);
    const docSnap = await docRef.get();
    const data = { ...(docSnap.data() as IArea), id: docSnap.id } as IArea;
    return data;
};

type GetDataQueryParams = {
    idcondominium: string;
    q?: string;
    limitResults?: number;
};

const getDataQuery = async ({
    idcondominium,
    q,
    limitResults,
}: GetDataQueryParams = { idcondominium: "" }) => {
    try {
        let queryRef = firestore().collection("Area").where("idcondominium", "==", idcondominium);

        if (q) {
            queryRef = queryRef.orderBy('name').startAt(q).endAt(q + '\uf8ff');
        }

        if (limitResults) {
            queryRef = queryRef.limit(limitResults);
        }

        const querySnapshot = await queryRef.get();
        const data: IArea[] = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as IArea),
            id: doc.id,
        }));

        return data;
    } catch (e) {
        console.log(e);
    }
};

const insertData = async (data: IArea) => {
    await firestore().collection("Area").add(data);
    return true;
};

const deleteData = async (id: string) => {
    try {
        const docRef = firestore().collection("Area").doc(id);
        await docRef.delete();
    } catch (error: any) {
        console.error("Error al eliminar:", error);
        throw new Error("No se pudo eliminar");
    }
};

const updateData = async (data: IArea) => {
    try {
        const id = data.id;
        delete data.id;
        const docRef = firestore().collection("Area").doc(id);
        await docRef.update(data);
    } catch (error: any) {
        console.error("Error al actualizar", error);
        throw new Error("No se pudo actualizar");
    }
};

export default {
    getAllData,
    getData,
    getDataQuery,
    insertData,
    updateData,
    deleteData
};
