import getCurrentUser from "../actions/getCurrentUser"
import Reservation from "../../components/reservation/Reservation";

export default async function IndexPage() {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <Reservation currentUser={currentUser}/>
    </div>
  )
}
