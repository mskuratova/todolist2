import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, Input, InputAdornment, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm (props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    function addItem() {
        if (title.trim()) {
            props.addItem(title);
        } else {
            setError(true)
        }
        setTitle("")

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }

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
}

export default AddItemForm