import Mycomment from "@/components/mycomment/Mycomment"
import getCurrentUser from "@/app/actions/getCurrentUser";

export default async function IndexPage() {
  const currentUser = await getCurrentUser()
  return (
    <div>
      <Mycomment currentUser={currentUser}/>
    </div>
  )
}
