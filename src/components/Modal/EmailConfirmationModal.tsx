import Modal from "./ModalWrap";

type TModalNewFolderProps = {
  closeModal: () => void;
};

export default function EmailConfirmationModal({
  closeModal,
}: TModalNewFolderProps) {
  return (
    <Modal
      handleClose={closeModal}
      title="Account Confirmation"
      closeButtonLabel="Ok"
    >
      <p>Please checkout your gmail inbox to confirm your email</p>
    </Modal>
  );
}
