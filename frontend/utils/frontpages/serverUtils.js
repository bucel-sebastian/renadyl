import Database from "../Database";

export const saveToDatabase = async (formData) => {
    const database = new Database();
    
    formData['date'] = new Date().toISOString();

    try{
        const insertResp = await database.insert('renadyl_contact_form',formData);
        console.log(insertResp);
    } catch (error) {
        console.error('Eroare: ',error)
    } finally {
        await database.pool.end();
    }

};

export const sendEmail = async (formData) => {
    
};