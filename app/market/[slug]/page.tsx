
import getCurrentUser from "@/app/actions/getCurrentUser";
import Market from "@/components/market/Market";

export default async function IndexPage() {
  const currentUser = await getCurrentUser()
  
  return (
    <div>
      <Market currentUser={currentUser}/>
    </div>
  )
}
