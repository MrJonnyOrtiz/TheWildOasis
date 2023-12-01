import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
// import CabinTable from "./CabinTable";
import Modal from "../../ui/Modal";

function AddCabin() {
   // Compound Component for Modal.
   return (
      <div>
         <Modal>
            <Modal.Open opens="cabin-form">
               <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
               <CreateUpdateCabinForm />
            </Modal.Window>

            {/* Could have another modal to show table */}
            {/* <Modal.Open opens="table">
               <Button>Show table</Button>
            </Modal.Open>
            <Modal.Window name="table">
               <CabinTable />
            </Modal.Window> */}
         </Modal>
      </div>
   );
}

export default AddCabin;
