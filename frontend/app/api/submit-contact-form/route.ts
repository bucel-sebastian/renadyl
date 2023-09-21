import { saveToDatabase, sendEmail } from "@/utils/frontpages/serverUtils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.json();
    delete formData.gdpr;

    try {
        await saveToDatabase(formData);

        await sendEmail(formData);

    } catch (error) {
        console.error(`Error - ${error}`);
    }

    return NextResponse.json({
        "status": 200,
        "body": "success"
    });

}

// export async function GET() {


    
// }