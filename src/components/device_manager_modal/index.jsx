import React from "react";
import { Modal, Tabs, List, Button, Spin } from "antd";

export const DeviceManagerModal = ({ 
    modalVisible, 
    setModalVisible, 
    availableDevices, 
    usedDevices, 
    handleAddDevice, 
    loading 
}) => {
    return (
        <Modal 
            title="Усі пристрої"
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
        >
            <Tabs defaultActiveKey="available">
                <Tabs.TabPane tab="Доступні" key="available">
                    <List
                        dataSource={availableDevices}
                        renderItem={(device) => (
                            <List.Item>
                                <span>{device.fullName} ({device.sensorNumber})</span>
                                <Button type="primary" onClick={() => handleAddDevice(device)} disabled={loading}>
                                    {loading ? <Spin /> : "Додати"}
                                </Button>
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Використовуються" key="used">
                    <List
                        dataSource={usedDevices}
                        renderItem={(device) => (
                            <List.Item>
                                <span>{device.fullName} ({device.sensorNumber})</span>
                            </List.Item>
                        )}
                    />
                </Tabs.TabPane>
            </Tabs>
        </Modal>
    );
};