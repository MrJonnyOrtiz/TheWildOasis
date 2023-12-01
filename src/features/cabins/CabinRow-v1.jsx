import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";
import { HiTrash, HiPencil, HiSquare2Stack } from "react-icons/hi2";
import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers.js";

import CreateUpdateCabinForm from "./CreateUpdateCabinForm.jsx";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

// const TableRow = styled.div`
//    display: grid;
//    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//    column-gap: 2.4rem;
//    align-items: center;
//    padding: 1.4rem 2.4rem;

//    &:not(:last-child) {
//       border-bottom: 1px solid var(--color-grey-100);
//    }
// `;

const Img = styled.img`
   display: block;
   width: 6.4rem;
   aspect-ratio: 3 / 2;
   object-fit: cover;
   object-position: center;
   transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: "Sono";
`;

const Price = styled.div`
   font-family: "Sono";
   font-weight: 600;
`;

const Discount = styled.div`
   font-family: "Sono";
   font-weight: 500;
   color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
   const { isDeleting, deleteCabin } = useDeleteCabin();

   const { isCreating, createCabin } = useCreateCabin();

   const {
      id: cabinId,
      name,
      maxCapacity,
      regPrice,
      discount,
      image,
      description,
   } = cabin;

   function handleDup() {
      createCabin({
         name: `Copy of ${name}`,
         maxCapacity,
         regPrice,
         discount,
         image,
         description,
      });
   }

   return (
      <Table.Row>
         <Img src={image} />
         <Cabin>{name}</Cabin>
         <div>Fits up to {maxCapacity} guests</div>
         <Price>{formatCurrency(regPrice)}</Price>
         {discount ? (
            <Discount>{formatCurrency(discount)}</Discount>
         ) : (
            <span>&mdash;</span>
         )}
         <div>
            <Modal>
               <Modal.Open opens="edit">
                  <button>
                     <HiPencil />
                  </button>
               </Modal.Open>
               <Modal.Window name="edit">
                  <CreateUpdateCabinForm cabinToUpdate={cabin} />
               </Modal.Window>

               <Modal.Open opens="delete">
                  <button>
                     <HiTrash />
                  </button>
               </Modal.Open>
               <Modal.Window name="delete">
                  <ConfirmDelete
                     resourceName="cabins"
                     disabled={isDeleting}
                     onConfirm={() => deleteCabin(cabinId)}
                  />
               </Modal.Window>

               <button onClick={handleDup} disabled={isCreating}>
                  <HiSquare2Stack />
               </button>
            </Modal>
         </div>
      </Table.Row>
   );
}

export default CabinRow;
