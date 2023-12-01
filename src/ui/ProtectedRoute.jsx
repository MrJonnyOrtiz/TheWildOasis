import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner";

const FullPage = styled.div`
   height: 100dvh;
   background-color: var(--color-grey-50);
   display: flex;
   align-items: center;
   justify-content: center;
`;

function ProtectedRoute({ children }) {
   const navigate = useNavigate();

   // 1. load the authenticated user
   const { user, isLoading, isAuthenticated } = useUser();

   // 2. if there's no authenticated user, redirect to login
   useEffect(() => {
      if (!isAuthenticated && !isLoading) navigate("/login");
   }, [isAuthenticated, navigate, isLoading]);

   // 3. while loading, show a spinner
   if (isLoading)
      return (
         <FullPage>
            <Spinner />
         </FullPage>
      );

   // 4. if there's an authenticated user, return children

   if (isAuthenticated) return children;
}

export default ProtectedRoute;
