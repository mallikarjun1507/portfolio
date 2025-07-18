import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Showloading, HideLoading } from "../../../redux/rootSlice";
import { message } from "antd";
import axios from "axios";


function AdminIntro() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const onFinish = async(values) => {
        try {
            dispatch(Showloading());
            const response = await axios.post("/api/portfolio/update-intro", {
                ...values,
                id: portfolioData.intro.id,
            });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    return (
        <div>
            <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData?.intro}>
                <Form.Item name='welcome_text' label='Welcome Text'>
                    <input placeholder="Intro" /> 
                </Form.Item>
                  <Form.Item name='first_name' label='First Name'>
                    <input placeholder="First Name" /> 
                </Form.Item>
                <Form.Item name='last_name' label='Last Name'>
                    <input placeholder="Last Name" /> 
                </Form.Item>
                  <Form.Item name='caption' label='Caption'>
                    <input placeholder="Caption" /> 
                </Form.Item>
                  <Form.Item name='description' label='Description'>
                    <input placeholder="Description" /> 
                </Form.Item>
                <div className="flex justify-end w-full" label='Welcome Text'>
                    <button className="px-10 py-2 bg-primary text-white"type='submit'>SAVE</button>
                </div>
            </Form>
        </div>
    )
}
export default AdminIntro;