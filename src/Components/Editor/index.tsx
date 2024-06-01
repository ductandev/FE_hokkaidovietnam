import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react'
import axios from 'axios';

import { Editor } from '@tinymce/tinymce-react';

import { PLUGIN_EDITOR, TOOLBAR_EDITOR } from './constants';

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_PUBLIC_CLOUD_NAME}/image/upload`;

const EditorMCE = forwardRef((props: any, ref: any) => {
    const editorRef = useRef<any | null>(null);
    const { defaultValues, name, className } = props;

    useImperativeHandle(ref, () => ({
        getContentTrigger() {
            return getContent();
        }
    }));

    const getContent = () => {
        if (editorRef.current) {
            return editorRef.current.getContent()
        }
    };

    const onPickupImage: any = useCallback((blobInfo: any, _progress: any) => new Promise(async (success, failure) => {
        const formData = new FormData();

        formData.append('file', blobInfo.blob(), blobInfo.filename());
        formData.append(
            "upload_preset",
            process.env.REACT_APP_PUBLIC_UPLOAD_PRESET as string
        );

        const cancelSource = axios.CancelToken.source();

        await axios.post(
            CLOUDINARY_URL,
            formData,
            {
                cancelToken: cancelSource.token,
            }
        )
            .then((data: any) => {
                console.log('Tải ảnh thành công', data?.data);

                success(data?.data?.secure_url);
                _progress(100);
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                failure('Error uploading image');
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [])

    return (
        <div className={`${className}`}>
            <Editor
                id={name}
                tagName={name}
                textareaName={name}
                apiKey='dazse2cf61esolietcm6fohrg0fd3nwtci0fv66ouesgweb1'
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue={defaultValues}
                init={{
                    min_height: 1000,
                    menubar: false,
                    plugins: PLUGIN_EDITOR,
                    toolbar: TOOLBAR_EDITOR,
                    toolbar_sticky: true,
                    toolbar_mode: 'wrap',
                    content_style: 'body { font-family: Arial,sans-serif; font-size: 12pt }',
                    images_upload_handler: onPickupImage,
                    placeholder: "Nhập nội dung tại đây"
                }}
            />
        </div>
    )
})

export default memo(EditorMCE);