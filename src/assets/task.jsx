import { useState } from "react";

export const Task = ({ id, title, desc, stat }) => {
    const [isEdit, setIsEdit] = useState(true)

    const [status, setStat] = useState(stat)
    const [tast, setTitle] = useState(title)
    const [description, setDesc] = useState(desc)

    const handleChangeStatus = () => {
        setStat(!status);
        fetch(import.meta.env.VITE_SERVER+"/task/"+id, {
            method: "PATCH",
            body: JSON.stringify({}),
            headers:{}
        }).then((response) => response.json)
        .then(json => console.log(json))
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleChangeDesc = (event) => {
        setDesc(event.target.value);
    }

    const btnEdit = () => {
        setIsEdit(!isEdit)
    }

    const btnDelete = () => {
        console.log("Listo para eliminar");
        fetch(import.meta.env.VITE_SERVER+"/task/"+id, {
            method: "DELETE",
            body: JSON.stringify({}),
            headers:{}
        }).then((response) => response.json)
        .then(json => console.log(json))
    }

    const btnSave = () => {
        fetch(import.meta.env.VITE_SERVER+"/task/"+id, {
            method: "PUT",
            body: JSON.stringify({
                title: tast,
                desc: description
            }),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((response) => response.json)
        .then(json => console.log(json))
    }

    return (
        <div className="flex flex-row items-center">
            <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-green-800 transition duration-150 ease-in-out"
                checked={status}
                onChange={handleChangeStatus}
            />
            <input disabled={isEdit} className={`bg-${isEdit ? 'gray-200' : 'grey-200'} border ${isEdit ? 'border-gray-600' : 'border-blue-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2`} defaultValue={title} onChange={handleChangeTitle} type="text" name="" id="" />
            <input disabled={isEdit} className={`bg-${isEdit ? 'gray-200' : 'grey-200'} border ${isEdit ? 'border-gray-600' : 'border-blue-500'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 m-2`} defaultValue={desc} onChange={handleChangeDesc} type="text" name="" id="" />
            <button className="bg-green-800 text-gray-200 p-2 m-2 rounded-lg" onClick={btnEdit}>Editar</button>
            <button className={`${isEdit ? 'bg-red-500' : 'bg-blue-500'} text-gray-200 p-2 m-2 rounded-lg`} onClick={isEdit ? btnDelete : btnSave}>{isEdit ? 'Eliminar' : 'Guardar'}</button>
        </div>
    )
}