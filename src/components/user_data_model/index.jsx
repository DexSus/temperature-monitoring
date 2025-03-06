import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";

export const UserDataModal = ({ 
    modalSubVisible, 
    setModalSubVisible, 
    awaitingDevice,
    form,
    handleFinish,
    loading
}) => {
    return (
        <Modal 
            title="Данні про користувача"
            open={modalSubVisible}
            onCancel={() => setModalSubVisible(false)}
            footer={null}
        >
            <Form 
                form={form} 
                layout="vertical" 
                onFinish={handleFinish}
            >
                <Form.Item 
                    label="Повне ім'я" 
                    name="fullName" 
                    rules={[{ required: true, message: "Введіть ім'я" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                    label="Опис" 
                    name="description" 
                    rules={[{ required: true, message: "Введіть опис" }]}
                >
                    <Input.TextArea rows={2} />
                </Form.Item>

                <Form.Item 
                    label={`Пристрій ${awaitingDevice?.sensorNumber || " "}`} 
                    name="deviceID" 
                    rules={[{ required: true, message: "Виберіть пристрій" }]}
                >
                    <Input readOnly/>
                </Form.Item>

                <Form.Item 
                    label="Поточна температура" 
                    name="currentTemperature" 
                    rules={[{ required: true, message: "Введіть температуру" }]}
                >
                    <Input readOnly />
                </Form.Item>

                <Form.Item label="Фото користувача" name="photo">
                    <Upload beforeUpload={() => false} listType="picture">
                        <Button>Завантажити фото</Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Додати користувача
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};