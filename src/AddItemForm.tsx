import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, Input, InputAdornment, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }, [])
    const addItem = () => {
        if (title.trim()) {
            props.addItem(title);
        } else {
            setError(true)
        }
        setTitle("")

    }
    const onKeyPressAddItem = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== false) {setError(false);}
        if (e.key === "Enter") {
            addItem()
        }
    }, [])

    return (
        <div>
            <TextField
                variant={"outlined"}
                error={error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                helperText={error && "Title is required!"}
                size={"small"}
            />
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
        </div>
    )
})

export default AddItemForm