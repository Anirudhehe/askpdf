'use client'
import { uploadToS3 } from '@/lib/s3';
import { Inbox } from 'lucide-react';
import React from 'react'
import {useDropzone} from 'react-dropzone'

const FileUpload = () => {
    const {getRootProps,getInputProps} = useDropzone({
        accept: {"application/pdf":[".pdf"]},
        maxFiles:1,
        onDrop:async (acceptedFiles)=>{
            console.log("Dropped the File");
            const file = acceptedFiles[0];
            if(file.size>10*1024*1024){
                alert('Only files less than 10Mb allowed for now... ');
                return
            }
            try {
                
                const data = await uploadToS3(file)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
    });
  return (
    <div className='p-2 rounded-xl bg-white'>
        <div {...getRootProps({
            className:'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col'
        })}>
            <input {...getInputProps()}/>
            <>
            <Inbox className='w-10 h-10 ml-3 p-1 text-blue-500'/>
            <p className='mt-2 text-sm text-slate-400 '>Drop Your PDF</p>
            </>
        </div>
    </div>
  )
}

export default FileUpload