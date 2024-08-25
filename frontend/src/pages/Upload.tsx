import UploadLayout  from '../layouts/UploadLayout';
import {FiUploadCloud} from 'react-icons/fi';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { GiBoxCutter } from 'react-icons/gi';
import UploadError from '../components/UploadError';

import { CREATE_POST } from '../graphql/mutations/createPost';
import React from 'react';
import { useMutation } from '@apollo/client';

function Upload() {
    const fileRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileDisplay(URL.createObjectURL(e.target.files[0]));
            setFileData(e.target.files[0]);
        }
    }

    const [show, setShow] = React.useState<boolean>(false);
    const [fileData, setFileData] = React.useState<File | null>(null);
    const [errors, setErrors] = React.useState<string[]>([]);
    const [isUploading, setIsUploading] = React.useState<boolean>(false);

    const [createPost, {data, loading, error}] = useMutation(CREATE_POST)
    return (
        <div>
            Upload
        </div>
    )
}
export default Upload;