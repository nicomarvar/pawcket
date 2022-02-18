import React from "react";
import { TMainLayoutProps } from "./main-layout.definition";
import * as S from "./main-layout.style";
import Image from "next/image";
import { Text } from "../../components/text/text.component";

export function MainLayout({
   className,
   imageSrc,
   topTitle,
   bottomTitle,
   bottomSubTitle,
   children,
   topChildren,
}: TMainLayoutProps) {
   return (
      <S.MainLayout className={className}>
         <S.TapNavWrapper></S.TapNavWrapper>
         <S.Top>
            <S.ImageWrapper>
               {imageSrc ? (
                  <Image alt="img" width={100} height={100} src={imageSrc} />
               ) : (
                  <> {topChildren}</>
               )}
            </S.ImageWrapper>
            <S.TextHolder>
               <Text textType="h1">{topTitle}</Text>
            </S.TextHolder>
         </S.Top>

         <S.Card>
            <S.TitleWrapper>
               <Text textType="h2" className="sub-heading-h2">
                  {bottomTitle}
               </Text>
               <Text textType="h3" className="sub-heading-h3">
                  {bottomSubTitle}
               </Text>
            </S.TitleWrapper>
            <S.MainContent>{children}</S.MainContent>
         </S.Card>
      </S.MainLayout>
   );
}