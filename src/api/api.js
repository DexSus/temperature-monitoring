import axios from 'axios';
import Compressor from 'compressorjs';

const backendIP = process.env.REACT_APP_BACKEND_IP;

export const getDevices = async () => {
  try {
    const response = await axios.get(`${backendIP}/api/devices/getAll`);
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

export const checkOne = async (device) => {
  try {
    const response = await axios.post(`${backendIP}/api/devices/checkOne`, device);
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

export const createUser = async (formValues, device) => {
  try {
    const file = formValues.photo.file;

    const compressedFile = await compressImage(file);

    const user = {
      fullName: formValues.fullName,
      description: formValues.description,
      deviceName: device.sensorNumber,
      deviceID: formValues.deviceID,
      currentTemperature: formValues.currentTemperature,
      photo: compressedFile ? await toBase64(compressedFile) : null, 
    };

    const response = await axios.post(`${backendIP}/api/users/create`, user);
    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error uploading user data:", error);
    throw error;
  }
};

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6, 
      maxWidth: 800, 
      maxHeight: 800,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      }
    });
  });
};

const toBase64 = (file) => 
  new Promise((resolve, reject) => {
    if (!(file instanceof Blob)) {
      reject(new Error("Invalid file format"));
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  }
);

export const setDeviceUsed = async (deviceId, isUsed) => {
  try {
    const response = await axios.post(`${backendIP}/api/devices/setIsUsed`, { deviceId, isUsed });
    return response.data;
  } catch (error) {
    console.error('Error setting device used:', error);
    throw error;
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${backendIP}/api/users/getAllWithInfo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export const getAndSaveCurrentTemperature = async (device) => {
  try {
    const response = await axios.post(`${backendIP}/api/devices/getCurrentTemperature`, device);
    return response.data;
  } catch (error) {
      console.error('Error fetching current temperature:', error);
    throw error;
  }
};

export const updateDeviceStatus = async (deviceId, isOnline) => {
  try {
    const response = await axios.post(`${backendIP}/api/devices/setIsOnline`, {
      deviceId,
      isOnline,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating device status:', error);
    throw error;
  }
};