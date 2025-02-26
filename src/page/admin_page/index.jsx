import React, { useState, useEffect } from "react";
import "./style.css";
import { DeviceCard } from "../../components/device_card/index";
import { Card, Modal, List, Button, message } from "antd";
import axios from "axios";

export const AdminPage = () => {
    const [devices, setDevices] = useState([
        { id: 1, fullName: 'Іван Петров', sensorNumber: 'A123', bodyTemperature: 36.5, isOnline: true },
        { id: 2, fullName: 'Марія Сидорова', sensorNumber: 'B456', bodyTemperature: 36.9, isOnline: false },
        { id: 3, fullName: 'Олександра Гречко', sensorNumber: 'C789', bodyTemperature: 37.5, isOnline: true },
        { id: 4, fullName: 'Володимир Мельник', sensorNumber: 'D012', bodyTemperature: 38.5, isOnline: true },
        { id: 5, fullName: 'Анна Ковальчук', sensorNumber: 'E345', bodyTemperature: 39.5, isOnline: false },
        { id: 6, fullName: 'Дмитро Козак', sensorNumber: 'F567', bodyTemperature: 37.2, isOnline: true },
        { id: 7, fullName: 'Юлія Шевченко', sensorNumber: 'G678', bodyTemperature: 38.1, isOnline: true },
        { id: 8, fullName: 'Петро Василенко', sensorNumber: 'H789', bodyTemperature: 39.0, isOnline: false },
        { id: 9, fullName: 'Наталія Іванова', sensorNumber: 'I890', bodyTemperature: 37.8, isOnline: true },
    ]);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [availableDevices, setAvailableDevices] = useState([]);
    
    const fetchAvailableDevices = async () => {
        try {
            // const response = await axios.get("/api/available-devices");
            // setAvailableDevices(response.data);
        } catch (error) {
            message.error("Не вдалося отримати список пристроїв");
        }
    };

    const handleAddDevice = async (device) => {
        try {
            await axios.post("/api/add-device", device);
            setDevices([...devices, device]);
            setModalVisible(false);
            message.success("Пристрій успішно додано");
        } catch (error) {
            message.error("Помилка при додаванні пристрою");
        }
    };

    return (
        <div className="main_container admin_container">
            {devices.map((device) => (
                <DeviceCard key={device.id} {...device} />
            ))}
            
            <button className="add_btn" onClick={() => {
                setModalVisible(true);
                fetchAvailableDevices();
            }}>
                <Card className="device-card">
                    <p className="plus"> + </p>
                </Card>
            </button>

            <Modal 
                title="Доступні пристрої"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <List
                    dataSource={availableDevices}
                    renderItem={(device) => (
                        <List.Item>
                            <span>{device.fullName} ({device.sensorNumber})</span>
                            <Button type="primary" onClick={() => handleAddDevice(device)}>Додати</Button>
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};