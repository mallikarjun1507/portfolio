import React from "react";
import { Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Showloading, HideLoading } from "../../../redux/rootSlice";
import { message } from "antd";
import axios from "axios";


function AdminAbout() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const onFinish = async(values) => {
        try {
            const tempskills = values.skills.split(",");
            values.skills = tempskills;
            dispatch(Showloading());
            const response = await axios.post("/api/portfolio/update-about", {
                ...values,
                id: portfolioData.about.id,
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
            <Form onFinish={onFinish} layout="vertical"
                initialValues={{
                    ...portfolioData?.about,
                    skills: portfolioData.about.skills.join(" , "),
                }}
                >
                <Form.Item name='lottie_url' label='Lottie URL'>
                    <input placeholder="Lottie URL" /> 
                </Form.Item>
                
                  <Form.Item name='description' label='Description'>
                    <input placeholder="Description" /> 
                </Form.Item>
                 <Form.Item name='skills' label='Skills'>
                    <input placeholder="Skills" /> 
                </Form.Item>
                <div className="flex justify-end w-full" label='Welcome Text'>
                    <button className="px-10 py-2 bg-primary text-white"type='submit'>SAVE</button>
                </div>
            </Form>
        </div>
    )
}
export default AdminAbout;