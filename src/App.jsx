import { Button} from "@nextui-org/react";

import Cards from "./components/Cards";
import { Plus } from "lucide-react";


export default function App() {
  return (
    <>
      <h1 className="text-black text-center text-4xl font-bold py-10">Mis Historias</h1>
      <Cards />
      <div className="fixed right-14 bottom-14">
        <Button className="bg-success h-20 rounded-full shadow-large">
          <Plus className="w-12 h-12 text-black font-bold"/>
        </Button>
      </div>
    </>
  )
}