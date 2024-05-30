
import { Button, Modal, useDisclosure } from '@nextui-org/react'
import { Plus } from 'lucide-react';
import Cards from './components/Cards.jsx'
import FormModal from './components/Modal.jsx';
import { useGlobalContext } from './context/GlobalContext.jsx';

  
export default function App() {
  const {isOpen, onOpen, onOpenChange, anadirHistoria} = useDisclosure();
  const { setDataHistoria } = useGlobalContext()

  function controladorNuevaHistoria() {
    setDataHistoria({})
    onOpen()
  }

  return (
    <>
      <h1 className="text-black text-center text-4xl font-bold py-10">Mis Historias</h1>
      <Cards />
      <div className="fixed right-14 bottom-14">
        <Button color='success' className="h-20 rounded-full shadow-large" onClick={controladorNuevaHistoria}>
          <Plus className="w-12 h-12 text-black font-bold"/>
        </Button>
        <Modal
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            placement="top-center"
        >
          <FormModal />
        </Modal>
      </div>
    </>
  )
}
