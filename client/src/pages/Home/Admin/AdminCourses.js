import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal, message } from "antd";
import axios from "axios";
import { Showloading, HideLoading, ReloadData } from "../../../redux/rootSlice";

function AdminCourses() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const courses = portfolioData?.courses || []; // ✅ use lowercase 'courses' to match DB

  const [showAddEditModal, setShowAddEditModal] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      let response;

      if (selectedItemForEdit) {
        response = await axios.post("/api/portfolio/update-Courses", {
          ...values,
          id: selectedItemForEdit.id,
        });
      } else {
        response = await axios.post("/api/portfolio/add-Courses", values);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        form.resetFields();
        dispatch(ReloadData(true));
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
      const response = await axios.post("/api/portfolio/delete-Courses", { id: id });
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
          Add Course
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5 sm:grid-cols-1">
        {courses.map((course) => (
          <div key={course.id} className="shadow border p-5 border-gray-400 flex flex-col">
            <h1 className="text-primary text-xl font-bold">{course.title}</h1>
            <img src={course.image} alt="" className="h-60 w-60" />
            <h1>Role: {course.title}</h1>
            <h1>{course.description}</h1>
            <div className="flex justify-end gap-5 mt-5 ">
              <button className="bg-red-500 text-white px-5 py-2" onClick={() => onDelete(course.id)}>
                Delete
              </button>
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(course);
                  form.setFieldsValue(course);
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
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        footer={null}
        onCancel={() => {
          setShowAddEditModal(false);
          setSelectedItemForEdit(null);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={selectedItemForEdit}>
          <Form.Item name="title" label="Title">
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <input placeholder="Image URL" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <input placeholder="Description" />
          </Form.Item>

          <div className="flex justify-end">
            <button
              className="border-primary text-primary px-5 py-2"
              type="button"
              onClick={() => {
                setShowAddEditModal(false);
                setSelectedItemForEdit(null);
                form.resetFields();
              }}
            >
              Cancel
            </button>
            <button className="bg-primary text-white px-5 py-2" type="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCourses;
