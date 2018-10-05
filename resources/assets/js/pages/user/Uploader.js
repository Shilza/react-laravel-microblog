import React from 'react';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export const Uploader = () => {
    return (
            <ImagesUploader
                url={"http://127.0.0.1:8000/api/update_avatar?token=" + localStorage.getItem('access_token')}
                optimisticPreviews
                multiple={false}
            />
    );
};