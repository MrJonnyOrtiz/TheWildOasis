import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import AddCabin from "../features/cabins/AddCabin";
import { getCabins } from "../services/apiCabins.js";

function Cabins() {
   return (
      <>
         <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <CabinTableOperations />
         </Row>
         <Row>
            <CabinTable cabins={getCabins()} />
            <AddCabin />
         </Row>
      </>
   );
}

export default Cabins;
