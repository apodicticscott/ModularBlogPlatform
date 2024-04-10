export const dynamic = 'force-dynamic' // defaults to auto
import { authAdmin } from "../../../firebase/admin"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('uid')

  if(id){
    try{
      await authAdmin.auth().updateUser(id, {disabled: true})

      return Response.json({succses: true, error: null})
    }catch(error){
      return Response.json({succses: false, error: error})
    }
  }else{
    return Response.json({succses: false, error: "ID IS REQUIRED"})
  }
}