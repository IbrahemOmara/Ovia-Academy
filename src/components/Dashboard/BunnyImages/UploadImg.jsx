import axios from 'axios'
import React from 'react'
import { baseURL } from '../../../utils/baseURL'
import { useQuery } from 'react-query';

function UploadImg() {

    const userId = JSON.parse(localStorage.dataAuth).customerAttributeId;

    const getBunnyImg = (idUser)=> {
        return axios.get(`${baseURL}/BunnyImages/GetImageUrl?customerId=${idUser}`);
    }

    const {data:imgs} = useQuery('getBunnyImg',()=>getBunnyImg(userId),{
        refetchInterval:false,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
    })

    console.log(imgs);

  return (
    <div>
        <img src={imgs?.data} alt="" srcset="" />
    </div>
  )
}

export default UploadImg