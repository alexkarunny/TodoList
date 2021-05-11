import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)

    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
        ? <TextField
                color={'primary'}
                variant={'standard'}
                value={title}
                onChange={onChangeTitle}
                autoFocus
                onBlur={offEditMode}
          />
        : <span onDoubleClick={onEditMode}>{props.title}</span>

    )
}