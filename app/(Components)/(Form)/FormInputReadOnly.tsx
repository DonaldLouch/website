interface FormProps {
    inputID: string
    inputLabel?: string
    inputType?: any|undefined|null
    inputValue?: any|undefined|null
}

export const FormInputReadOnly = ( props: FormProps) => {
    const { inputID, inputLabel, inputType, inputValue } = props
    
    let theInputType = "text"
    if (inputType != undefined) {
        theInputType = inputType
    }
    
    return (
        <div><h1>Function is being refactored.</h1></div>
        //  <InputControl 
        //     name={inputID}
        //     label={inputLabel}
        //     mt="0.5rem"
        //     inputProps={{
        //         variant: "unstyled",
        //         boxShadow: 'bsBoldRed',
        //         p: "1.5rem 2rem",
        //         color: 'yellow',
        //         borderRadius: "0 2rem 0 2rem",
        //         type: theInputType,
        //         fontStyle: "italic", 
        //         fontWeight: 300,
        //     }}
        //     labelProps={{color: 'white'}}
        //     isReadOnly
        // />
    )
}