import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal, message } from "antd";
import axios from "axios";
import {
  Showloading,
  HideLoading,
  ReloadData,
} from "../../../redux/rootSlice";

function AdminProject() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData || {};
  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      let response;
      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-Project", {
          ...values,
          id: selectedItemForEdit.id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-Project", values);
      }
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        form.resetFields();
        dispatch(ReloadData(true));
        setSelectedItemForEdit(null);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async (id) => {
    try {
      dispatch(Showloading());
      const response = await axios.post("/api/portfolio/delete-Project", {
        id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-white"
          onClick={() => {
            setSelectedItemForEdit(null);
            form.resetFields();
            setShowAddEditModal(true);
          }}
        >
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="shadow border p-5 border-gray-400 flex flex-col"
          >
            <h1 className="text-primary text-xl font-bold">{project.title}</h1>
           <img src={`/images/${project.image}`} alt="Project" className="h-60 w-60" />
            <h1>Role: {project.title}</h1>
            <h1>{project.description}</h1>
            <div className="flex justify-end gap-5 mt-5">
              <button
                className="bg-red-500 text-white px-5 py-2"
                onClick={() => onDelete(project.id)}
              >
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  form.setFieldsValue(project);
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={showAddEditModal}
        title={selectedItemForEdit ? "Edit Project" : "Add Project"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          setSelectedItemForEdit(null);
          form.resetFields();
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={selectedItemForEdit || {}}
        >
          <Form.Item name="title" label="Title">
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <input placeholder="Image URL" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input placeholder="Description" />
          </Form.Item>
          <Form.Item name="technologies" label="Technologies">
            <input placeholder="Technologies" />
          </Form.Item>

          <div className="flex justify-end gap-5">
            <button
              type="button"
              className="border-primary text-primary px-5 py-2"
              onClick={() => {
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                form.resetFields();
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2"
            >
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProject;
