export const dynamic = 'force-dynamic' // defaults to auto
import { UserRecord } from "firebase-admin/auth";
import { authAdmin } from "../../../firebase/admin"
import { error } from "console";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('uid')

  let userRecord;
  let isDisabled;

  if(id){
    try{
      userRecord = await authAdmin.auth().getUser(id);
      isDisabled = userRecord.disabled
  
      return Response.json({ disabled: isDisabled, error: null})
    }catch(error){
      console.log(error)
      return Response.json({ disabled: null, error: error})
    }
  }else{
    return Response.json({ disabled: null, error: "ID IS REQUIRED"})
  }
}