import ReactDOM  from "react-dom"
import { ReactNode } from "react";
type ModalProps = {
  children: ReactNode,
  handleModal: (e: React.MouseEvent) => void
};
const portalRoot = document.getElementById("portal-root")
const Modal = ({handleModal, children}: ModalProps) => {
  if (!portalRoot) return null
  return ReactDOM.createPortal(
    <div onClick={handleModal} className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      {children}
    </div>,
    portalRoot
  )
}

export default Modal
