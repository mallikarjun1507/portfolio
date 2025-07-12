import React, { useEffect } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Showloading, HideLoading } from "../../../redux/rootSlice";

function AdminContact() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const [form] = Form.useForm();

  useEffect(() => {
    if (portfolioData?.contact) {
      form.setFieldsValue(portfolioData.contact);
    }
  }, [portfolioData?.contact, form]);

  console.log("Contact Name:", portfolioData?.contact); // ✅ safe logging

  const onFinish = async (values) => {
    try {
      dispatch(Showloading());
      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        id: portfolioData?.contact?.id, // ✅ safe access
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success("Contact updated successfully");
      } else {
        message.error("Failed to update contact");
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name">
          <input placeholder="Name" />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <input placeholder="Gender" />
        </Form.Item>
        <Form.Item name="age" label="Age">
          <input placeholder="Age" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input placeholder="Email" />
        </Form.Item>
        <Form.Item name="mobile" label="Mobile">
          <input placeholder="Mobile" />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <input placeholder="Address" />
        </Form.Item>
        <div className="flex justify-end">
          <button type="submit" className="bg-primary text-white px-10 py-2">
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminContact;
