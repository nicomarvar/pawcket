/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { collection, doc, onSnapshot, query } from "@firebase/firestore";
import type { NextApiRequest } from "next";
import { useEffect, useState } from "react";
import { FormInputs } from "../components/form-inputs/form-inputs.component";
import { FriendsModal } from "../components/friends-modal/friends-modal.component";
import { Navbar } from "../components/navbar/navbar.component";
import { Frame, MainLayout } from "../functions/dynamic-imports";
import { addFriend } from "../functions/friends/add-friend";
import { AuthService } from "../lib/auth-service/auth.service";
import { firestoreDB } from "../lib/firebase/firebase.initialize";
import { FriendsPageWrapper } from "../styles/global.style";
import * as S from "../styles/vets.style";
import { TUserData } from "../types/user-data.definition";
import { removeFriend } from "../functions/friends/remove-friends";
import { searchUser } from "../functions/friends/search-friends";

type TFriendsData = {
   userUID?: string;
};

const Friends = ({ userUID }: TFriendsData) => {
   const [results, setResults] = useState<TUserData[]>([]);
   const [currentUserData, setCurrentUserData] = useState<any>(null);
   const [allUsers, setAllUsers] = useState<TUserData[]>([]);

   console.log("allUsers =>", allUsers);

   //! realtime feed to db
   useEffect(() => {
      if (!userUID) return;
      //! current users data in real time
      onSnapshot(doc(firestoreDB, "users", userUID), (doc) => {
         const data = doc.data();
         const _data = {
            ...data,
            DOB: "",
         };
         setCurrentUserData(_data);
      });

      //! all documents in users in real time
      const q = query(collection(firestoreDB, "users"));
      onSnapshot(q, (querySnapshot) => {
         const users: TUserData[] = [];
         querySnapshot.forEach((doc) => {
            const _data = doc.data();
            const data: any = {
               ..._data,
               DOB: "",
               fullName: _data.firstName + " " + _data.lastName,
               fullNameReverse: _data.lastName + " " + _data.firstName,
            };
            users.push(data);
         });
         setAllUsers(users);
      });
   }, []);

   //* if the user is to remove a friend with the button this must update in the db
   //* if friend accepts request set light gray text to friend

   return (
      <>
         <S.Desktop>
            <MainLayout className="desktop" desktopCard={true}>
               <FormInputs
                  placeholder={"Search for friends"}
                  onKeyUp={(event: { target: HTMLInputElement }) => {
                     setResults(searchUser(event.target.value, allUsers));
                  }}
               />
               <FriendsPageWrapper>
                  {results.map(
                     (
                        { fullName, userImage, userID, friendsRequests },
                        index
                     ) => {
                        return (
                           <FriendsModal
                              key={index}
                              uid={userID}
                              currentUserUid={userUID}
                              fullName={fullName}
                              sentRequest={false}
                              imageUrl={userImage}
                              friendsRequestList={friendsRequests}
                              onClick={(evt) => {
                                 const functionId =
                                    (evt.target as Element).id ||
                                    // @ts-ignore
                                    (evt.target as Element).ownerSVGElement?.id;

                                 if (functionId === "add-friend") {
                                    addFriend({
                                       id: userID,
                                       userUID,
                                       currentUserData,
                                    });
                                 } else {
                                    removeFriend({
                                       id: userID,
                                       userUID,
                                       currentUserData,
                                    });
                                 }
                              }}
                           />
                        );
                     }
                  )}
               </FriendsPageWrapper>
            </MainLayout>
         </S.Desktop>

         <S.Mobile>
            <MainLayout
               className="mobile"
               bottomTitle="Vets near you"
               topChildren={
                  <Frame
                     background={"/frame.svg"}
                     img={"/circle/vet-circle.svg"}
                     diameter={230}
                  />
               }
            >
               <Navbar className="nav" />
            </MainLayout>
         </S.Mobile>
      </>
   );
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
   try {
      const cookieRefreshToken = req.cookies.token;
      const authService = new AuthService();
      const dataRes = await authService.getFirebaseUserToken(
         cookieRefreshToken
      );
      const userUID = dataRes.getIdToken.user_id;

      // No user then send to login/ sign up page
      if (!dataRes) {
         return {
            redirect: {
               destination: "/",
            },
         };
      }

      return {
         props: {
            userUID,
         },
      };
   } catch (err) {
      console.log("ERR", err);

      return {
         //  redirect: {
         //     destination: "/",
         //  },
         props: {},
      };
   }
}

export default Friends;
