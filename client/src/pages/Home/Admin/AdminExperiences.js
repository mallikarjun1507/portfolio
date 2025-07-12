import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Experience } from "../Experiences";
import { modal, Form, Modal } from "antd";
import axios from "axios";
import { message } from "antd";
import { Showloading, HideLoading, ReloadData } from "../../../redux/rootSlice";




function AdminExperiences() {
    const dispatch = useDispatch();
    console.log(dispatch,"disp")
    const { portfolioData } = useSelector((state) => state.root);
    const { experience } = portfolioData;
    console.log(portfolioData, "portfolioData")
    console.log(experience, "AdminExperiences")
    const [showAddEditModal, setShowAddEditModal] = React.useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
          try {
            dispatch(Showloading());
            let response;
              if (selectedItemForEdit) {
                  response = await axios.post("/api/portfolio/update-experience", {
                      ...values,
                      id: selectedItemForEdit.id,
                  });
              } else {
                  response = await axios.post("/api/portfolio/add-experience", values);
              }
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModal(false);
                dispatch(HideLoading());
                form.resetFields(); 
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
        
    }
    const onDelete = async (id) => {
        try {
            dispatch(Showloading());
            const response = await axios.post("/api/portfolio/delete-experience", 
                {id:id}
            );
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading())
            message.error(error.message);       
        }
    }
   
    return(
        <div>
            <div className="flex justify-end">
                <button className="bg-primary px-5 py-2 text-white"
                    onClick={() => {
                        setSelectedItemForEdit(null);
                        form.resetFields(); 
                        setShowAddEditModal(true);
                    }
                }>Add Experience</button>
            </div>
            <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
                {experience?.map((experiences) => (
                    <div key={experiences.id} className="shadow border p-5 border-gray-400 flex flex-col">
                        <h1 className='text-primary text-xl font-bold'>{experiences.period}</h1>
                        <h1>company : {experiences.company}</h1>
                        <h1>Role : {experiences.title}</h1>
                        <h1>{experiences.description}</h1>
                        <div className="flex justify-end gap-5 mt-5">
                            <button className="bg-red-500 text-whiten px-5 py-2" onClick={()=>onDelete(experiences.id)}>Delete</button>
                            <button className="bg-primary text-white px-5 py-2" onClick={() => {
                                setSelectedItemForEdit(experiences);
                                form.setFieldsValue(experiences);
                                setShowAddEditModal(true);
                            }}>Edit</button>

                        </div>
                    </div>    
                ))}
            </div>
            <Modal
                open={showAddEditModal}
                title={setSelectedItemForEdit ? "Edit Experience" : "Add Experience"}
                footer={null}
                onCancel={() => {
                    setShowAddEditModal(false);
                    setSelectedItemForEdit(null);
                    form.resetFields();
                }}>
                <Form  form={form}  layout="vertical" onFinish={onFinish}
                  initialValues={selectedItemForEdit}>
                    <Form.Item name="period" label="Period">
                      <input placeholder="Period"/>
                    </Form.Item>
                    <Form.Item name="company" label="Company">
                      <input placeholder="Company"/>
                    </Form.Item>
                    <Form.Item name="title" label="Title">
                        <input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                      <input placeholder="Description"/>
                    </Form.Item>
                    <div className="flex justify-end">
                        <button className="border-primary text-primary px-5 py-2" type="button"
                            onClick={() => {
                                setShowAddEditModal(false);
                                 setSelectedItemForEdit(null);
                                 form.resetFields();
                            }}>Cancel</button>
                        <button className="bg-primary text-white px-5 py-2" type="submit">
                          { selectedItemForEdit ? "Update" : "Add"}
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
    
}
export default AdminExperiences;