import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { useBooking } from "./useBooking";
import { useCheckout } from "../check-in-out/useCheckout.js";
import { useDeleteBooking } from "./useDeleteBooking";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";

const HeadingGroup = styled.div`
   display: flex;
   gap: 2.4rem;
   align-items: center;
`;

function BookingDetail() {
   const { booking, isLoading } = useBooking();
   const navigate = useNavigate();

   const { checkout, isCheckingOut } = useCheckout();
   const { deleteBooking, isDeleting } = useDeleteBooking();

   const moveBack = useMoveBack();

   if (isLoading) return <Spinner />;

   if (!booking) return <Empty resource="booking" />;

   const { status, id: bookingId } = booking;

   const statusToTagName = {
      unconfirmed: "blue",
      "checked-in": "green",
      "checked-out": "silver",
   };

   return (
      <Modal>
         <Row type="horizontal">
            <HeadingGroup>
               <Heading as="h1">Booking #{bookingId}</Heading>
               <Tag type={statusToTagName[status]}>
                  {status.replace("-", " ")}
               </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>

         <BookingDataBox booking={booking} />

         <ButtonGroup>
            {status === "unconfirmed" && (
               <>
                  <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                     Check in
                  </Button>
                  <Modal.Open opens="delete">
                     <Button $variation="danger">Delete</Button>
                  </Modal.Open>
               </>
            )}
            {status === "checked-in" && (
               <Button
                  onClick={() => checkout(bookingId)}
                  disabled={isCheckingOut}
               >
                  Check out
               </Button>
            )}

            <Button $variation="secondary" onClick={moveBack}>
               Back
            </Button>
         </ButtonGroup>

         <Modal.Window name="delete">
            <ConfirmDelete
               resourceName="booking"
               onConfirm={() =>
                  deleteBooking(bookingId, {
                     onSettled: () => navigate(-1),
                  })
               }
               disabled={isDeleting}
            />
         </Modal.Window>
      </Modal>
   );
}

export default BookingDetail;
