import { useState } from 'react'
import './styles.css'
import { CustomModal } from './components/CustomModal'
import { DialogModal } from './components/DialogModal'

function App() {
  const [isCustomModal, setIsCustomModal] = useState(false)
  const [isDialogModal, setIsDialogModal] = useState(false)

  return (
    <>
      <h1>modal</h1>
      <button data-custom-open onClick={() => setIsCustomModal(true)}>
        Show Custom Modal
      </button>
      <button data-dialog-open onClick={() => setIsDialogModal(true)}>
        Show Dialog Modal
      </button>

      <CustomModal show={isCustomModal} onClose={() => setIsCustomModal(false)}>
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button onClick={() => setIsCustomModal(false)}>Close</button>
      </CustomModal>
      <DialogModal show={isDialogModal} onClose={() => setIsDialogModal(false)}>
        <p>
          This is a <strong>DIALOG</strong> modal
        </p>
        <button onClick={() => setIsDialogModal(false)}>Close</button>
      </DialogModal>
    </>
  )
}

export default App
