import React from 'react';
import {Modal} from "antd";
import CreateNewsForm from "./CreateNewsForm";

const CreateNewsModal = (props) => {
    return (
        <>
            <Modal open={props.isModalOpen}
                   centered={true}
                   width={600}
                   okButtonProps={{ style: { display: 'none' } }}
                   onCancel={props.onCansel}
            >
                <CreateNewsForm addNews={props.addNews}/>
            </Modal>
        </>
    );
};

export default CreateNewsModal;