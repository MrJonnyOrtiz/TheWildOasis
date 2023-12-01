import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
// import CabinTable from "./CabinTable";
import Modal from "../../ui/Modal";

function AddBooking() {
   // Compound Component for Modal.
   return (
      <div>
         <Modal>
            <Modal.Open opens="booking-form">
               <Button>New booking</Button>
            </Modal.Open>
            <Modal.Window name="booking-form">
               <CreateBookingForm />
            </Modal.Window>
         </Modal>
      </div>
   );
}

export default AddBooking;
