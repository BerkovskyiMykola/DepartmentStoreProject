import React from 'react';

const ListItem = ({ columns, item, index, deleteRecord, editRecord }) => {

    return (
        <tr>
            <td>{index + 1}</td>
            {columns.map((x, index) => 
                <td key={index}>{item[x]}</td>
            )}
            <td>
                {editRecord &&
                    <button
                        onClick={() => { editRecord(item) }}
                        className="btn btn-outline-success btn-sm float-left">
                        <i className="fa fa-edit" />
                    </button>
                }
                {deleteRecord &&
                    <button
                        onClick={() => { deleteRecord(item) }}
                        className="btn btn-outline-danger btn-sm float-left">
                        <i className="fa fa-trash-o" />
                    </button>
                }
            </td>
        </tr>
    );
}

export default ListItem;