import { MainLayout } from "../main-layout/main-layout.component";
import { Buttons } from "../../components/buttons/buttons.component";
import { FormInputs } from "../../components/form-inputs/form-inputs.component";
import { Frame } from "../../components/frame/frame.component";
import { TCreateProfileProps } from "./create-profiles.definition";
import * as S from "./create-profiles.style";

export function CreateProfileForm({topTitle, bottomTitle, background, foreground,isPet}: TCreateProfileProps){

    let separatorText: string = isPet? "PET PASSPORT": "USER INFO";
    console.log(separatorText);
    
    return(
        
        <MainLayout
        topTitle={topTitle}
        bottomTitle={bottomTitle}
        topChildren={<Frame background={background} foreground={foreground}/>}
        >
            <a style={S.SkipStyle} href="">
                Skip
            </a>
            { isPet ?
                <form>
                    <span>
                        <FormInputs placeholder="Name" inputType="input"></FormInputs>
                        <FormInputs placeholder="Bio" inputType="text-area"></FormInputs>
                    </span>
                        <S.GlowingLine separatorText={separatorText} />
                        <FormInputs placeholder="Sex" inputType="input"></FormInputs>
                        <FormInputs placeholder="Date of Birth" inputType="input"></FormInputs>
                        <FormInputs placeholder="Species" inputType="input"></FormInputs>
                        <FormInputs placeholder="Personality" inputType="input"></FormInputs>
                        <FormInputs placeholder="Medication" inputType="input"></FormInputs>
                        <FormInputs placeholder="Weight" inputType="input"></FormInputs>
                        <FormInputs placeholder="Extra Info" inputType="text-area"></FormInputs>
                </form>
                :
                <form>
                    <S.GlowingLine separatorText={separatorText} />
                    <span>
                        <FormInputs placeholder="Name"></FormInputs>
                        <FormInputs placeholder="Date of Birth"></FormInputs>
                    </span>
                        <FormInputs placeholder="Postal Code"></FormInputs>
                        <FormInputs placeholder="Telephone"></FormInputs>
                        <FormInputs placeholder="Username"></FormInputs>
                        <FormInputs placeholder="Extra Info" inputType="text-area"></FormInputs>
                </form>
            }
            <div style={S.ButtonsWrapper}>
                <Buttons dark={false} children="Continue"></Buttons>
                <Buttons dark={true} children="Add Another"></Buttons>
            </div>

        </MainLayout>
    )
}
