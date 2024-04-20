import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] =useState(null);
    const [skinType, setSkinType] =useState('????');
    const [loading, setLoading] = useState(true);

    const profileUrl='http://52.79.237.164:3000/user/home/profile'
    

    // AsyncStorage에서 로그인 상태와 사용자 아이디를 불러오는 함수
    const loadAuthData = async () => {
        setLoading(true)
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            console.log('userId:',storedUserId)
            if (storedUserId!==null) {
                setUserId(storedUserId);
                profileCall(storedUserId)
            }
            else if(storedUserId==null){
                setUserId(false)
                
            }
        } catch (error) {
            console.error('Failed to load user ID from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        loadAuthData();
    }, []);

    // 로그인 상태를 업데이트하는 함수
    const login = async (id) => {
        try {
            await AsyncStorage.setItem('userId', id);
            setUserId(id);
        } catch (error) {
            console.error('Failed to store user ID in AsyncStorage:', error);
        }
    };

    // 로그아웃 상태를 업데이트하는 함수
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            setUserId(null);
        } catch (error) {
            console.error('Failed to remove user ID from AsyncStorage:', error);
        }
    };
    // 프로필을 불러오는 함수
    const profileCall = async(id)=>{

        const postData = {
            "userId" : id,
        };
          axios.post(profileUrl, postData)
          .then(response => {
              // 요청 성공 시 처리
              console.log(response.data)
              profile(response.data)
          })
          .catch(error => {
              // 요청 실패 시 처리
              console.error('Failed to load user profile:', error);
            });
        }
        //프로필 상태를 업데이트 하는 함수
        const profile = async(data)=>{
            try {
                console.log('data: ',data)
                setUserName(data['nickname']);
                if(data['skinType']!==null){
                    await AsyncStorage.setItem('skinType',data['skinType']);
                    await AsyncStorage.setItem('oliyScore',data['oliyScore']);
                    await AsyncStorage.setItem('resistanceScore',data['resistanceScore']);
                    await AsyncStorage.setItem('non_pigmentScore',data['non_pigmentScore']);
                }
                else if(data['skinType']==null){
                    setSkinType('????')
                }

            }catch(error){
                console.error('Failed to send user profile:', error);
            }
            setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ userId, login, logout, loading, userName, skinType }}>
            {children}
        </AuthContext.Provider>
    );
};