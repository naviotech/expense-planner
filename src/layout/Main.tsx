import FirstForm from "../components/FirstForm"
import PrincipalPanel from "../components/PrincipalPanel"
import { useBudget } from "../hooks/useBudget"

const Main = () => {
  const { visible} = useBudget()

  return (
    <main className=" ">
      <section className="py-11 px-6 w-full flex flex-col justify-center items-center">
        { visible === false ? (<FirstForm/>):
        (<PrincipalPanel/>)}
      </section>
    </main>
  )
}

export default Main
