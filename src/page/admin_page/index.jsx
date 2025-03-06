import React, { useState, useEffect } from "react";
import "./style.css";
import { DeviceCard } from "../../components/device_card/index";
import { Card, message, Form} from "antd";
import { getDevices, checkOne, createUser, setDeviceUsed} from "../../api/api.js";
import { DeviceManagerModal } from "../../components/device_manager_modal/index.jsx";
import { UserDataModal } from "../../components/user_data_model/index.jsx";

export const AdminPage = ({ devices, setDevices, updateDevice }) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSubVisible, setModalSubVisible] = useState(false);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [form] = Form.useForm();
    const [awaitingDevice, setAwaitingDevice] = useState(null);
    const [usedDevices, setUsedDevices] = useState([]);

    useEffect(() => {
        let interval;
        if (modalVisible) {
            fetchAvailableDevices();
            interval = setInterval(fetchAvailableDevices, 5000);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [modalVisible]);

    useEffect(() => {
        if (awaitingDevice) {
            form.setFieldsValue({ deviceID: awaitingDevice.id });
            form.setFieldsValue({ currentTemperature: 0.0 });
        }
    }, [awaitingDevice, form]);

    const fetchAvailableDevices = async () => {
        try {
            setLoading(true);
            const response = await getDevices();
            const filteredDevices = response.data.filter(device => !device.isUsed); 
            const used = response.data.filter(device => device.isUsed);
            setUsedDevices(used);
            setAvailableDevices(filteredDevices);
        } catch (error) {
            message.error("Не вдалося отримати список пристроїв");
        } finally {
            setLoading(false);
        }
    };  

    const handleAddDevice = async (device) => {
        setLoading(true); 
        try {
            const response = await checkOne(device);
            
            if (response.data.isOnline) { 
                message.success("Пристрій успішно приєднано!");
                setAwaitingDevice(device);
                setModalVisible(false);
                setModalSubVisible(true);
            } else {
                message.error("Пристрій не в мережі!");
            }
        } catch (error) {
            message.error("Помилка при додаванні пристрою");
        } finally {
            setLoading(false); 
        }
    };

    const updateDevicesList = async () => {
        try {
            const response = await getDevices();
            const usedDevicesForDisplay = response.data.filter(device => device.isUsed);
            
            setDevices(prevDevices => {
                const deviceMap = new Map(prevDevices.map(device => [device.id, device]));
                
                usedDevicesForDisplay.forEach(newDevice => {
                    if (deviceMap.has(newDevice.id)) {
                        const existingDevice = deviceMap.get(newDevice.id);
                        deviceMap.set(newDevice.id, { ...existingDevice, ...newDevice });
                    } else {
                        deviceMap.set(newDevice.id, newDevice);
                    }
                });
                
                return Array.from(deviceMap.values());
            });
        } catch (error) {
            message.error("Не вдалося оновити список пристроїв");
        }
    };

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const response = await setDeviceUsed(awaitingDevice.id, true)
    
            if (response) {
                await createUser(values, awaitingDevice);
                message.success("Користувач успішно доданий");
                form.resetFields();
                setModalSubVisible(false);
                
                fetchAvailableDevices();
                updateDevicesList();
            }
        } catch (error) {
            message.error("Помилка при додаванні користувача");
            await setDeviceUsed(awaitingDevice.id, false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main_container admin_container">
            {devices.map((device) => (
                <DeviceCard key={device.id} device={device} updateDevice={updateDevice}/>
            ))}
            
            <button className="add_btn" onClick={() => setModalVisible(true)}>
                <Card className="device-card">
                    <p className="plus"> + </p>
                </Card>
            </button>

            <DeviceManagerModal 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                availableDevices={availableDevices}
                usedDevices={usedDevices}
                handleAddDevice={handleAddDevice}
                loading={loading}
            />

            <UserDataModal 
                modalSubVisible={modalSubVisible}
                setModalSubVisible={setModalSubVisible}
                awaitingDevice={awaitingDevice}
                form={form}
                handleFinish={handleFinish}
                loading={loading}
            />
        </div>
    );
};
