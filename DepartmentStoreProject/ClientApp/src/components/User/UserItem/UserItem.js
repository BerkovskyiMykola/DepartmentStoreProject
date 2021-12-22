import React from 'react';

const UserItem = ({ item, index, editUser, deleteUser }) => {
    const { firstname, lastname, email, role, userId } = item;

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>
                <button
                    onClick={() => { editUser(firstname, lastname, email, role, userId) }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="fa fa-edit" />
                </button>
                <button
                    onClick={() => { deleteUser(userId) } }
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="fa fa-trash-o" />
                </button>
            </td>
        </tr>
    );
}

export default UserItem;