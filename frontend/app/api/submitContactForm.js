import { saveToDatabase, sendEmail } from "@/utils/frontpages/serverUtils";



export default async (req,res) => {
    const formData = req.body;

    try {

        await saveToDatabase(formData);

        await sendEmail(formData);

        res.status(200).send(`success`);
    } catch (error) {
        console.error(`Error - ${error}`);
        res.status(500).send(`fail`);
    }

}