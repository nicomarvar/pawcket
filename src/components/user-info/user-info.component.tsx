import React from "react";
import { TUserInfoProps } from "./user-info.definition";
import * as S from "./user-info.style";
import { Text } from "../text/text.component";

export function UserInfo({ user, className }: TUserInfoProps) {
   return (
      <S.UserInfo className={className}>
        
        {user.extraInfo === undefined ? null :
        <Text className="bio">{`${user.extraInfo}`}</Text>}
        {user.address === undefined ? null :
        <><Text className="placeholder">{"Address:"}</Text>
        <Text>{`${user.address}`}</Text></>}
        {user.DOB === undefined ? null :
        <><Text className="placeholder">{"Date of Birth:"}</Text>
        <Text>{`${user.DOB}`}</Text></>}
        
      </S.UserInfo>
   );
}
