import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()

        if (trimmedTitle) {
            props.addItem(trimmedTitle)

        } else {
            setError(true)
        }
        setTitle('');

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddItem();
        }
    }
    const errorMessage = error ? <div className={"error-message"}>title is required</div> : null

    return (
        <div>
            <input className={error ? "error" : ""}
                   value={title} //a
                   onChange={onChangeTitle}
                   onKeyPress={onKeyPressAddItem}
            />
            <button onClick={onClickAddItem}>+</button>
            {errorMessage}
        </div>
    )
}